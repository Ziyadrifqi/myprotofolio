const express = require("express");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const router = express.Router();

// POST /api/auth/login  { password }
router.post("/login", (req, res) => {
  const { password } = req.body || {};

  const adminPass = process.env.ADMIN_PASSWORD;
  if (!password || !adminPass) {
    return res.status(401).json({ error: "Password salah" });
  }

  // Timing-safe comparison to guard against timing attacks
  const passBuffer = Buffer.from(String(password));
  const adminBuffer = Buffer.from(String(adminPass));

  if (
    passBuffer.length !== adminBuffer.length ||
    !crypto.timingSafeEqual(passBuffer, adminBuffer)
  ) {
    return res.status(401).json({ error: "Password salah" });
  }

  const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
    expiresIn: "12h",
  });

  res.json({ token });
});

module.exports = router;
