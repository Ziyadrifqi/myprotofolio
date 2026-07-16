const express = require("express");
const pool = require("../db");

const router = express.Router();

// GET /api/stack
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT group_name, proficiency, tools FROM stack_groups ORDER BY sort_order ASC"
    );
    const data = rows.map((r) => ({
      group: r.group_name,
      proficiency: r.proficiency,
      tools: typeof r.tools === "string" ? JSON.parse(r.tools) : r.tools,
    }));
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch stack" });
  }
});

module.exports = router;
