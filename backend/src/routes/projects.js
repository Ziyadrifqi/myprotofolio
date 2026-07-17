const express = require("express");
const pool = require("../db");
const requireAuth = require("../middleware/auth");

const router = express.Router();

// GET /api/projects
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT id, project_key, title, description, tech, image, href, repo FROM projects ORDER BY sort_order ASC"
    );
    const data = rows.map((r) => ({
      dbId: r.id,
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

// POST /api/projects — add a new project
router.post("/", requireAuth, async (req, res) => {
  const { projectKey, title, description, tech, image, href, repo } = req.body || {};
  if (!projectKey || !title || !description || !Array.isArray(tech)) {
    return res.status(400).json({ error: "projectKey, title, description, and tech[] are required" });
  }
  try {
    const [[{ maxOrder }]] = await pool.query(
      "SELECT COALESCE(MAX(sort_order), -1) AS maxOrder FROM projects"
    );
    const [result] = await pool.query(
      `INSERT INTO projects (project_key, title, description, tech, image, href, repo, sort_order)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [projectKey, title, description, JSON.stringify(tech), image || null, href || null, repo || null, maxOrder + 1]
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    console.error(err);
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ error: "projectKey sudah dipakai, pilih yang lain" });
    }
    res.status(500).json({ error: "Failed to add project" });
  }
});

// PUT /api/projects/:id — edit a project (id = numeric db id)
router.put("/:id", requireAuth, async (req, res) => {
  const { title, description, tech, image, href, repo } = req.body || {};
  if (!title || !description || !Array.isArray(tech)) {
    return res.status(400).json({ error: "title, description, and tech[] are required" });
  }
  try {
    await pool.query(
      `UPDATE projects SET title=?, description=?, tech=?, image=?, href=?, repo=? WHERE id=?`,
      [title, description, JSON.stringify(tech), image || null, href || null, repo || null, req.params.id]
    );
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update project" });
  }
});

// DELETE /api/projects/:id
router.delete("/:id", requireAuth, async (req, res) => {
  try {
    await pool.query("DELETE FROM projects WHERE id=?", [req.params.id]);
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete project" });
  }
});

module.exports = router;