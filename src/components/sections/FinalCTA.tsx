import { eventConfig } from "../../lib/site";
import { Button } from "../ui/Button";
import { Container } from "../ui/Container";

export function FinalCTA() {
  return (
    <section
      aria-labelledby="cta-heading"
      className="border-t border-line bg-brand-800 text-paper"
    >
      <Container className="flex flex-col items-center gap-6 py-20 text-center sm:py-24">
        <h2
          id="cta-heading"
          className="max-w-2xl text-balance font-display text-3xl font-semibold leading-tight tracking-[-0.01em] sm:text-4xl"
        >
          Siap menata langkah di {eventConfig.name}?
        </h2>
        <p className="max-w-xl text-pretty text-paper/80">
          {eventConfig.dateLabel} · {eventConfig.timeLabel} · {eventConfig.venue},{" "}
          {eventConfig.city}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button href="#daftar" size="lg">
            Daftar Sekarang
          </Button>
          <Button href="#tiket" size="lg" variant="secondary">
            Lihat Tiket
          </Button>
        </div>
      </Container>
    </section>
  );
}
