require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");
const rateLimit = require("express-rate-limit").rateLimit;
const multer = require("multer");
const sharp = require("sharp");
const cloudinary = require("cloudinary").v2;
const { Readable } = require("node:stream");

const requiredEnv = ["MONGODB_URI", "ADMIN_EMAIL", "ADMIN_PASSWORD", "SESSION_SECRET"];
const missingEnv = requiredEnv.filter((key) => !process.env[key]);
if (missingEnv.length) {
  console.error(`Missing required environment variables: ${missingEnv.join(", ")}`);
  process.exit(1);
}

const app = express();
const production = process.env.NODE_ENV === "production";
const frontendOrigins = new Set(
  (process.env.FRONTEND_ORIGIN || "http://localhost:3000")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean)
);
if (!production) {
  frontendOrigins.add("http://localhost:3000");
  frontendOrigins.add("http://127.0.0.1:3000");
}
const cloudinaryConfigured = Boolean(process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET);
if (cloudinaryConfigured) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
}
const contentSchema = new mongoose.Schema({
  key: { type: String, unique: true, default: "portfolio" },
  content: { type: mongoose.Schema.Types.Mixed, required: true },
}, { timestamps: true });
const PortfolioContent = mongoose.models.PortfolioContent || mongoose.model("PortfolioContent", contentSchema);

if (production) app.set("trust proxy", 1);
app.use(helmet());
app.use(cors({ origin: [...frontendOrigins], credentials: true }));
app.use(express.json({ limit: "2mb" }));
app.use(session({
  name: "portfolio_admin",
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ clientPromise: mongoose.connection.asPromise().then((connection) => connection.getClient()), collectionName: "admin_sessions" }),
  cookie: { httpOnly: true, secure: production, sameSite: production ? "none" : "lax", maxAge: 1000 * 60 * 60 * 8 },
}));

const requireAdmin = (req, res, next) => {
  if (!req.session.admin) return res.status(401).json({ error: "Please sign in to continue." });
  next();
};
const loginLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 10, standardHeaders: "draft-7", legacyHeaders: false });
const imageUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 8 * 1024 * 1024, files: 1 },
  fileFilter: (_req, file, callback) => {
    const acceptedTypes = ["image/jpeg", "image/png", "image/webp", "image/avif"];
    if (!acceptedTypes.includes(file.mimetype)) return callback(new Error("Choose a JPG, PNG, WebP, or AVIF image."));
    callback(null, true);
  },
});

const uploadBufferToCloudinary = (buffer, options) => new Promise((resolve, reject) => {
  const uploadStream = cloudinary.uploader.upload_stream(options, (error, result) => error ? reject(error) : resolve(result));
  Readable.from([buffer]).pipe(uploadStream);
});

app.get("/api/health", (_req, res) => res.json({ ok: true }));
app.get("/api/content", async (_req, res, next) => {
  try {
    const record = await PortfolioContent.findOne({ key: "portfolio" }).lean();
    res.json(record ? record.content : null);
  } catch (error) { next(error); }
});
app.post("/api/admin/login", loginLimiter, (req, res, next) => {
  const { email, password } = req.body || {};
  if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: "Email or password is incorrect." });
  }
  req.session.regenerate((error) => {
    if (error) return next(error);
    req.session.admin = { email: process.env.ADMIN_EMAIL };
    req.session.save((saveError) => saveError ? next(saveError) : res.json({ email: process.env.ADMIN_EMAIL }));
  });
});
app.get("/api/admin/session", requireAdmin, (req, res) => res.json({ email: req.session.admin.email }));
app.post("/api/admin/uploads/image", requireAdmin, imageUpload.single("image"), async (req, res, next) => {
  if (!cloudinaryConfigured) return res.status(503).json({ error: "Image uploads are not configured. Add the Cloudinary credentials to the backend environment." });
  if (!req.file) return res.status(400).json({ error: "Choose an image to upload." });

  try {
    const purpose = req.query.purpose === "portrait" ? "portrait" : "project";
    const maxDimension = purpose === "portrait" ? 1200 : 1600;
    const sourceImage = sharp(req.file.buffer, { limitInputPixels: 40_000_000 });
    const metadata = await sourceImage.metadata();
    if (!metadata.width || !metadata.height || !["jpeg", "png", "webp", "avif"].includes(metadata.format)) {
      return res.status(400).json({ error: "The selected file is not a supported image." });
    }
    if (metadata.width > 12000 || metadata.height > 12000) {
      return res.status(400).json({ error: "The image dimensions are too large. Use an image no larger than 12,000 pixels per side." });
    }

    const optimized = await sharp(req.file.buffer, { limitInputPixels: 40_000_000 })
      .rotate()
      .resize({ width: maxDimension, height: maxDimension, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 82, effort: 5 })
      .toBuffer();
    const uploaded = await uploadBufferToCloudinary(optimized, {
      resource_type: "image",
      folder: "portfolio",
      format: "webp",
    });
    const url = cloudinary.url(uploaded.public_id, {
      secure: true,
      transformation: [{ width: maxDimension, crop: "limit", fetch_format: "auto", quality: "auto" }],
    });
    res.status(201).json({
      url,
      publicId: uploaded.public_id,
      width: uploaded.width,
      height: uploaded.height,
      bytes: uploaded.bytes,
      format: uploaded.format,
    });
  } catch (error) {
    if (/pixel limit/i.test(error.message || "")) return res.status(400).json({ error: "The image is too large to process. Choose an image with fewer pixels." });
    next(error);
  }
});
app.post("/api/admin/logout", requireAdmin, (req, res, next) => {
  req.session.destroy((error) => {
    if (error) return next(error);
    res.clearCookie("portfolio_admin", { httpOnly: true, secure: production, sameSite: production ? "none" : "lax" });
    res.status(204).end();
  });
});
app.put("/api/content", requireAdmin, async (req, res, next) => {
  const content = req.body;
  if (!content || typeof content !== "object" || Array.isArray(content) || !content.profile || !Array.isArray(content.projects) || !Array.isArray(content.skills)) {
    return res.status(400).json({ error: "The portfolio content is incomplete or invalid." });
  }
  try {
    await PortfolioContent.findOneAndUpdate({ key: "portfolio" }, { $set: { content } }, { upsert: true, new: true, runValidators: true });
    res.json({ ok: true });
  } catch (error) { next(error); }
});

app.use((error, _req, res, _next) => {
  if (error instanceof multer.MulterError) {
    const message = error.code === "LIMIT_FILE_SIZE" ? "Images must be 8 MB or smaller." : "Could not accept that image upload.";
    return res.status(400).json({ error: message });
  }
  if (error.message === "Choose a JPG, PNG, WebP, or AVIF image.") return res.status(400).json({ error: error.message });
  console.error(error);
  res.status(500).json({ error: "The server could not complete the request." });
});

const port = Number(process.env.PORT || 4000);
mongoose.connect(process.env.MONGODB_URI)
  .then(() => app.listen(port, () => console.log(`Portfolio API listening on port ${port}`)))
  .catch((error) => { console.error("Could not connect to MongoDB.", error.message); process.exit(1); });
