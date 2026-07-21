const fs = require("fs");
const path = require("path");
require("dotenv").config();

/**
 * Since Express and Next.js live in sibling folders in the same repo
 * (backend/ and frontend/), uploaded images are written directly into
 * Next's `public` folder so Next can serve them at the same origin as
 * the site — no need for Express to serve static files itself.
 */
function getPublicDir() {
  const configured = process.env.FRONTEND_PUBLIC_DIR || "../frontend/public";
  return path.resolve(__dirname, "..", "..", configured);
}

function getUploadsDir(folder = "") {
  return path.join(getPublicDir(), "uploads", folder);
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

/**
 * Deletes a file referenced by a public path like "/uploads/projects/xxx.jpg".
 * Only ever touches files under /uploads/ — never the original theme assets
 * under /images/ — and guards against path traversal.
 */
function deleteIfUploaded(publicPath) {
  if (!publicPath || typeof publicPath !== "string") return;
  if (!publicPath.startsWith("/uploads/")) return;

  const publicDir = getPublicDir();
  const uploadsRoot = path.join(publicDir, "uploads");
  const absPath = path.join(publicDir, publicPath);

  if (!absPath.startsWith(uploadsRoot)) return;

  fs.unlink(absPath, (err) => {
    if (err && err.code !== "ENOENT") {
      console.error("Failed to delete uploaded file:", absPath, err);
    }
  });
}

module.exports = { getPublicDir, getUploadsDir, ensureDir, deleteIfUploaded };