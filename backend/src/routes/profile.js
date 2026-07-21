const express = require("express");
const pool = require("../db");
const requireAuth = require("../middleware/auth");
const { deleteIfUploaded } = require("../utils/fileStorage");

const router = express.Router();

// GET /api/profile
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM profile ORDER BY id DESC LIMIT 1");
    if (!rows.length) return res.status(404).json({ error: "Profile not found" });

    const row = rows[0];
    // Never leak the web3forms key to the public API response
    delete row.web3forms_access_key;

    res.json({
      name: row.name,
      role: row.role,
      location: row.location,
      tagline: row.tagline,
      summary: row.summary,
      email: row.email,
      phone: row.phone,
      github: row.github,
      linkedin: row.linkedin,
      cvUrl: row.cv_url,
      availableForWork: Boolean(row.available_for_work),
      photo: row.photo,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});

// PUT /api/profile — updates the single profile row (creates one if none exists)
router.put("/", requireAuth, async (req, res) => {
  const {
    name,
    role,
    location,
    tagline,
    summary,
    email,
    phone,
    github,
    linkedin,
    cvUrl,
    availableForWork,
    photo,
  } = req.body || {};

  if (!name || !role || !email) {
    return res.status(400).json({ error: "name, role, and email are required" });
  }

  try {
    const [existing] = await pool.query("SELECT id, photo FROM profile ORDER BY id DESC LIMIT 1");

    if (existing.length) {
      await pool.query(
        `UPDATE profile SET name=?, role=?, location=?, tagline=?, summary=?, email=?, phone=?,
          github=?, linkedin=?, cv_url=?, available_for_work=?, photo=? WHERE id=?`,
        [
          name, role, location, tagline, summary, email, phone,
          github, linkedin, cvUrl, Boolean(availableForWork), photo, existing[0].id,
        ]
      );
      if (existing[0].photo && existing[0].photo !== photo) {
        deleteIfUploaded(existing[0].photo);
      }
    } else {
      await pool.query(
        `INSERT INTO profile (name, role, location, tagline, summary, email, phone, github, linkedin, cv_url, available_for_work, photo)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [name, role, location, tagline, summary, email, phone, github, linkedin, cvUrl, Boolean(availableForWork), photo]
      );
    }

    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update profile" });
  }
});

module.exports = router;