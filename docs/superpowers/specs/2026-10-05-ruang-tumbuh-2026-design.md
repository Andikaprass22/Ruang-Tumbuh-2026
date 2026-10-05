# Ruang Tumbuh 2026 — Event Landing Page Template (Design Spec)

- **Date:** 2026-10-05
- **Status:** Approved design, pending written-spec review
- **Path:** `docs/superpowers/specs/2026-10-05-ruang-tumbuh-2026-design.md`

## 1. Overview

A professional, responsive landing page for a one-day **seminar + workshop**
event, built with Vite + React + TypeScript + Tailwind CSS v4. The project
doubles as a **reusable template** that can be offered to organizers of
seminars, workshops, concerts, or community meetups: event name, schedule,
speakers, tickets, venue, and contact are all centralized in typed data modules,
so a new client is onboarded by editing a couple of files — never the components.

Demo brand: **Ruang Tumbuh 2026** — "Menemukan arah, membangun karya, tumbuh
bersama." All names, sessions, prices, and speakers shown are illustrative demo
content.

### Goals

- Ship a visually distinctive, theme-driven landing page (not generic SaaS blue)
  that works on desktop and mobile.
- Cover every requested section: navbar, hero, countdown, about + who it is for,
  speakers, agenda, tickets, location, FAQ, registration form, closing CTA, and a
  footer with contact, socials, and organizer info.
- Make every interactive element actually work: menu, FAQ accordion, countdown,
  ticket booking, and registration. No dead links, no unresponsive buttons.
- The countdown **stops and shows a correct status** once the event starts.
- Split event/speaker/agenda/ticket data from presentation so a client can
  customize without touching component code.
- After the form is submitted, show a **clear confirmation**.
- When registration is routed to WhatsApp, the prefilled message names the
  **event and the chosen ticket category**.

### Non-goals

- No backend, no database, no payment processing, no auth, no CMS.
- No form persistence beyond a WhatsApp / email deep link.
- No multi-page routing (single page — see §4).
- No automated E2E suite; verification is typecheck, lint, unit tests, build,
  and a manual checklist.

### Target users

- **Event organizers** buying the template as a starting point.
- **Prospective attendees** on desktop or mobile, guided toward booking a ticket
  or registering via WhatsApp.

## 2. Architecture

- **Build tooling:** Vite with `@vitejs/plugin-react`.
- **Language:** TypeScript, strict mode (`noUnusedLocals`, `noUnusedParameters`).
- **Styling:** Tailwind CSS v4 via `@tailwindcss/vite`. All colors, fonts, and
  radius declared once in an `@theme` block in `src/index.css` — the single
  restyle point.
- **Routing:** none. Single scrolling page; in-page anchors + native smooth
  scroll. `react-router-dom` is deliberately **not** a dependency.
- **State:** local component state only (mobile menu open, FAQ open set, form
  fields, countdown tick). No global store.
- **Data:** plain typed modules under `src/lib/`, imported directly by sections.
- **Motion:** restrained and opt-in (same system as the sibling template):
  reveal-on-scroll and collapse-by-grid-row, all disabled under
  `prefers-reduced-motion: reduce`. No parallax, no autoplaying carousels.

### Folder structure

