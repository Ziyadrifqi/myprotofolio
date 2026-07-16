const express = require("express");
const pool = require("../db");

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

module.exports = router;
