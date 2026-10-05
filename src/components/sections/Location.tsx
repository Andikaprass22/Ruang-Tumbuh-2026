import { eventConfig } from "../../lib/site";
import { Button } from "../ui/Button";
import { Container } from "../ui/Container";
import { Icon } from "../ui/Icon";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

const NOTES = [
  { icon: "pin", text: "Ruang acara berada di lantai dasar, dekat pintu masuk utama." },
  { icon: "users", text: "Parkir kendaraan tersedia di area gedung." },
  { icon: "info", text: "Butuh petunjuk arah? Hubungi kami lewat WhatsApp." },
] as const;

export function Location() {
  return (
    <section
      id="lokasi"
      aria-labelledby="lokasi-heading"
      className="scroll-mt-24 border-t border-line"
    >
      <Container className="py-20 sm:py-24 lg:py-28">
        <Reveal className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeading
            id="lokasi-heading"
            eyebrow="Lokasi"
            title="Tempat acara"
            description={`${eventConfig.venue}, ${eventConfig.city}`}
          />

          <address className="mt-6 not-italic text-[0.95rem] leading-relaxed text-ink-500">
            {eventConfig.address}
          </address>

          <ul className="mt-6 space-y-3 text-sm text-ink-700">
            {NOTES.map((note) => (
              <li key={note.text} className="flex items-start gap-2.5">
                <Icon
                  name={note.icon}
                  className="mt-0.5 h-4 w-4 shrink-0 text-brand-600"
                />
                <span>{note.text}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <Button
              href={eventConfig.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="map" className="h-4 w-4" />
              Buka di Google Maps
            </Button>
          </div>
        </div>

        {/* Decorative venue panel — deliberately not a third-party map embed, so
            the build stays dependency-free and the real link above does the job. */}
        <div className="relative overflow-hidden rounded-panel border border-line bg-paper-deep">
          <svg
            viewBox="0 0 400 400"
            className="h-full w-full"
            aria-hidden="true"
            preserveAspectRatio="xMidYMid slice"
          >
            <rect width="400" height="400" fill="#efe9dc" />
            <path d="M0 120h400M0 240h400M120 0v400M260 0v400" stroke="#e2dbcb" strokeWidth="2" />
            <path d="M0 300l120-60 100 40 180-70v190H0z" fill="#dcebe0" />
            <path d="M40 400c40-90 120-120 200-80" stroke="#8db99c" strokeWidth="8" fill="none" strokeLinecap="round" />
            <circle cx="240" cy="180" r="14" fill="#b4552f" />
            <circle cx="240" cy="180" r="26" stroke="#eec7b4" strokeWidth="3" fill="none" />
          </svg>
          <div className="absolute inset-x-4 bottom-4 rounded-panel border border-line bg-white/95 p-4 backdrop-blur">
            <p className="flex items-center gap-2 font-display text-base font-semibold text-ink-900">
              <Icon name="pin" className="h-4 w-4 text-accent-600" />
              {eventConfig.venue}
            </p>
            <p className="mt-1 text-xs text-ink-500">
              {eventConfig.city} · {eventConfig.timeLabel}
            </p>
          </div>
        </div>
        </Reveal>
      </Container>
    </section>
  );
}
