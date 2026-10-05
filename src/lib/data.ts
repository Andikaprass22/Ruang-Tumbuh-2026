import type {
  AgendaItem,
  AudienceProfile,
  Faq,
  Speaker,
  Ticket,
} from "./types";

/*
 * Konten demo Ruang Tumbuh 2026. Semua nama, topik, harga, dan jadwal di sini
 * bersifat ilustratif dan aman untuk diganti. Tidak ada klaim jumlah peserta,
 * kuota, atau kredensial terverifikasi.
 */

export const speakers: Speaker[] = [
  {
    id: "ayu",
    name: "Ayu Prameswari",
    role: "Fasilitator Menulis",
    topic: "Menemukan suara sendiri lewat tulisan",
    photo: "/img/speaker-1.svg",
    bio: "Ayu mendampingi orang menuliskan gagasannya sendiri, dari catatan harian sampai naskah pendek. Sesi ini tentang memulai dari apa yang sudah ada di kepala kita.",
    tags: ["Menulis", "Narasi", "Kebiasaan"],
  },
  {
    id: "bagas",
    name: "Bagas Nugraha",
    role: "Desainer Produk",
    topic: "Merancang karya yang benar-benar dipakai",
    photo: "/img/speaker-2.svg",
    bio: "Bagas biasa bekerja dari pertanyaan sederhana: apa yang sebenarnya dibutuhkan orang? Ia berbagi cara merapikan gagasan menjadi karya yang berguna.",
    tags: ["Desain", "Produk", "Riset"],
  },
  {
    id: "citra",
    name: "Citra Halimah",
    role: "Praktisi Pengembangan Diri",
    topic: "Kebiasaan kecil yang menahan langkah",
    photo: "/img/speaker-3.svg",
    bio: "Citra meneliti kebiasaan sehari-hari yang membuat kita berhenti di tengah jalan, dan cara mengubahnya pelan-pelan tanpa memaksa diri.",
    tags: ["Kebiasaan", "Fokus", "Refleksi"],
  },
  {
    id: "damar",
    name: "Damar Wicaksono",
    role: "Musisi & Produser",
    topic: "Membangun karya dari keterbatasan",
    photo: "/img/speaker-4.svg",
    bio: "Damar membuat musik dengan peralatan seadanya. Di workshop ini ia mengajak peserta menyelesaikan satu karya kecil meski sumber daya terbatas.",
    tags: ["Musik", "Kolaborasi", "Praktik"],
  },
  {
    id: "eka",
    name: "Eka Larasati",
    role: "Peneliti Sosial",
    topic: "Membaca kebutuhan komunitas",
    photo: "/img/speaker-5.svg",
    bio: "Eka membantu kelompok komunitas mengenali kebutuhan warganya sebelum menyusun kegiatan. Sesi ini penuh latihan bertanya dan mendengar.",
    tags: ["Riset", "Komunitas", "Wawancara"],
  },
  {
    id: "fajar",
    name: "Fajar Ramadhan",
    role: "Fotografer Dokumenter",
    topic: "Merekam cerita di sekitar kita",
    photo: "/img/speaker-6.svg",
    bio: "Fajar berbagi cara merekam keseharian dengan jujur, tanpa perlu pergi jauh atau peralatan mahal. Cocok untuk siapa pun yang ingin bercerita lewat gambar.",
    tags: ["Fotografi", "Cerita", "Dokumentasi"],
  },
];

