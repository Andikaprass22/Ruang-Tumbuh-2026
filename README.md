# Ruang Tumbuh 2026 — Landing Page Template

Landing page acara profesional (seminar & workshop) yang dibangun dengan
**Vite + React + TypeScript + Tailwind CSS v4**. Proyek ini sekaligus menjadi
**template** yang bisa ditawarkan kepada penyelenggara seminar, workshop,
konser, atau acara komunitas: nama acara, jadwal, pembicara, tiket, lokasi, dan
kontak semuanya dipusatkan di `src/lib/`, sehingga Anda mengganti isi tanpa
menyentuh komponen.

> Semua nama, jadwal, harga, dan pembicara di dalam proyek ini adalah **konten
> demo**. Ganti dengan data asli sebelum dipublikasikan. Tidak ada klaim jumlah
> peserta, kuota terbatas, atau pembicara terverifikasi.

## Menjalankan proyek

Butuh Node.js 20+.

```bash
npm install
npm run dev        # server pengembangan
npm run build      # type-check + build produksi ke dist/
npm run preview    # pratinjau hasil build
npm run lint       # ESLint
npm test           # unit test (Vitest)
```

## Struktur singkat

```
src/
  lib/
    site.ts        # identitas acara, tanggal, lokasi, kontak, menu   <-- ganti di sini
    data.ts        # pembicara, agenda, tiket, audiens, FAQ            <-- ganti di sini
    types.ts       # tipe data (kontrak untuk site.ts & data.ts)
    countdown.ts   # getCountdown() — logika hitung mundur (murni & teruji)
    useCountdown.ts# pembungkus yang berdetak tiap detik
    whatsapp.ts    # pembuat pesan & tautan WhatsApp
    utils.ts       # formatRupiah, cn
  components/
    layout/        # Navbar, Footer
    sections/      # tiap bagian halaman (Hero, Countdown, About, Speakers, ...)
    ui/            # komponen dasar (Button, Card, Accordion, Stat, dll.)
  pages/
    Home.tsx       # komposisi seluruh bagian, urut dari atas ke bawah
```

## Menyesuaikan untuk klien baru

### 1. Identitas & kontak — `src/lib/site.ts`

- `name`, `shortName`, `theme`, `tagline`, `description`
- **Tanggal hitung mundur**: `startISO` dan `endISO` dalam format ISO 8601
  dengan offset zona waktu (contoh: `2026-11-14T09:00:00+07:00`). Hitung mundur
  berhenti dan menampilkan status saat acara dimulai/selesai.
- `dateLabel`, `timeLabel` — teks tanggal & waktu yang ditampilkan.
- `venue`, `city`, `address`, `mapUrl` — lokasi dan tautan Google Maps.
- `whatsapp`: nomor format internasional, **hanya angka**, tanpa `+`, spasi,
  atau tanda hubung (contoh: `6281234567890`).
- `email`, `organizer`, `organizerNote`, `socials`, `navLinks`.

Jika `whatsapp` dikosongkan, tombol pendaftaran/pemesanan otomatis mengarah ke
formulir pendaftaran dan formulir dialihkan ke email — sehingga tidak ada tombol
mati.

### 2. Konten — `src/lib/data.ts`

- `speakers`: pembicara/pengisi acara (foto, nama, peran, topik, bio, tag).
- `agenda`: sesi berdasarkan waktu. `speakerId` merujuk `speakers[].id`.
- `tickets`: pilihan tiket (nama, harga, fasilitas, badge). Harga `0` otomatis
  ditampilkan sebagai "Gratis".
- `audience`: profil "siapa yang cocok mengikuti".
- `faqs`: pertanyaan yang bisa dibuka/tutup.

Semua bertipe lewat `src/lib/types.ts`, sehingga salah ketik terlihat di editor.
Unit test `src/lib/data.test.ts` memastikan rujukan pembicara pada agenda valid
dan id tiket/FAQ unik.

### 3. Tema — `src/index.css`

Seluruh warna, font, dan radius berasal dari satu blok `@theme`:

- `--color-brand-*` — identitas (hijau hutan).
- `--color-accent-*` — clay/terracotta, hanya untuk penanda kecil.
- `--color-ink-*`, `--color-paper*`, `--color-line` — teks dan permukaan hangat.
- `--font-display` (Fraunces, judul) dan `--font-sans` (Plus Jakarta Sans).
  Keduanya dimuat dari Google Fonts di `index.html`; bila mengganti font,
  perbarui tautan di sana **dan** fallback pada token ini.
- `--radius-card` — radius kartu dan panel.

### 4. Gambar

Letakkan berkas di `public/img/` lalu rujuk sebagai `/img/nama-file.svg` di
`data.ts`/`site.ts`. Gambar demo adalah SVG lokal agar build tidak bergantung
pada layanan eksternal. Ganti `logo.svg`, `favicon.svg`, `hero.svg`, dan
`speaker-*.svg` dengan aset klien.

## Fitur yang berfungsi

- Navigasi dengan smooth scroll dan menu mobile (hamburger).
- Hitung mundur acara yang berhenti dan menampilkan status setelah acara mulai.
- Deskripsi acara dan profil "siapa yang cocok mengikuti".
- Daftar pembicara dengan foto, nama, peran, topik, dan bio.
- Agenda berdasarkan waktu, dengan penanda sesi Seminar / Workshop / Istirahat.
- Pilihan tiket dengan harga, fasilitas, dan tombol "Pesan Tiket".
- Info lokasi dengan alamat dan tautan Google Maps.
- FAQ yang bisa dibuka dan ditutup.
- Formulir pendaftaran dengan validasi dasar dan konfirmasi inline.
- Tombol pendaftaran/pemesanan membuka WhatsApp dengan pesan otomatis berisi
  **nama acara dan kategori tiket**.
- Footer berisi kontak, media sosial, dan informasi penyelenggara.

## Uji & verifikasi

```bash
npm test     # unit test untuk helper & data
npm run lint
npm run build
```

## Deploy

`npm run build` menghasilkan berkas statis di `dist/`. Situs ini satu halaman,
jadi tidak butuh konfigurasi SPA fallback khusus untuk rute.
