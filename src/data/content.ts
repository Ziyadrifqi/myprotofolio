
export const profile = {
  name: "ZiyadRifqi Permana",
  role: "Full Stack Developer",
  location: "Indonesia",
  tagline:
    "Membangun produk web dari struktur data di backend sampai detail interaksi di layar.",
  summary:
    "Saya merancang dan membangun aplikasi web end-to-end — mulai dari arsitektur API dan database, sampai antarmuka yang cepat dan nyaman dipakai. Fokus saya ada di kode yang mudah dirawat dan produk yang benar-benar dipakai orang.",
  email: "ziyadrpe@gmail.com",
  phone: "+62 812-0000-0000",
  github: "https://github.com/Ziyadrifqi",
  linkedin: "https://www.linkedin.com/in/ziyadrifqi-permana-67bbb827b/",
  cvUrl: "#",
  availableForWork: true,
  photo: "/images/profile.jpg",
    web3formsAccessKey: "3f96e224-bf28-4a46-9045-4eb7fa42daec",
};

export const stack = [
  {
    group: "Frontend",
    tools: ["React", "Next.js", "Tailwind CSS"],
    proficiency: 80,
  },
  {
    group: "Backend",
    tools: ["Laravel", "Codeigniter", "Golang"],
    proficiency: 90,
  },
  {
    group: "Database",
    tools: ["MySQL", "PostgreSQL"],
    proficiency: 80,
  },
  {
    group: "DevOps & Tools",
    tools: ["Docker", "Git"],
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
    image: "/images/projects/contoh-dashboard.jpg",
    href: null,
    repo: null,
  },
  {
    id: "proj-02",
    title: "Platform Booking Layanan",
    description:
      "Sistem pemesanan jadwal layanan dengan kalender ketersediaan, notifikasi otomatis, dan dashboard admin.",
    tech: ["React", "Node.js", "Express", "MongoDB"],
    image: "/images/projects/placeholder-2.jpg",
    href: null,
    repo: null,
  },
  {
    id: "proj-03",
    title: "Dashboard Analitik Penjualan",
    description:
      "Visualisasi data penjualan dengan filter dinamis dan ekspor laporan ke Excel untuk tim manajemen.",
    tech: ["Next.js", "TypeScript", "Recharts", "MySQL"],
    image: "/images/projects/placeholder-3.jpg",
    href: null,
    repo: null,
  },
  {
    id: "proj-04",
    title: "REST API Manajemen Konten",
    description:
      "API headless untuk manajemen konten dengan autentikasi berbasis peran dan dokumentasi otomatis.",
    tech: ["Laravel", "MySQL", "Redis", "Docker"],
    image: "/images/projects/placeholder-4.jpg",
    href: null,
    repo: null,
  },
];

export const experience = [
  {
    id: "exp-01",
    role: "Information and System Technology Intern",
    company: "PT Jakarta Lingko Indonesia",
    period: "Nov 2025 — Mei 2026",
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
];

export const navLinks = [
  { label: "Tentang", href: "#about", tag: "~/about" },
  { label: "Skill", href: "#stack", tag: "~/stack" },
  { label: "Proyek", href: "#projects", tag: "~/projects" },
  { label: "Pengalaman", href: "#experience", tag: "~/experience" },
  { label: "Kontak", href: "#contact", tag: "~/contact" },
];
