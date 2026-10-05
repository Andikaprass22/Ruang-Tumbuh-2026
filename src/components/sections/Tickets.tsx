import { tickets } from "../../lib/data";
import type { Ticket } from "../../lib/types";
import {
  buildWhatsAppLink,
  isWhatsAppConfigured,
  ticketMessage,
} from "../../lib/whatsapp";
import { cn, formatRupiah } from "../../lib/utils";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { Container } from "../ui/Container";
import { Icon } from "../ui/Icon";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

function priceLabel(ticket: Ticket): string {
  return ticket.price === 0 ? "Gratis" : formatRupiah(ticket.price);
}

export function Tickets() {
  const whatsappReady = isWhatsAppConfigured();

  return (
    <section
      id="tiket"
      aria-labelledby="tiket-heading"
      className="scroll-mt-24 border-t border-line bg-paper-deep"
    >
      <Container className="py-20 sm:py-24 lg:py-28">
        <SectionHeading
          id="tiket-heading"
          eyebrow="Tiket"
          title="Pilih tiket yang sesuai"
          description="Harga di bawah adalah contoh untuk template. Semua tiket dipesan lewat WhatsApp dan dikonfirmasi setelah pendaftaran."
        />

        <Reveal className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {tickets.map((ticket) => (
            <Card
              key={ticket.id}
              className={cn(
                "flex min-w-0 flex-col p-6",
                ticket.featured && "border-brand-300 ring-1 ring-brand-200",
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="min-w-0 break-words font-display text-lg font-semibold text-ink-900">
                  {ticket.name}
                </h3>
                {ticket.badge ? <Badge tone="accent">{ticket.badge}</Badge> : null}
              </div>

              <p className="mt-3 font-display text-2xl font-semibold text-brand-800">
                {priceLabel(ticket)}
              </p>
              {ticket.priceNote ? (
                <p className="mt-1 text-xs text-ink-500">{ticket.priceNote}</p>
              ) : null}

              <p className="mt-3 text-sm leading-relaxed text-ink-500">
                {ticket.description}
              </p>

              <ul className="mt-4 flex-1 space-y-2 text-sm text-ink-700">
                {ticket.facilities.map((facility) => (
                  <li key={facility} className="flex items-start gap-2">
                    <Icon
                      name="check"
                      className="mt-0.5 h-4 w-4 shrink-0 text-brand-600"
                    />
                    <span className="min-w-0 break-words">{facility}</span>
                  </li>
                ))}
              </ul>

              <Button
                href={
                  whatsappReady
                    ? buildWhatsAppLink(ticketMessage(ticket.name))
                    : "#daftar"
                }
                target={whatsappReady ? "_blank" : undefined}
                rel={whatsappReady ? "noopener noreferrer" : undefined}
                variant={ticket.featured ? "primary" : "secondary"}
                className="mt-6 w-full"
              >
                {whatsappReady ? "Pesan Tiket" : "Daftar"}
              </Button>
            </Card>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
