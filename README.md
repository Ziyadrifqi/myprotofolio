# Portfolio jadi dinamis — Express.js + MySQL

Struktur ini asumsinya ditaruh **di dalam repo Next.js kamu yang sekarang**, sebagai folder `server/` di root project (sejajar dengan folder `src/`).

```
your-portfolio/
├── server/              ← backend Express baru (dari folder server/ di sini)
├── src/
│   ├── app/page.tsx     ← replace dengan frontend-updates/src/app/page.tsx
│   ├── components/      ← replace file yang namanya sama
│   └── lib/api.ts       ← file baru, dari frontend-updates/src/lib/api.ts
└── ...
```

## 1. Pasang backend

```bash
# dari root project Next.js kamu
cp -r server ./server
cd server
npm install
cp .env.example .env
```

Edit `server/.env`, isi kredensial MySQL kamu (`DB_USER`, `DB_PASSWORD`, dll).

## 2. Buat database & tabel

```bash
mysql -u root -p < src/schema.sql
```

Ini otomatis bikin database `portfolio_db` beserta tabel `profile`, `stack_groups`, `projects`, `experience`, `nav_links`.

## 3. Isi data awal (seed)

Data yang sebelumnya hardcode di `src/data/content.ts` sudah dipindahkan ke `server/src/seed.js`, isinya sama persis. Jalankan:

```bash
npm run seed
```

## 4. Jalankan backend

```bash
npm run dev
# Portfolio API running on http://localhost:4000
```

Cek: `http://localhost:4000/api/portfolio` harus mengembalikan JSON berisi profile, stack, projects, experience, navLinks.

## 5. Update frontend Next.js

Copy file-file di `frontend-updates/` ke lokasi yang sama di project Next.js kamu (timpa file lama):

- `src/lib/api.ts` (baru)
- `src/app/page.tsx`
- `src/components/Navbar.tsx`
- `src/components/Hero.tsx`
- `src/components/About.tsx`
- `src/components/Stack.tsx`
- `src/components/Projects.tsx`
- `src/components/Experience.tsx`
- `src/components/Contact.tsx`
- `src/components/Footer.tsx`

Lalu tambahkan `.env.local` di root project Next.js (isi dari `frontend-updates/.env.local.example`):

```
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=3f96e224-bf28-4a46-9045-4eb7fa42daec
```

`src/data/content.ts` sudah tidak dipakai lagi — boleh dihapus setelah kamu pastikan semua komponen sudah pakai data dari API.

## 6. Jalankan Next.js

```bash
npm run dev
```

Homepage sekarang mengambil semua data (profile, stack, projects, experience, nav links) dari backend Express saat request masuk, dengan cache 60 detik (`revalidate: 60` di `getPortfolioData`) supaya tidak membebani database di tiap request.

## Cara kerja singkat

- **`GET /api/portfolio`** — satu endpoint gabungan, dipanggil oleh `page.tsx` (Server Component) di server, bukan dari browser.
- Endpoint terpisah (`/api/profile`, `/api/stack`, `/api/projects`, `/api/experience`, `/api/nav-links`) juga tersedia kalau nanti kamu butuh fetch granular, misalnya untuk halaman admin.
- Form kontak tetap pakai Web3Forms langsung dari browser (tidak lewat backend) — key-nya sekarang jadi env var publik, bukan hardcode di kode seperti sebelumnya.
- Kolom `tech`, `tools`, `highlights` disimpan sebagai `JSON` di MySQL supaya strukturnya tetap array seperti versi lama, tanpa perlu tabel relasi tambahan.

## Kalau nanti mau tambah panel admin

Struktur di atas sudah siap untuk itu — tinggal tambah route `POST/PUT/DELETE` di masing-masing file `server/src/routes/*.js` (sekarang baru `GET`), plus halaman admin terpisah di Next.js yang manggil endpoint-endpoint itu. Bilang aja kalau mau saya bikinkan sekalian.
