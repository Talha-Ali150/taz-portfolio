# Talha Ali Portfolio

## Run locally

Use Node.js 20.9 or newer for the backend image-processing dependency. Start MongoDB locally or create a MongoDB Atlas database.
1. Copy `backend/.env.example` to `backend/.env` and set a private admin email, a long unique password, a random session secret, your MongoDB connection string, and the Cloudinary credentials from your Cloudinary console.
2. From `backend`, run `npm install` once, then `npm run dev`.
3. Copy `frontend/.env.example` to `frontend/.env`.
4. From `frontend`, run `npm install` once, then `npm start`.
5. Open `http://localhost:3000/admin` and sign in with `ADMIN_EMAIL` and `ADMIN_PASSWORD`.

To move the starter images into Cloudinary's `portfolio` folder and update existing MongoDB image references, run `npm run media:migrate` once from `backend` after setting the Cloudinary and MongoDB variables.

The public portfolio uses the built-in content defaults until the first time you publish from the dashboard. Publishing stores the full site content in MongoDB and updates the public page. The admin session is stored in MongoDB and uses an HTTP-only cookie.

## Deployment

Deploy the React frontend from `frontend` and the Express API. The Vercel rewrite in `vercel.json` proxies `/api/*` to the API origin, so production requests use the frontend's origin and the admin session cookie works as a first-party cookie. If your API host changes, update the rewrite destination and redeploy the frontend. On the API host, set the environment variables from `backend/.env.example`, including `FRONTEND_ORIGIN` as the exact deployed frontend origin (without a trailing slash). The admin session persists for up to 30 days of inactivity. Use HTTPS in production, and keep admin credentials and `SESSION_SECRET` private; do not commit `.env` files.

The admin dashboard is available at `/admin`. It edits profile and contact details, section headlines, section visibility, about cards, skills, and projects. Project and portrait images can be set with a URL or a path under `frontend/public` such as `/media/pic1.png`, or uploaded as JPG, PNG, WebP, or AVIF files up to 8 MB. The API uses Sharp to auto-rotate, resize, and encode uploads as WebP, then stores them in Cloudinary and saves an optimized delivery URL in MongoDB. Keep Cloudinary credentials on the backend; never put them in frontend environment variables.