export const agenda: AgendaItem[] = [
  {
    id: "registrasi",
    time: "08.30",
    endTime: "09.00",
    title: "Registrasi & sarapan pagi",
    description: "Ambil tanda peserta, sarapan ringan, dan berkenalan dengan peserta lain.",
    track: "Pembukaan",
    location: "Lobi",
  },
  {
    id: "pembukaan",
    time: "09.00",
    endTime: "09.20",
    title: "Pembukaan & kerangka hari ini",
    description: "Sambutan singkat dan penjelasan alur acara agar semua peserta tahu apa yang akan dibawa pulang.",
    track: "Pembukaan",
    location: "Ruang Utama",
  },
  {
    id: "ayu",
    time: "09.20",
    endTime: "10.10",
    title: "Menemukan suara sendiri lewat tulisan",
    description: "Latihan memulai tulisan dari pengalaman sehari-hari, tanpa menunggu ide besar.",
    track: "Seminar",
    speakerId: "ayu",
    location: "Ruang Utama",
  },
  {
    id: "citra",
    time: "10.10",
    endTime: "10.50",
    title: "Kebiasaan kecil yang menahan langkah",
    description: "Mengenali kebiasaan yang membuat kita berhenti dan menyusun langkah berikutnya.",
    track: "Seminar",
    speakerId: "citra",
    location: "Ruang Utama",
  },
  {
    id: "kopi-pagi",
    time: "10.50",
    endTime: "11.10",
    title: "Istirahat & kopi",
    description: "Jeda singkat untuk meregangkan badan dan mengobrol.",
    track: "Istirahat",
    location: "Lobi",
  },
  {
    id: "bagas",
    time: "11.10",
    endTime: "12.00",
    title: "Merancang karya yang benar-benar dipakai",
    description: "Dari gagasan ke bentuk sederhana: cara menguji apakah karya kita berguna.",
    track: "Seminar",
    speakerId: "bagas",
    location: "Ruang Utama",
  },
  {
    id: "makan-siang",
    time: "12.00",
    endTime: "13.00",
    title: "Makan siang & jaringan",
    description: "Makan siang bersama dan waktu bebas untuk bertukar kontak.",
    track: "Istirahat",
    location: "Aula",
  },
  {
    id: "damar",
    time: "13.00",
    endTime: "14.30",
    title: "Workshop: Membangun karya dari keterbatasan",
    description: "Sesi praktik menyelesaikan satu karya musik kecil dengan peralatan seadanya.",
    track: "Workshop",
    speakerId: "damar",
    location: "Studio A",
  },
  {
    id: "eka",
    time: "13.00",
    endTime: "14.30",
    title: "Workshop: Membaca kebutuhan komunitas",
    description: "Latihan mewawancarai dan merangkum kebutuhan warga sebelum menyusun kegiatan.",
    track: "Workshop",
    speakerId: "eka",
    location: "Studio B",
  },
  {
    id: "istirahat-sore",
    time: "14.30",
    endTime: "15.00",
    title: "Istirahat sore",
    description: "Jeda sebelum sesi penutup, dengan camilan ringan.",
    track: "Istirahat",
    location: "Lobi",
  },
  {
    id: "fajar",
    time: "15.00",
    endTime: "15.40",
    title: "Merekam cerita di sekitar kita",
    description: "Melihat kembali keseharian sebagai bahan cerita yang layak dibagikan.",
    track: "Seminar",
    speakerId: "fajar",
    location: "Ruang Utama",
  },
  {
    id: "penutup",
    time: "15.40",
    endTime: "16.00",
    title: "Penutup & refleksi",
    description: "Menuliskan satu langkah kecil yang akan dibawa pulang, lalu foto bersama.",
    track: "Penutup",
    location: "Ruang Utama",
  },
];

export const tickets: Ticket[] = [
  {
    id: "pelajar",
    name: "Tiket Pelajar",
    price: 95000,
    priceNote: "dengan kartu pelajar atau mahasiswa",
    description: "Untuk pelajar dan mahasiswa yang ingin mengikuti seluruh sesi seminar.",
    facilities: [
      "Akses semua sesi seminar",
      "Makan siang dan camilan",
      "Materi ringkasan digital",
      "Perlu menunjukkan kartu pelajar saat check-in",
    ],
  },
  {
    id: "seminar",
    name: "Tiket Seminar",
    price: 150000,
    description: "Untuk peserta yang ingin fokus mengikuti sesi seminar sepanjang hari.",
    facilities: [
      "Akses semua sesi seminar",
      "Makan siang dan camilan",
      "Materi ringkasan digital",
      "Waktu jaringan dengan peserta lain",
    ],
  },
  {
    id: "seminar-workshop",
    name: "Tiket Seminar + Workshop",
    price: 275000,
    priceNote: "termasuk satu sesi workshop pilihan",
    description: "Paket lengkap: seluruh sesi seminar ditambah satu sesi workshop praktik.",
    facilities: [
      "Akses semua sesi seminar",
      "Satu sesi workshop pilihan (Studio A atau Studio B)",
      "Alat dan bahan workshop",
      "Makan siang dan camilan",
      "Materi ringkasan digital",
    ],
    badge: "Paling lengkap",
    featured: true,
  },
  {
    id: "komunitas",
    name: "Tiket Komunitas",
    price: 0,
    priceNote: "perlu konfirmasi kehadiran lewat WhatsApp",
    description: "Untuk relawan dan penggerak komunitas yang ingin ikut serta dalam sesi seminar.",
    facilities: [
      "Akses sesi seminar",
      "Ruang berbagi sesama penggerak komunitas",
      "Perlu konfirmasi kehadiran lewat WhatsApp",
    ],
  },
];

