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

  if (!name || typeof name !== "string" || !name.trim()) {
    return res.status(400).json({ error: "Nama wajib diisi" });
  }
  if (!role || typeof role !== "string" || !role.trim()) {
    return res.status(400).json({ error: "Role/Profesi wajib diisi" });
  }
  if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return res.status(400).json({ error: "Email tidak valid" });
  }

  const cleanName = name.trim().slice(0, 100);
  const cleanRole = role.trim().slice(0, 100);
  const cleanLocation = location ? String(location).trim().slice(0, 100) : "";
  const cleanTagline = tagline ? String(tagline).trim().slice(0, 255) : "";
  const cleanSummary = summary ? String(summary).trim().slice(0, 2000) : "";
  const cleanEmail = email.trim().slice(0, 150);
  const cleanPhone = phone ? String(phone).trim().slice(0, 30) : "";
  const cleanGithub = github ? String(github).trim().slice(0, 255) : "";
  const cleanLinkedin = linkedin ? String(linkedin).trim().slice(0, 255) : "";
  const cleanCvUrl = cvUrl ? String(cvUrl).trim().slice(0, 255) : "";
  const cleanPhoto = photo ? String(photo).trim().slice(0, 255) : "";

  try {
    const [existing] = await pool.query("SELECT id, photo FROM profile ORDER BY id DESC LIMIT 1");

    if (existing.length) {
      await pool.query(
        `UPDATE profile SET name=?, role=?, location=?, tagline=?, summary=?, email=?, phone=?,
          github=?, linkedin=?, cv_url=?, available_for_work=?, photo=? WHERE id=?`,
        [
          cleanName, cleanRole, cleanLocation, cleanTagline, cleanSummary, cleanEmail, cleanPhone,
          cleanGithub, cleanLinkedin, cleanCvUrl, Boolean(availableForWork), cleanPhoto, existing[0].id,
        ]
      );
      if (existing[0].photo && existing[0].photo !== cleanPhoto) {
        deleteIfUploaded(existing[0].photo);
      }
    } else {
      await pool.query(
        `INSERT INTO profile (name, role, location, tagline, summary, email, phone, github, linkedin, cv_url, available_for_work, photo)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [cleanName, cleanRole, cleanLocation, cleanTagline, cleanSummary, cleanEmail, cleanPhone, cleanGithub, cleanLinkedin, cleanCvUrl, Boolean(availableForWork), cleanPhoto]
      );
    }

    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update profile" });
  }
});

module.exports = router;