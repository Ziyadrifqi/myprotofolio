/**
 * Populates the database with the same data that used to live in
 * src/data/content.ts. Run once with `npm run seed` after creating the
 * schema (mysql -u root -p < src/schema.sql).
 */
require("dotenv").config();
const pool = require("./db");

async function seed() {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    await conn.query("DELETE FROM profile");
    await conn.query(
      `INSERT INTO profile
        (name, role, location, tagline, summary, email, phone, github, linkedin, cv_url, available_for_work, photo, web3forms_access_key)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        "ZiyadRifqi Permana",
        "Full Stack Developer",
        "Indonesia",
        "Antusias mempelajari teknologi baru dan membangun solusi digital melalui pengembangan web modern berbasis backend dan frontend.",
        "Saya merancang dan membangun aplikasi web end-to-end — mulai dari arsitektur API dan database, sampai antarmuka yang cepat dan nyaman dipakai. Fokus saya ada di kode yang mudah dirawat dan produk yang benar-benar dipakai orang.",
        "ziyadrpe@gmail.com",
        "+62 812-0000-0000",
        "https://github.com/Ziyadrifqi",
        "https://www.linkedin.com/in/ziyadrifqi-permana-67bbb827b/",
        "https://drive.google.com/file/d/1afdxReEV1Iov8DCR70PFXutiUXLBEwdn/view?usp=sharing",
        true,
        "/images/foto.png",
        process.env.WEB3FORMS_ACCESS_KEY || null,
      ]
    );

    await conn.query("DELETE FROM stack_groups");
    const stack = [
      { group: "Frontend", tools: ["React", "Next.js", "Wordpress", "Tailwind CSS"], proficiency: 80 },
      { group: "Backend", tools: ["Laravel", "Codeigniter", "Golang", "Python(Flask)"], proficiency: 90 },
      { group: "Database", tools: ["MySQL", "PostgreSQL"], proficiency: 80 },
      { group: "DevOps & Tools", tools: ["Docker", "Git"], proficiency: 75 },
    ];
    for (const [i, s] of stack.entries()) {
      await conn.query(
        `INSERT INTO stack_groups (group_name, proficiency, sort_order, tools) VALUES (?, ?, ?, ?)`,
        [s.group, s.proficiency, i, JSON.stringify(s.tools)]
      );
    }

    await conn.query("DELETE FROM projects");
    const projects = [
      {
        key: "proj-01",
        title: "Sistem Absensi Menggunakan Geolocation",
        description:
          "Corpit-Atten adalah aplikasi absensi berbasis web dibangun dengan codeigniter 4 yang membantu meningkatkan akurasi kehadiran karyawan melalui fitur geolocation dan verifikasi selfie. Sistem ini juga mempermudah pengajuan cuti dan lembur secara lebih cepat, aman, dan terorganisir.",
        tech: ["Codeigniter 4", "MySQL", "Boostraps"],
        image: "/images/projects/contoh-dashboard.jpg",
        href: null,
        repo: "https://github.com/Ziyadrifqi/Absensi",
      },
      {
        key: "proj-02",
        title: "Portal JakLingko Indonesia",
        description:
          "Website JakLingko dibangun menggunakan WordPress sebagai platform yang fleksibel untuk mengelola konten dan tampilan secara dinamis. Website ini menyediakan informasi terkait layanan transportasi terintegrasi, termasuk fitur, layanan, dan update terbaru bagi pengguna. Dengan desain yang responsif dan user-friendly.",
        tech: ["Wordpress"],
        image: "/images/projects/placeholder-2.jpg",
        href: "https://jaklingkoindonesia.co.id/",
        repo: null,
      },
      {
        key: "proj-03",
        title: "Sistem Manajamen Dokumen (Jasmine)",
        description:
          "Website Jasmine merupakan sistem manajemen dokumen berbasis web yang dibangun menggunakan framework Laravel dan Tailwind CSS, dirancang untuk mempermudah proses pembuatan, pengelolaan, dan persetujuan dokumen secara digital. Sistem ini memiliki alur kerja berbasis role seperti staff, sekretaris, dan direktur, mulai dari pembuatan dokumen, proses review, hingga persetujuan dengan tanda tangan dan QR code. Selain itu, Jasmine juga dilengkapi fitur pengelolaan surat masuk dan keluar, penomoran dokumen yang dapat dikustomisasi, serta sistem autentikasi yang aman untuk mendukung efisiensi dan transparansi dalam administrasi.",
        tech: ["Laravel", "MySQL", "Tailwind CSS"],
        image: "/images/projects/placeholder-3.jpg",
        href: null,
        repo: null,
      },
      {
        key: "proj-04",
        title: "ZiyadRifqi Portofolio",
        description:
          "Portofolio pribadi Ziyad Rifqi Permana, Full Stack Developer. Dibangun dengan Next.js, TypeScript, dan Tailwind CSS bertema modern glassmorphism. Menampilkan proyek, skill, dan pengalaman kerja dengan desain interaktif serta form kontak terintegrasi.",
        tech: ["Next.js", "Tailwind CSS"],
        image: "/images/projects/placeholder-4.jpg",
        href: null,
        repo: null,
      },
      {
        key: "proj-05",
        title: "Website Global Future",
        description:
          "API headless untuk manajemen konten dengan autentikasi berbasis peran dan dokumentasi otomatis.",
        tech: ["Golang", "React", "Tailwind CSS", "Postgress"],
        image: "/images/projects/placeholder-4.jpg",
        href: null,
        repo: null,
      },
    ];
    for (const [i, p] of projects.entries()) {
      await conn.query(
        `INSERT INTO projects (project_key, title, description, tech, image, href, repo, sort_order)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [p.key, p.title, p.description, JSON.stringify(p.tech), p.image, p.href, p.repo, i]
      );
    }

    await conn.query("DELETE FROM experience");
    const experience = [
      {
        key: "exp-01",
        role: "Information and System Technology - Intern",
        company: "PT Jakarta Lingko Indonesia",
        period: "Nov 2025 — Mei 2026",
        description:
          "Mengembangkan dan memelihara Portal JakLingko dan juga website internal manajemen dokumen.",
        highlights: [
          "Mengembangkan dan melakukan maintenance website perusahaan menggunakan WordPress serta memastikan tampilan responsive pada desktop, tablet, dan mobile.",
          "Mengembangkan sistem manajemen dokumen berbasis Laravel (Jasmine) dengan fitur surat masuk serta peneribitan nomor surat secara otomotasi dan digital signature, surat keluar, dan notifikasi email.",
          "Berkoordinasi dengan tim Corcom, HR, dan CA dalam proses review, revisi konten, serta presentasi pengembangan sistem dan website.",
          "Memberikan dukungan IT support operasional seperti konfigurasi access point, printer WiFi, monitoring ticketing, dan troubleshooting perangkat kantor.",
        ],
      },
      {
        key: "exp-02",
        role: "ITSM - Intern",
        company: "PT Aplikanusa Lintasarta",
        period: "2021 — 2023",
        description:
          "Mengembangkan sistem manajemen pengguna (superadmin, admin, user) serta fitur artikel dan work instruction dengan struktur kategori dan hirarki",
        highlights: [
          "Merancang antarmuka (frontend) website dengan tampilan yang responsif dan mudah digunakan.",
          "Membangun fitur absensi dan riwayat absensi karyawan, termasuk preview PDF absensi lembur yang dapat ditandatangani secara digital.",
          "Mengembangkan menu Create Guest WiFi serta Refresh Token menggunakan API Aruba.",
          "Melakukan uji coba sistem menggunakan Docker untuk memastikan aplikasi dapat berjalan di lingkungan berbeda.",
        ],
      },
    ];
    for (const [i, e] of experience.entries()) {
      await conn.query(
        `INSERT INTO experience (exp_key, role, company, period, description, highlights, sort_order)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [e.key, e.role, e.company, e.period, e.description, JSON.stringify(e.highlights), i]
      );
    }

    await conn.query("DELETE FROM nav_links");
    const navLinks = [
      { label: "Tentang", href: "#about", tag: "~/about" },
      { label: "Skill", href: "#stack", tag: "~/stack" },
      { label: "Proyek", href: "#projects", tag: "~/projects" },
      { label: "Pengalaman", href: "#experience", tag: "~/experience" },
      { label: "Kontak", href: "#contact", tag: "~/contact" },
    ];
    for (const [i, n] of navLinks.entries()) {
      await conn.query(
        `INSERT INTO nav_links (label, href, tag, sort_order) VALUES (?, ?, ?, ?)`,
        [n.label, n.href, n.tag, i]
      );
    }

    await conn.commit();
    console.log("Seed complete ✔");
  } catch (err) {
    await conn.rollback();
    console.error("Seed failed:", err);
    process.exitCode = 1;
  } finally {
    conn.release();
    pool.end();
  }
}

seed();