export const audience: AudienceProfile[] = [
  {
    id: "pelajar",
    title: "Pelajar & mahasiswa",
    description: "Yang sedang mencari arah dan ingin mencoba cara baru untuk memulai.",
    icon: "users",
  },
  {
    id: "kreatif",
    title: "Pekerja kreatif",
    description: "Yang mengerjakan karya dan ingin merapikan prosesnya agar lebih tahan lama.",
    icon: "spark",
  },
  {
    id: "komunitas",
    title: "Penggerak komunitas",
    description: "Yang mengelola kegiatan bersama dan ingin mendengar kebutuhan warganya lebih baik.",
    icon: "workshop",
  },
  {
    id: "memulai",
    title: "Siapa pun yang sedang memulai",
    description: "Tidak perlu pengalaman sebelumnya — cukup rasa ingin tahu dan niat mencoba.",
    icon: "info",
  },
];

export const faqs: Faq[] = [
  {
    id: "makan",
    question: "Apakah tiket sudah termasuk makan siang?",
    answer:
      "Ya. Semua tiket sudah termasuk makan siang dan camilan. Bila Anda punya kebutuhan makan khusus, sampaikan saat mendaftar agar kami siapkan sebaik mungkin.",
  },
  {
    id: "pemula",
    question: "Apakah acara ini cocok untuk pemula?",
    answer:
      "Cocok. Sesi dirancang agar bisa diikuti tanpa pengalaman sebelumnya. Kalau Anda masih ragu, pilih kategori tiket \"belum menentukan\" saat mendaftar dan kami bantu carikan yang sesuai.",
  },
  {
    id: "daftar",
    question: "Bagaimana cara mendaftar dan membayar?",
    answer:
      "Isi formulir di halaman ini, lalu lanjutkan lewat WhatsApp. Setelah itu kami kirimkan langkah pembayaran dan konfirmasi kehadiran.",
  },
  {
    id: "pelajar",
    question: "Apakah tersedia tiket khusus pelajar?",
    answer:
      "Ada. Tiket Pelajar lebih terjangkau dengan menunjukkan kartu pelajar atau mahasiswa saat check-in.",
  },
  {
    id: "rekaman",
    question: "Apakah ada rekaman acara?",
    answer:
      "Saat ini acara dirancang untuk dihadiri langsung agar bisa berlatih dan berdiskusi. Kami belum menjanjikan rekaman untuk semua sesi.",
  },
  {
    id: "onsite",
    question: "Apakah bisa datang tanpa mendaftar lebih dulu?",
    answer:
      "Kami sarankan mendaftar lebih dulu agar kursi dan konsumsi tertata. Bila masih ada tempat, pendaftaran di lokasi dapat kami layani.",
  },
];

export function getSpeakerById(id: string): Speaker | undefined {
  return speakers.find((speaker) => speaker.id === id);
}

export function getTicketById(id: string): Ticket | undefined {
  return tickets.find((ticket) => ticket.id === id);
}

/** Safe relation lookup: `undefined` when the id is missing, never a throw. */
export function getAgendaSpeaker(item: AgendaItem): Speaker | undefined {
  if (!item.speakerId) {
    return undefined;
  }
  return speakers.find((speaker) => speaker.id === item.speakerId);
}
