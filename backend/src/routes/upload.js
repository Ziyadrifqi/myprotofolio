const express = require("express");
const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
const requireAuth = require("../middleware/auth");
const { getUploadsDir, ensureDir, deleteIfUploaded } = require("../utils/fileStorage");

const router = express.Router();

const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = String(req.query.folder || "misc").replace(/[^a-z0-9_-]/gi, "");
    const dir = getUploadsDir(folder);
    ensureDir(dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const name = `${Date.now()}-${crypto.randomBytes(4).toString("hex")}${ext}`;
    cb(null, name);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (!ALLOWED_TYPES.has(file.mimetype)) {
      return cb(new Error("Format file harus JPG, PNG, WEBP, atau GIF"));
    }
    cb(null, true);
  },
});

// POST /api/upload?folder=projects   (multipart/form-data, field name "image")
router.post("/", requireAuth, (req, res) => {
  upload.single("image")(req, res, (err) => {
    if (err) return res.status(400).json({ error: err.message });
    if (!req.file) return res.status(400).json({ error: "Tidak ada file yang dikirim" });

    const folder = String(req.query.folder || "misc").replace(/[^a-z0-9_-]/gi, "");
    const publicPath = `/uploads/${folder}/${req.file.filename}`;
    res.status(201).json({ path: publicPath });
  });
});

// DELETE /api/upload   { path: "/uploads/projects/xxx.jpg" }
router.delete("/", requireAuth, (req, res) => {
  const { path: filePath } = req.body || {};
  deleteIfUploaded(filePath);
  res.json({ ok: true });
});

module.exports = router;