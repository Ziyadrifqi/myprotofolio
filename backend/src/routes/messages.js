const express = require("express");
const pool = require("../db");
const requireAuth = require("../middleware/auth");
const rateLimit = require("express-rate-limit");
const { sendNewMessageNotification } = require("../utils/mailer");

const router = express.Router();

// Auto-create messages table if it doesn't exist yet
async function initTable() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS messages (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        is_read BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
  } catch (err) {
    console.error("Gagal inisialisasi tabel messages:", err.message);
  }
}
initTable();

// Rate limiter khusus submit pesan kontak: maks 10 pesan per 15 menit per IP
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "Terlalu banyak permintaan. Silakan tunggu beberapa saat lagi.",
  },
});

// POST /api/messages - Publik: Menerima pesan kontak & kirim notifikasi Gmail SMTP
router.post("/", contactLimiter, async (req, res) => {
  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Nama, email, dan pesan wajib diisi." });
  }

  // Validasi email sederhana
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Format email tidak valid." });
  }

  try {
    await pool.query(
      "INSERT INTO messages (name, email, message, is_read) VALUES (?, ?, ?, FALSE)",
      [name.trim(), email.trim(), message.trim()]
    );

    // Kirim notifikasi email di background (tanpa memblokir response HTTP)
    sendNewMessageNotification({
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
    }).catch((err) => {
      console.error("Mailer background error:", err);
    });

    res.status(201).json({ success: true, message: "Pesan berhasil dikirim!" });
  } catch (error) {
    console.error("Gagal menyimpan pesan kontak:", error);
    res.status(500).json({ error: "Gagal memproses pesan kontak. Silakan coba lagi nanti." });
  }
});

// GET /api/messages - Admin: Ambil semua pesan
router.get("/", requireAuth, async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT id, name, email, message, is_read, created_at FROM messages ORDER BY created_at DESC"
    );
    res.json(rows);
  } catch (error) {
    console.error("Gagal mengambil pesan kontak:", error);
    res.status(500).json({ error: "Gagal mengambil daftar pesan." });
  }
});

// PATCH /api/messages/:id/read - Admin: Tandai pesan sudah dibaca/belum
router.patch("/:id/read", requireAuth, async (req, res) => {
  const { id } = req.params;
  const { is_read = true } = req.body || {};

  try {
    await pool.query("UPDATE messages SET is_read = ? WHERE id = ?", [Boolean(is_read), id]);
    res.json({ success: true, id, is_read: Boolean(is_read) });
  } catch (error) {
    console.error("Gagal update status pesan:", error);
    res.status(500).json({ error: "Gagal memperbarui status pesan." });
  }
});

// DELETE /api/messages/:id - Admin: Hapus pesan
router.delete("/:id", requireAuth, async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM messages WHERE id = ?", [id]);
    res.json({ success: true, id });
  } catch (error) {
    console.error("Gagal menghapus pesan:", error);
    res.status(500).json({ error: "Gagal menghapus pesan." });
  }
});

module.exports = router;

