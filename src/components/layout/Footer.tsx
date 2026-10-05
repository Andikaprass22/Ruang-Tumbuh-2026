import { eventConfig } from "../../lib/site";
import { buildWhatsAppLink, isWhatsAppConfigured } from "../../lib/whatsapp";
import { Container } from "../ui/Container";
import { Icon } from "../ui/Icon";

export function Footer() {
  const whatsappReady = isWhatsAppConfigured();

  return (
    <footer className="safe-bottom border-t border-line bg-ink-900 text-paper">
      <Container className="grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5">
            <img src="/img/logo.svg" alt="" className="h-8 w-8 shrink-0" />
            <span className="font-display text-lg font-semibold">
              {eventConfig.name}
            </span>
          </div>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-paper/70">
            {eventConfig.organizerNote}
          </p>
          <p className="mt-4 max-w-md text-xs leading-relaxed text-paper/50">
            Semua nama, jadwal, harga, dan pembicara di halaman ini adalah konten
            demo. Ganti dengan data asli sebelum dipublikasikan.
          </p>
        </div>

        <div>
          <h2 className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-paper/60">
            Kontak
          </h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a
                href={
                  whatsappReady
                    ? buildWhatsAppLink(eventConfig.whatsappDefaultMessage)
                    : `mailto:${eventConfig.email}`
                }
                target={whatsappReady ? "_blank" : undefined}
                rel={whatsappReady ? "noopener noreferrer" : undefined}
                className="inline-flex items-center gap-2 text-paper/80 transition-colors hover:text-paper"
              >
                <Icon name="whatsapp" className="h-4 w-4" />
                {whatsappReady ? "WhatsApp" : eventConfig.email}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${eventConfig.email}`}
                className="inline-flex items-center gap-2 text-paper/80 transition-colors hover:text-paper"
              >
                <Icon name="mail" className="h-4 w-4" />
                {eventConfig.email}
              </a>
            </li>
            <li>
              <a
                href={eventConfig.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-start gap-2 text-paper/80 transition-colors hover:text-paper"
              >
                <Icon name="pin" className="mt-0.5 h-4 w-4 shrink-0" />
                <span>
                  {eventConfig.venue}, {eventConfig.address}
                </span>
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-paper/60">
            Ikuti
          </h2>
          <ul className="mt-4 space-y-3 text-sm">
            {eventConfig.socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-paper/80 transition-colors hover:text-paper"
                >
                  <Icon name={social.icon} className="h-4 w-4" />
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-2 py-6 text-xs text-paper/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date(eventConfig.startISO).getFullYear()} {eventConfig.organizer}.
            Semua hak dilindungi.
          </p>
          <p>Template landing page acara — data demo, mudah diganti.</p>
        </Container>
      </div>
    </footer>
  );
}
