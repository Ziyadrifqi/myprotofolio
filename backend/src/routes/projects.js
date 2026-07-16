const express = require("express");
const pool = require("../db");

const router = express.Router();

// GET /api/projects
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT project_key, title, description, tech, image, href, repo FROM projects ORDER BY sort_order ASC"
    );
    const data = rows.map((r) => ({
      id: r.project_key,
      title: r.title,
      description: r.description,
      tech: typeof r.tech === "string" ? JSON.parse(r.tech) : r.tech,
      image: r.image,
      href: r.href,
      repo: r.repo,
    }));
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

module.exports = router;