```
Ruang-Tumbuh-2026/
  index.html
  package.json
  tsconfig.json
  vite.config.ts
  vitest.config.ts
  eslint.config.js
  .gitignore
  README.md
  docs/superpowers/specs/2026-10-05-ruang-tumbuh-2026-design.md
  docs/superpowers/plans/2026-10-05-ruang-tumbuh-2026.md
  public/img/                       # local SVG demo assets (logo, favicon, hero, speakers)
  src/
    main.tsx
    App.tsx                         # Page composition: Navbar + sections + Footer (+ Agentation dev)
    index.css                       # Tailwind import + @theme tokens + base + motion CSS
    vite-env.d.ts
    lib/
      types.ts                      # All domain interfaces
      site.ts                       # eventConfig: brand, identity, date, venue, contact  <-- client edits
      data.ts                       # speakers, agenda, tickets, audience, faqs          <-- client edits
      countdown.ts                  # getCountdown(): pure, testable
      useCountdown.ts               # ticking hook wrapper around getCountdown()
      whatsapp.ts                   # buildWhatsAppLink(), registrationMessage(), isWhatsAppConfigured()
      utils.ts                      # formatRupiah(), cn()
      motion.ts                     # prefersReducedMotion(), revealDelay()
      useInView.ts                  # IntersectionObserver reveal hook
      countdown.test.ts
      whatsapp.test.ts
      utils.test.ts
      data.test.ts
    components/
      layout/   Navbar.tsx, Footer.tsx
      sections/ Hero.tsx, Countdown.tsx, About.tsx, Speakers.tsx, Agenda.tsx,
                Tickets.tsx, Location.tsx, FAQ.tsx, RegistrationForm.tsx, FinalCTA.tsx
      ui/       Button.tsx, buttonStyles.ts, Badge.tsx, Card.tsx, Container.tsx,
                SectionHeading.tsx, Accordion.tsx, Input.tsx, Icon.tsx, Stat.tsx
```

## 3. Data model (`src/lib/types.ts`)

```ts
// Keys into a single local <Icon> map; keeps the template self-contained
// with no icon-font dependency.
export type IconName =
  | "calendar" | "clock" | "pin" | "ticket" | "mic" | "users" | "spark"
  | "check" | "arrow" | "map" | "mail" | "whatsapp" | "instagram"
  | "youtube" | "linkedin" | "menu" | "close" | "info" | "workshop";

export interface NavLink {
  label: string;
  href: string; // in-page anchor, e.g. "#tiket"
}

export interface SocialLink {
  label: string;
  url: string;  // real external URL
  icon: IconName;
}

export interface EventConfig {
  name: string;              // "Ruang Tumbuh 2026"
  shortName: string;         // "Ruang Tumbuh" (navbar on small screens)
  theme: string;             // event theme line, e.g. "Menemukan arah, membangun karya."
  tagline: string;           // hero supporting line
  description: string;       // meta description
  startISO: string;          // ISO 8601 with offset, e.g. "2026-11-14T09:00:00+07:00"
  endISO: string;            // ISO 8601 with offset
  dateLabel: string;         // "Sabtu, 14 November 2026"
  timeLabel: string;         // "09.00 – 16.00 WIB"
  venue: string;             // "Gedung Cendana Kreatif"
  city: string;              // "Bandung"
  address: string;           // full street address
  mapUrl: string;            // real Google Maps URL
  whatsapp: string;          // international format, digits only, e.g. "6281234567890"
  whatsappDefaultMessage: string;
  email: string;
  organizer: string;         // "Komunitas Ruang Tumbuh"
  organizerNote: string;     // one line about the organizer
  socials: SocialLink[];
  navLinks: NavLink[];
}

export interface Speaker {
  id: string;
  name: string;
  role: string;        // short job/role line
  topic: string;       // session title this speaker leads
  photo: string;       // /img/... path
  bio: string;         // 1–2 sentences
  tags: string[];      // up to 3 focus tags
}

export type AgendaTrack = "Pembukaan" | "Seminar" | "Workshop" | "Istirahat" | "Penutup";

export interface AgendaItem {
  id: string;
  time: string;          // start, "09.00"
  endTime?: string;      // optional end, "10.30"
  title: string;
  description: string;
  track: AgendaTrack;
  speakerId?: string;    // FK -> Speaker.id, optional (breaks, opening, closing)
  location?: string;     // "Ruang Utama" / "Studio B"
}

export interface Ticket {
  id: string;            // stable id, also used in the WhatsApp message
  name: string;          // "Seminar + Workshop"
  price: number;         // IDR integer; 0 renders as "Gratis"
  priceNote?: string;    // "termasuk makan siang"
  description: string;
  facilities: string[];  // what the holder gets
  badge?: string;        // "Paling lengkap"
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
```

