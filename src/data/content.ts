// Semua konten portofolio dikumpulkan di sini.
// Ganti nilai placeholder di bawah dengan data asli Anda.

export const profile = {
  name: "Ziyad Rifqi Permana",
  role: "Full Stack Developer",
  location: "Indonesia",
  tagline:
    "Membangun produk web dari struktur data di backend sampai detail interaksi di layar.",
  summary:
    "Saya merancang dan membangun aplikasi web end-to-end — mulai dari arsitektur API dan database, sampai antarmuka yang cepat dan nyaman dipakai. Fokus saya ada di kode yang mudah dirawat dan produk yang benar-benar dipakai orang.",
  email: "ziyad.rifqi@example.com",
  phone: "+62 812-0000-0000",
  github: "https://github.com/ziyadrifqi",
  linkedin: "https://linkedin.com/in/ziyadrifqi",
  cvUrl: "#",
  availableForWork: true,
  photo: "/images/profile.jpg",
};

export const stack = [
  {
    group: "Frontend",
    tools: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    proficiency: 90,
  },
  {
    group: "Backend",
    tools: ["Node.js", "Express", "Laravel", "REST API"],
    proficiency: 85,
  },
  {
    group: "Database",
    tools: ["PostgreSQL", "MySQL", "MongoDB", "Redis"],
    proficiency: 80,
  },
  {
    group: "DevOps & Tools",
    tools: ["Docker", "Git", "Vercel", "Linux"],
    proficiency: 75,
  },
];

export const projects = [
  {
    id: "proj-01",
    title: "Sistem Inventori Multi-Gudang",
    description:
      "Aplikasi pengelolaan stok untuk bisnis dengan beberapa cabang gudang, lengkap dengan laporan mutasi barang real-time.",
    tech: ["Next.js", "PostgreSQL", "Prisma", "Tailwind CSS"],
    href: "#",
    repo: "#",
    status: "Production",
  },
  {
    id: "proj-02",
    title: "Platform Booking Layanan",
    description:
      "Sistem pemesanan jadwal layanan dengan kalender ketersediaan, notifikasi otomatis, dan dashboard admin.",
    tech: ["React", "Node.js", "Express", "MongoDB"],
    href: "#",
    repo: "#",
    status: "Production",
  },
  {
    id: "proj-03",
    title: "Dashboard Analitik Penjualan",
    description:
      "Visualisasi data penjualan dengan filter dinamis dan ekspor laporan ke Excel untuk tim manajemen.",
    tech: ["Next.js", "TypeScript", "Recharts", "MySQL"],
    href: "#",
    repo: "#",
    status: "In progress",
  },
  {
    id: "proj-04",
    title: "REST API Manajemen Konten",
    description:
      "API headless untuk manajemen konten dengan autentikasi berbasis peran dan dokumentasi otomatis.",
    tech: ["Laravel", "MySQL", "Redis", "Docker"],
    href: "#",
    repo: "#",
    status: "Production",
  },
];

export const experience = [
  {
    id: "exp-01",
    role: "Full Stack Developer",
    company: "Nama Perusahaan",
    period: "2023 — Sekarang",
    description:
      "Mengembangkan dan memelihara beberapa aplikasi internal, bertanggung jawab pada arsitektur API serta optimasi performa frontend.",
    highlights: [
      "Membangun ulang sistem lama menjadi arsitektur berbasis Next.js dan REST API",
      "Menurunkan waktu muat halaman utama secara signifikan lewat optimasi query dan caching",
      "Membimbing dua developer junior dalam code review dan praktik Git",
    ],
  },
  {
    id: "exp-02",
    role: "Junior Web Developer",
    company: "Nama Perusahaan Sebelumnya",
    period: "2021 — 2023",
    description:
      "Terlibat dalam pengembangan fitur baru untuk platform web perusahaan, bekerja sama dengan tim desain dan QA.",
    highlights: [
      "Mengimplementasikan fitur autentikasi dan manajemen pengguna",
      "Menulis dokumentasi teknis untuk API internal",
    ],
  },
  {
    id: "exp-03",
    role: "Freelance Web Developer",
    company: "Mandiri",
    period: "2020 — 2021",
    description:
      "Mengerjakan proyek website untuk UMKM dan organisasi lokal, dari landing page sampai sistem sederhana.",
    highlights: [
      "Menyelesaikan lebih dari 10 proyek website untuk klien lokal",
      "Menangani seluruh proses dari diskusi kebutuhan sampai deployment",
    ],
  },
];

export const navLinks = [
  { label: "Tentang", href: "#about", tag: "~/about" },
  { label: "Skill", href: "#stack", tag: "~/stack" },
  { label: "Proyek", href: "#projects", tag: "~/projects" },
  { label: "Pengalaman", href: "#experience", tag: "~/experience" },
  { label: "Kontak", href: "#contact", tag: "~/contact" },
];
