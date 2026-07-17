const express = require("express");
const pool = require("../db");
const requireAuth = require("../middleware/auth");

const router = express.Router();

// GET /api/stack
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT id, group_name, proficiency, tools FROM stack_groups ORDER BY sort_order ASC"
    );
    const data = rows.map((r) => ({
      id: r.id,
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

// POST /api/stack — add a new stack group
router.post("/", requireAuth, async (req, res) => {
  const { group, proficiency, tools } = req.body || {};
  if (!group || !Array.isArray(tools)) {
    return res.status(400).json({ error: "group and tools[] are required" });
  }
  try {
    const [[{ maxOrder }]] = await pool.query(
      "SELECT COALESCE(MAX(sort_order), -1) AS maxOrder FROM stack_groups"
    );
    const [result] = await pool.query(
      "INSERT INTO stack_groups (group_name, proficiency, sort_order, tools) VALUES (?, ?, ?, ?)",
      [group, proficiency || 0, maxOrder + 1, JSON.stringify(tools)]
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add stack group" });
  }
});

// PUT /api/stack/:id — edit a stack group
router.put("/:id", requireAuth, async (req, res) => {
  const { group, proficiency, tools } = req.body || {};
  if (!group || !Array.isArray(tools)) {
    return res.status(400).json({ error: "group and tools[] are required" });
  }
  try {
    await pool.query(
      "UPDATE stack_groups SET group_name=?, proficiency=?, tools=? WHERE id=?",
      [group, proficiency || 0, JSON.stringify(tools), req.params.id]
    );
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update stack group" });
  }
});

// DELETE /api/stack/:id
router.delete("/:id", requireAuth, async (req, res) => {
  try {
    await pool.query("DELETE FROM stack_groups WHERE id=?", [req.params.id]);
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete stack group" });
  }
});

module.exports = router;