### Helpers

`src/lib/utils.ts`
- `formatRupiah(n: number): string` → `"Rp150.000"`; `0` → `"Gratis"` at the
  component level (helper itself returns `"Rp0"`).
- `cn(...classes): string` — class join.

`src/lib/countdown.ts` (pure, unit-tested)
- `type CountdownState = "upcoming" | "live" | "ended"`
- `interface Countdown { state: CountdownState; days: number; hours: number; minutes: number; seconds: number }`
- `getCountdown(startISO: string, endISO: string, now: Date): Countdown`
  - `now < start` → `state: "upcoming"`, remaining time to `start`, all parts
    clamped to `>= 0`.
  - `start <= now < end` → `state: "live"`, all parts `0`.
  - `now >= end` → `state: "ended"`, all parts `0`.
  - Parsing is done with `new Date(iso)`; invalid ISO must not throw — treat as
    `"ended"` with zero parts.

`src/lib/useCountdown.ts`
- `useCountdown(startISO, endISO): Countdown` — computes once, then ticks every
  second via `setInterval`; **stops the interval** once `state !== "upcoming"`
  (the countdown "stops after the event starts", per the brief). Cleans up on
  unmount.

`src/lib/whatsapp.ts`
- `isWhatsAppConfigured(): boolean` — number non-empty after trim.
- `registrationMessage(ticketName?: string): string` — always contains the
  **event name**; includes `"kategori tiket <ticketName>"` when a ticket is
  chosen, otherwise a generic "ingin mendaftar" line. Uses `eventConfig`.
- `ticketMessage(ticketName: string): string` — used by ticket "Pesan Tiket"
  buttons; names the event and the exact ticket.
- `buildWhatsAppLink(message: string): string` →
  `https://wa.me/<number>?text=<encodeURIComponent(message)>`.

## 4. Page composition (single page)

One scrolling page. Section order and anchor ids (used by `eventConfig.navLinks`):

| # | Section | Anchor | Contents |
|---|---------|--------|----------|
| 1 | Navbar (sticky) | — | logo + name, nav links, "Daftar Sekarang" button, mobile hamburger |
| 2 | Hero | `#beranda` | event name, theme, date + time, venue + city, primary "Daftar Sekarang" (→ `#daftar`) and secondary "Lihat Tiket" (→ `#tiket`), hero illustration |
| 3 | Countdown | — | live ticking countdown; switches to a status line after the event starts |
| 4 | About | `#tentang` | what the event is, what attendees take home, "siapa yang cocok" cards |
| 5 | Speakers | `#pembicara` | photo, name, role, topic, bio, focus tags |
| 6 | Agenda | `#agenda` | chronological timeline with time, title, track badge, speaker, room |
| 7 | Tickets | `#tiket` | ticket cards: name, price, facilities, "Pesan Tiket" → WhatsApp |
| 8 | Location | `#lokasi` | venue, full address, "Buka di Google Maps" link, transport note |
| 9 | FAQ | `#faq` | accessible accordion |
| 10 | RegistrationForm | `#daftar` | name, WhatsApp, email (optional), ticket select, message; inline confirmation |
| 11 | FinalCTA | — | closing headline + register/ticket actions |
| 12 | Footer | — | contact (WhatsApp/email/address), socials, organizer info, demo-content notice |

The countdown sits directly under the hero so date/venue/countdown read as one
unit; on mobile it stacks beneath the hero copy.

## 5. Components

- **ui** — small, single-purpose primitives: `Button` (variants
  `primary | secondary | ghost | whatsapp`, sizes, renders `<a>` when given
  `href`, else `<button>`), `Badge` (tones `brand | accent | neutral`), `Card`,
  `Container`, `SectionHeading` (eyebrow + title + description), `Accordion`
  (accessible, multiple-open), `Input`/`Select`/`Textarea` with label + error
  text, `Icon` (inline SVG from a local map), `Stat` (label + value, used for
  countdown digits and date/time chips).
