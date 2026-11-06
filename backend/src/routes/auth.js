const express = require("express");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const rateLimit = require("express-rate-limit");

const router = express.Router();

// Rate limiting khusus endpoint login: maks 5 percobaan per 15 menit per IP
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "Terlalu banyak percobaan login gagal. Silakan coba lagi setelah 15 menit.",
  },
});

// POST /api/auth/login  { password }
router.post("/login", loginLimiter, async (req, res) => {
  const { password } = req.body || {};

  const adminHash = process.env.ADMIN_PASSWORD_HASH;
  const adminPass = process.env.ADMIN_PASSWORD;

  if (!password || (!adminHash && !adminPass)) {
    return res.status(401).json({ error: "Password salah" });
  }

  let isValid = false;

  // Jika ADMIN_PASSWORD_HASH ada, gunakan bcrypt
  if (adminHash) {
    try {
      isValid = await bcrypt.compare(String(password), adminHash);
    } catch (e) {
      isValid = false;
    }
  } else if (adminPass) {
    // Fallback backward-compatible: timing-safe comparison jika masih memakai plaintext di .env
    const passBuffer = Buffer.from(String(password));
    const adminBuffer = Buffer.from(String(adminPass));
    if (passBuffer.length === adminBuffer.length) {
      isValid = crypto.timingSafeEqual(passBuffer, adminBuffer);
    }
  }

  if (!isValid) {
    return res.status(401).json({ error: "Password salah" });
  }

  const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
    expiresIn: "12h",
  });

  res.json({ token });
});

// GET /api/auth/me - Verifikasi token admin
const requireAuth = require("../middleware/auth");
router.get("/me", requireAuth, (req, res) => {
  res.json({ authenticated: true, role: "admin" });
});

module.exports = router;
