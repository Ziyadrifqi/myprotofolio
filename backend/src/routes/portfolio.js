const express = require("express");
const pool = require("../db");

const router = express.Router();

// GET /api/portfolio  — everything the homepage needs in a single round trip
router.get("/", async (req, res) => {
  try {
    const [[profileRow], [stackRows], [projectRows], [expRows], [navRows]] = await Promise.all([
      pool.query("SELECT * FROM profile ORDER BY id DESC LIMIT 1").then((r) => r[0]),
      pool.query("SELECT group_name, proficiency, tools FROM stack_groups ORDER BY sort_order ASC"),
      pool.query(
        "SELECT project_key, title, description, tech, image, href, repo FROM projects ORDER BY sort_order ASC"
      ),
      pool.query(
        "SELECT exp_key, role, company, period, description, highlights FROM experience ORDER BY sort_order ASC"
      ),
      pool.query("SELECT label, href, tag FROM nav_links ORDER BY sort_order ASC"),
    ]);

    const parse = (v) => (typeof v === "string" ? JSON.parse(v) : v);

    res.json({
      profile: profileRow
        ? {
            name: profileRow.name,
            role: profileRow.role,
            location: profileRow.location,
            tagline: profileRow.tagline,
            summary: profileRow.summary,
            email: profileRow.email,
            phone: profileRow.phone,
            github: profileRow.github,
            linkedin: profileRow.linkedin,
            cvUrl: profileRow.cv_url,
            availableForWork: Boolean(profileRow.available_for_work),
            photo: profileRow.photo,
          }
        : null,
      stack: stackRows.map((r) => ({
        group: r.group_name,
        proficiency: r.proficiency,
        tools: parse(r.tools),
      })),
      projects: projectRows.map((r) => ({
        id: r.project_key,
        title: r.title,
        description: r.description,
        tech: parse(r.tech),
        image: r.image,
        href: r.href,
        repo: r.repo,
      })),
      experience: expRows.map((r) => ({
        id: r.exp_key,
        role: r.role,
        company: r.company,
        period: r.period,
        description: r.description,
        highlights: parse(r.highlights),
      })),
      navLinks: navRows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch portfolio data" });
  }
});

module.exports = router;