- **layout** — `Navbar` (sticky, hamburger below `md`, closes on Escape and on
  link click, every anchor resolves) and `Footer` (contact, socials, organizer).
- **sections** — one file per section; each imports its data from `lib` and
  receives no props from `App` except where shared state is needed. Tickets are
  self-contained; the registration form's ticket `<select>` is populated from
  `tickets` in `data.ts`.

### Countdown behavior (the important one)

- Renders four `Stat` cells: Hari / Jam / Menit / Detik while `upcoming`.
- Ticks every second, then **clears its interval** the moment state leaves
  `upcoming`.
- `live` → replaces the digits with a status banner: "Acara sedang berlangsung".
- `ended` → "Acara telah selesai — terima kasih telah hadir." plus a link to the
  organizer's Instagram/contact.
- Never renders negative numbers. Under `prefers-reduced-motion` the tick is
  still correct; there is no decorative animation tied to it.

### Accessibility

- Semantic landmarks (`header`, `nav`, `main`, `section[aria-labelledby]`,
  `footer`).
- Accordion uses real `<button>` with `aria-expanded` / `aria-controls`; closed
  answers use `visibility: hidden` so they leave the tab order.
- Mobile menu toggles `aria-expanded`; Escape closes it; focus ring visible
  (`:focus-visible`).
- Countdown digits use `aria-live="off"` (no per-second screen-reader spam);
  the status banner uses `role="status"`.
- Text contrast meets WCAG AA on brand and paper surfaces; decorative art is
  `alt=""`, meaningful images carry real `alt`.

### Responsive

- Mobile-first Tailwind; breakpoints base / `md` / `lg`.
- Grids: 1 col → 2 → 3 (speakers, tickets, audience). Agenda timeline is a
  single column with a left rail, full width on mobile (no horizontal scroll).
- Navbar collapses below `md`. Touch targets ≥ 44px. Long ticket names and
  prices wrap (`min-w-0`, `break-words`) so nothing overflows on small screens.

## 6. Interactions

| Interaction | Behavior |
|---|---|
| Nav link | Smooth-scrolls to its section anchor; closes the mobile menu |
| "Daftar Sekarang" (navbar/hero/CTA) | Smooth-scrolls to `#daftar` |
| "Lihat Tiket" / "Pesan Tiket" | Scrolls to `#tiket` / opens WhatsApp with `ticketMessage(name)` |
| Countdown | Ticks while upcoming; stops and shows status when live/ended |
| Agenda item | Static timeline row; speaker name links to the Speakers section anchor |
| FAQ item | Toggles open/closed; multiple open allowed |
| Mobile hamburger | Opens/closes the nav drawer |
| Registration submit | Validates required fields; on success opens WhatsApp with a message naming the event + ticket category; shows an inline confirmation. If WhatsApp is not configured, redirects to a `mailto:` with the same message and shows an inline note |
| Map / address / socials / email | Real, working links (`https://maps.google.com/...`, `mailto:`, social URLs) |

No `href="#"` placeholders anywhere: every link routes to a section anchor,
opens a real external URL, or triggers an action.

## 7. Visual design — "Pertumbuhan organik"

Warm, print-like, community-garden feel. Deliberately not blue SaaS.

`@theme` tokens (single restyle point in `src/index.css`):

