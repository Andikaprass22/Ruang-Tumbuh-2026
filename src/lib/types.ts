// Keys into a single local <Icon> map; keeps the template self-contained with
// no icon-font dependency.
export type IconName =
  | "calendar"
  | "clock"
  | "pin"
  | "ticket"
  | "mic"
  | "users"
  | "spark"
  | "check"
  | "arrow"
  | "map"
  | "mail"
  | "whatsapp"
  | "instagram"
  | "youtube"
  | "linkedin"
  | "menu"
  | "close"
  | "info"
  | "workshop";

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  url: string;
  icon: IconName;
}

export interface EventConfig {
  name: string;
  shortName: string;
  theme: string;
  tagline: string;
  description: string;
  startISO: string;
  endISO: string;
  dateLabel: string;
  timeLabel: string;
  venue: string;
  city: string;
  address: string;
  mapUrl: string;
  whatsapp: string;
  whatsappDefaultMessage: string;
  email: string;
  organizer: string;
  organizerNote: string;
  socials: SocialLink[];
  navLinks: NavLink[];
}

export interface Speaker {
  id: string;
  name: string;
  role: string;
  topic: string;
  photo: string;
  bio: string;
  tags: string[];
}

export type AgendaTrack =
  | "Pembukaan"
  | "Seminar"
  | "Workshop"
  | "Istirahat"
  | "Penutup";

export interface AgendaItem {
  id: string;
  time: string;
  endTime?: string;
  title: string;
  description: string;
  track: AgendaTrack;
  speakerId?: string;
  location?: string;
}

export interface Ticket {
  id: string;
  name: string;
  price: number;
  priceNote?: string;
  description: string;
  facilities: string[];
  badge?: string;
  featured?: boolean;
}

export interface AudienceProfile {
  id: string;
  title: string;
  description: string;
  icon: IconName;
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
}
