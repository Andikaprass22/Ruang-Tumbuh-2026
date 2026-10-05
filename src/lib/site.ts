import type { EventConfig } from "./types";

/**
 * Identitas acara & kontak. Ganti nilai di sini untuk memakai template ini pada
 * acara lain — tidak ada komponen yang perlu diubah. Tanggal hitung mundur
 * berasal dari `startISO` dan `endISO`.
 */
export const eventConfig: EventConfig = {
  name: "Ruang Tumbuh 2026",
  shortName: "Ruang Tumbuh",
  theme: "Menemukan arah, membangun karya, tumbuh bersama.",
  tagline:
    "Seminar dan workshop sehari untuk merapikan langkah, mencoba hal baru, dan bertemu orang yang sedang membangun hal serupa.",
  description:
    "Ruang Tumbuh 2026 adalah seminar dan workshop sehari untuk merapikan arah, membangun karya, dan bertumbuh bersama komunitas.",
  startISO: "2026-11-14T09:00:00+07:00",
  endISO: "2026-11-14T16:00:00+07:00",
  dateLabel: "Sabtu, 14 November 2026",
  timeLabel: "09.00 – 16.00 WIB",
  venue: "Gedung Cendana Kreatif",
  city: "Bandung",
  address: "Jl. Cendana Raya No. 8, Bandung, Jawa Barat 40115",
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Jl.%20Cendana%20Raya%20No.%208%2C%20Bandung",
  whatsapp: "6281234567890",
  whatsappDefaultMessage:
    "Halo Ruang Tumbuh 2026, saya ingin bertanya mengenai acara ini.",
  email: "halo@ruangtumbuh.example",
  organizer: "Komunitas Ruang Tumbuh",
  organizerNote:
    "Komunitas yang rutin mengadakan ruang belajar dan berbagi untuk pelajar, pekerja kreatif, dan siapa pun yang ingin bertumbuh.",
  socials: [
    { label: "Instagram", url: "https://www.instagram.com/ruangtumbuh", icon: "instagram" },
    { label: "YouTube", url: "https://www.youtube.com/@ruangtumbuh", icon: "youtube" },
    { label: "LinkedIn", url: "https://www.linkedin.com/company/ruangtumbuh", icon: "linkedin" },
  ],
  navLinks: [
    { label: "Tentang", href: "#tentang" },
    { label: "Pembicara", href: "#pembicara" },
    { label: "Agenda", href: "#agenda" },
    { label: "Tiket", href: "#tiket" },
    { label: "Lokasi", href: "#lokasi" },
    { label: "FAQ", href: "#faq" },
  ],
};