```css
/* Identity: forest green. Deep enough to read as print, not as a dashboard. */
--color-brand-50:#f1f6f2; --color-brand-100:#dcebe0; --color-brand-200:#b9d6c2;
--color-brand-300:#8db99c; --color-brand-400:#5f9574; --color-brand-500:#3f7759;
--color-brand-600:#2c5d45; --color-brand-700:#234a3d; --color-brand-800:#1c3a31;
--color-brand-900:#152c26;

/* Accent: clay/terracotta. Emphasis only — badges, rules, small fills. */
--color-accent-100:#f8e6dc; --color-accent-200:#eec7b4; --color-accent-500:#b4552f;
--color-accent-600:#98411f; --color-accent-700:#7a3418;

/* Text: warm neutrals, no slate. */
--color-ink-900:#1a1a17; --color-ink-700:#42433c; --color-ink-500:#6b6d63;

/* Surfaces: warm paper. */
--color-paper:#f7f3ea; --color-paper-deep:#efe9dc; --color-line:#e2dbcb;

--font-display:"Fraunces", ui-serif, Georgia, serif;
--font-sans:"Plus Jakarta Sans", ui-sans-serif, system-ui, sans-serif;
--radius-card:0.75rem;
```

Google Fonts (Fraunces + Plus Jakarta Sans) are loaded from `index.html` with
`preconnect`. Motion, safe-area, and reduced-motion CSS reuse the sibling
template's proven, opt-in approach. Hero uses a local SVG illustration; speaker
photos are local SVG avatars — the build has **no external image dependency**.

## 8. Customization guide (for offering the template)

1. **Event & contact** — edit `src/lib/site.ts` (`eventConfig`): name, theme,
   `startISO`/`endISO`, date/time labels, venue, address, `mapUrl`, WhatsApp
   number, email, organizer, socials, nav links.
2. **Content** — edit `src/lib/data.ts`: `speakers`, `agenda`, `tickets`,
   `audience`, `faqs`.
3. **Theme** — edit the `@theme` tokens in `src/index.css`.
4. **Images** — drop files in `public/img/` and reference `/img/name.svg`, or use
   external URLs in `data.ts`.
5. **Countdown date is the only thing that changes the countdown** — setting
   `startISO`/`endISO` in the past is how you demo the live/ended states.
6. `README.md` documents all of the above for the buyer.

## 9. Demo-content rules

- All names, sessions, prices, and speaker bios are clearly illustrative demo
  data; the footer states this.
- **No invented participant counts, no "kuota terbatas" / scarcity claims, no
  "terverifikasi" / guaranteed-outcome claims.**
- Speaker blurbs describe topics, not fabricated credentials or employers.
- Promotional copy avoids clichés ("solusi terbaik", "jangan sampai
  ketinggalan", "revolusioner"); it states what the event is and for whom.
- Prices are demo values presented as IDR; `formatRupiah` renders them.
- All images are local SVG assets under `public/img/` so nothing can break.

## 10. Verification

- `npm test` — Vitest: `countdown` (upcoming/live/ended + boundary + invalid
  input), `whatsapp` (message names event + ticket category; unconfigured
  fallback), `utils`, `data` (agenda `speakerId` referential integrity, unique
  ticket/faq ids).
- `npm run lint` — ESLint passes.
- `npm run build` — `tsc --noEmit` clean + `vite build` emits `dist/`.
- `npm run dev` manual checklist: navbar + smooth scroll; mobile hamburger;
  every nav link resolves; FAQ toggle; countdown ticks and — with `startISO`
  temporarily set in the past — shows the live/ended status; ticket "Pesan
  Tiket" opens WhatsApp naming the event + ticket; form validation blocks empty
  required fields; valid submit opens WhatsApp with event + ticket category (or
  email when the number is blank); map/socials/email links open correctly;
  `grep -n 'href="#"' src/` returns nothing; no horizontal overflow at 320px.
- Confirm `dist/` was produced.

## 11. Decisions & open questions

Resolved with the user:

- **Visual direction:** Pertumbuhan organik (clay + forest green + cream,
  Fraunces display).
- **Structure:** single page, in-page anchors, no router.
- **Countdown date:** Sabtu, 14 November 2026 (tentative demo date; editable in
  `site.ts`).
- **Registration flow:** WhatsApp deep link with email fallback when no number
  is configured.
- **No git commits** during implementation (per project convention).

Deferred (can add later if wanted):

- Real form backend / email delivery.
- Multi-day agenda or per-session detail pages.
- Ticket capacity / payment integration.
