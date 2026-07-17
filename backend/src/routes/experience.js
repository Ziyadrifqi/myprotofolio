const express = require("express");
const pool = require("../db");
const requireAuth = require("../middleware/auth");

const router = express.Router();

// GET /api/experience
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT id, exp_key, role, company, period, description, highlights FROM experience ORDER BY sort_order ASC"
    );
    const data = rows.map((r) => ({
      dbId: r.id,
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

// POST /api/experience — add a new experience entry
router.post("/", requireAuth, async (req, res) => {
  const { expKey, role, company, period, description, highlights } = req.body || {};
  if (!expKey || !role || !company || !period || !Array.isArray(highlights)) {
    return res.status(400).json({ error: "expKey, role, company, period, and highlights[] are required" });
  }
  try {
    const [[{ maxOrder }]] = await pool.query(
      "SELECT COALESCE(MAX(sort_order), -1) AS maxOrder FROM experience"
    );
    const [result] = await pool.query(
      `INSERT INTO experience (exp_key, role, company, period, description, highlights, sort_order)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [expKey, role, company, period, description || "", JSON.stringify(highlights), maxOrder + 1]
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    console.error(err);
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ error: "expKey sudah dipakai, pilih yang lain" });
    }
    res.status(500).json({ error: "Failed to add experience" });
  }
});

// PUT /api/experience/:id — edit an experience entry (id = numeric db id)
router.put("/:id", requireAuth, async (req, res) => {
  const { role, company, period, description, highlights } = req.body || {};
  if (!role || !company || !period || !Array.isArray(highlights)) {
    return res.status(400).json({ error: "role, company, period, and highlights[] are required" });
  }
  try {
    await pool.query(
      `UPDATE experience SET role=?, company=?, period=?, description=?, highlights=? WHERE id=?`,
      [role, company, period, description || "", JSON.stringify(highlights), req.params.id]
    );
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update experience" });
  }
});

// DELETE /api/experience/:id
router.delete("/:id", requireAuth, async (req, res) => {
  try {
    await pool.query("DELETE FROM experience WHERE id=?", [req.params.id]);
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete experience" });
  }
});

module.exports = router;