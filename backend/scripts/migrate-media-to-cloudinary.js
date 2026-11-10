require("dotenv").config();

const fs = require("node:fs/promises");
const path = require("node:path");
const { Readable } = require("node:stream");
const cloudinary = require("cloudinary").v2;
const mongoose = require("mongoose");
const sharp = require("sharp");

const mediaDirectory = path.resolve(__dirname, "../../frontend/public/media");
const defaultsPath = path.resolve(__dirname, "../../frontend/src/data/defaultContent.js");
const requiredEnv = ["MONGODB_URI", "CLOUDINARY_CLOUD_NAME", "CLOUDINARY_API_KEY", "CLOUDINARY_API_SECRET"];
const missingEnv = requiredEnv.filter((key) => !process.env[key]);
if (missingEnv.length) throw new Error(`Missing required environment variables: ${missingEnv.join(", ")}`);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const uploadBuffer = (buffer, options) => new Promise((resolve, reject) => {
  const stream = cloudinary.uploader.upload_stream(options, (error, result) => error ? reject(error) : resolve(result));
  Readable.from([buffer]).pipe(stream);
});

const uploadAsset = async (fileName, duplicateStem) => {
  const sourcePath = path.join(mediaDirectory, fileName);
  const maxDimension = path.parse(fileName).name.toLowerCase().startsWith("propic") ? 1200 : 1600;
  const optimized = await sharp(sourcePath, { limitInputPixels: 40_000_000 })
    .rotate()
    .resize({ width: maxDimension, height: maxDimension, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 82, effort: 5 })
    .toBuffer();
  const parsedName = path.parse(fileName);
  const publicId = duplicateStem ? `${parsedName.name}-${parsedName.ext.slice(1).toLowerCase()}` : parsedName.name;
  const uploaded = await uploadBuffer(optimized, {
    resource_type: "image",
    folder: "true-north",
    public_id: publicId,
    overwrite: true,
    unique_filename: false,
    format: "webp",
  });
  const url = cloudinary.url(uploaded.public_id, {
    secure: true,
    transformation: [{ width: maxDimension, crop: "limit", fetch_format: "auto", quality: "auto" }],
  });
  return { fileName, url, publicId: uploaded.public_id, bytes: uploaded.bytes };
};

const main = async () => {
  const files = (await fs.readdir(mediaDirectory)).filter((file) => /\.(png|jpe?g|webp|avif)$/i.test(file)).sort();
  const stemCounts = new Map();
  for (const file of files) {
    const stem = path.parse(file).name.toLowerCase();
    stemCounts.set(stem, (stemCounts.get(stem) || 0) + 1);
  }
  const assets = [];
  for (const file of files) assets.push(await uploadAsset(file, stemCounts.get(path.parse(file).name.toLowerCase()) > 1));

  let defaultsSource = await fs.readFile(defaultsPath, "utf8");
  for (const asset of assets) {
    defaultsSource = defaultsSource.replaceAll(JSON.stringify(`/media/${asset.fileName}`), JSON.stringify(asset.url));
    const stem = path.parse(asset.fileName).name;
    const publicId = asset.publicId.split("/").pop();
    if (publicId !== stem) defaultsSource = defaultsSource.replaceAll(`/true-north/${stem}?`, `/true-north/${publicId}?`);
  }
  await fs.writeFile(defaultsPath, defaultsSource, "utf8");

  const contentSchema = new mongoose.Schema({ key: { type: String, unique: true, default: "portfolio" }, content: mongoose.Schema.Types.Mixed }, { timestamps: true });
  const Content = mongoose.models.PortfolioContent || mongoose.model("PortfolioContent", contentSchema);
  await mongoose.connect(process.env.MONGODB_URI);
  const record = await Content.findOne({ key: "portfolio" });
  let updatedReferences = 0;
  if (record?.content) {
    const urlByPath = new Map(assets.map((asset) => [`/media/${asset.fileName}`, asset.url]));
    const content = record.content;
    if (urlByPath.has(content.profile?.portrait)) {
      content.profile.portrait = urlByPath.get(content.profile.portrait);
      updatedReferences += 1;
    } else if (typeof content.profile?.portrait === "string") {
      for (const asset of assets) {
        const stem = path.parse(asset.fileName).name;
        const publicId = asset.publicId.split("/").pop();
        const oldAssetPath = `/true-north/${stem}?`;
        if (publicId !== stem && content.profile.portrait.includes(oldAssetPath)) {
          content.profile.portrait = content.profile.portrait.replace(oldAssetPath, `/true-north/${publicId}?`);
          updatedReferences += 1;
        }
      }
    }
    for (const project of content.projects || []) {
      if (urlByPath.has(project.image)) {
        project.image = urlByPath.get(project.image);
        updatedReferences += 1;
      } else if (typeof project.image === "string") {
        for (const asset of assets) {
          const stem = path.parse(asset.fileName).name;
          const publicId = asset.publicId.split("/").pop();
          const oldAssetPath = `/true-north/${stem}?`;
          if (publicId !== stem && project.image.includes(oldAssetPath)) {
            project.image = project.image.replace(oldAssetPath, `/true-north/${publicId}?`);
            updatedReferences += 1;
          }
        }
      }
    }
    record.markModified("content");
    await record.save();
  }
  await mongoose.disconnect();
  process.stdout.write(`${JSON.stringify({ assets, updatedReferences }, null, 2)}\n`);
};

main().catch(async (error) => {
  await mongoose.disconnect().catch(() => {});
  console.error(`Media migration failed (${error.name || "Error"}). Check the backend credentials and Cloudinary/MongoDB connections.`);
  process.exitCode = 1;
});
