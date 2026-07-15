
export const profile = {
  name: "ZiyadRifqi Permana",
  role: "Full Stack Developer",
  location: "Indonesia",
  tagline:
    "Antusias mempelajari teknologi baru dan membangun solusi digital melalui pengembangan web modern berbasis backend dan frontend.",
  summary:
    "Saya merancang dan membangun aplikasi web end-to-end — mulai dari arsitektur API dan database, sampai antarmuka yang cepat dan nyaman dipakai. Fokus saya ada di kode yang mudah dirawat dan produk yang benar-benar dipakai orang.",
  email: "ziyadrpe@gmail.com",
  phone: "+62 812-0000-0000",
  github: "https://github.com/Ziyadrifqi",
  linkedin: "https://www.linkedin.com/in/ziyadrifqi-permana-67bbb827b/",
  cvUrl: "https://drive.google.com/file/d/1afdxReEV1Iov8DCR70PFXutiUXLBEwdn/view?usp=sharing",
  availableForWork: true,
  photo: "/images/foto.png",
    web3formsAccessKey: "3f96e224-bf28-4a46-9045-4eb7fa42daec",
};

export const stack = [
  {
    group: "Frontend",
    tools: ["React", "Next.js", "Wordpress", "Tailwind CSS"],
    proficiency: 80,
  },
  {
    group: "Backend",
    tools: ["Laravel", "Codeigniter", "Golang", "Python(Flask)"],
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
    title: "Sistem Absensi Menggunakan Geolocation",
    description:
      "Corpit-Atten adalah aplikasi absensi berbasis web dibangun dengan codeigniter 4 yang membantu meningkatkan akurasi kehadiran karyawan melalui fitur geolocation dan verifikasi selfie. Sistem ini juga mempermudah pengajuan cuti dan lembur secara lebih cepat, aman, dan terorganisir.",
    tech: ["Codeigniter 4", "MySQL", "Boostraps"],
    image: "/images/projects/contoh-dashboard.jpg",
    href: null,
    repo: "https://github.com/Ziyadrifqi/Absensi",
  },
  {
    id: "proj-02",
    title: "Portal JakLingko Indonesia",
    description:
      "Website JakLingko dibangun menggunakan WordPress sebagai platform yang fleksibel untuk mengelola konten dan tampilan secara dinamis. Website ini menyediakan informasi terkait layanan transportasi terintegrasi, termasuk fitur, layanan, dan update terbaru bagi pengguna. Dengan desain yang responsif dan user-friendly.",
    tech: ["Wordpress"],
    image: "/images/projects/placeholder-2.jpg",
    href: "https://jaklingkoindonesia.co.id/",
    repo: null,
  },
  {
    id: "proj-03",
    title: "Sistem Manajamen Dokumen (Jasmine)",
    description:
      "Website Jasmine merupakan sistem manajemen dokumen berbasis web yang dibangun menggunakan framework Laravel dan Tailwind CSS, dirancang untuk mempermudah proses pembuatan, pengelolaan, dan persetujuan dokumen secara digital. Sistem ini memiliki alur kerja berbasis role seperti staff, sekretaris, dan direktur, mulai dari pembuatan dokumen, proses review, hingga persetujuan dengan tanda tangan dan QR code. Selain itu, Jasmine juga dilengkapi fitur pengelolaan surat masuk dan keluar, penomoran dokumen yang dapat dikustomisasi, serta sistem autentikasi yang aman untuk mendukung efisiensi dan transparansi dalam administrasi.",
    tech: ["Laravel", "MySQL","Tailwind CSS"],
    image: "/images/projects/placeholder-3.jpg",
    href: null,
    repo: null,
  },
  {
    id: "proj-04",
    title: "ZiyadRifqi Portofolio",
    description:
      "Portofolio pribadi Ziyad Rifqi Permana, Full Stack Developer. Dibangun dengan Next.js, TypeScript, dan Tailwind CSS bertema modern glassmorphism. Menampilkan proyek, skill, dan pengalaman kerja dengan desain interaktif serta form kontak terintegrasi.",
    tech: ["Next.js","Tailwind CSS"],
    image: "/images/projects/placeholder-4.jpg",
    href: null,
    repo: null,
  },
  {
    id: "proj-05",
    title: "Website Global Future",
    description:
      "API headless untuk manajemen konten dengan autentikasi berbasis peran dan dokumentasi otomatis.",
    tech: ["Golang","React","Tailwind CSS","Postgress"],
    image: "/images/projects/placeholder-4.jpg",
    href: null,
    repo: null,
  },
];

export const experience = [
  {
    id: "exp-01",
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
    id: "exp-02",
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

export const navLinks = [
  { label: "Tentang", href: "#about", tag: "~/about" },
  { label: "Skill", href: "#stack", tag: "~/stack" },
  { label: "Proyek", href: "#projects", tag: "~/projects" },
  { label: "Pengalaman", href: "#experience", tag: "~/experience" },
  { label: "Kontak", href: "#contact", tag: "~/contact" },
];
