const express = require("express");
const pool = require("../db");

const router = express.Router();

// GET /api/nav-links
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT label, href, tag FROM nav_links ORDER BY sort_order ASC"
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch nav links" });
  }
});

module.exports = router;
