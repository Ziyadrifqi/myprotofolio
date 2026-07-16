const express = require("express");
const pool = require("../db");

const router = express.Router();

// GET /api/experience
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT exp_key, role, company, period, description, highlights FROM experience ORDER BY sort_order ASC"
    );
    const data = rows.map((r) => ({
      id: r.exp_key,
      role: r.role,
      company: r.company,
      period: r.period,
      description: r.description,
      highlights: typeof r.highlights === "string" ? JSON.parse(r.highlights) : r.highlights,
    }));
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch experience" });
  }
});

module.exports = router;
