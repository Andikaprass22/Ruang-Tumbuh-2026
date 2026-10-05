import { revealDelay } from "../../lib/motion";
import { eventConfig } from "../../lib/site";
import { useInView } from "../../lib/useInView";
import { Button } from "../ui/Button";
import { Container } from "../ui/Container";
import { Icon } from "../ui/Icon";

export function Hero() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const reveal = inView ? "in" : "out";

  return (
    <section
      id="beranda"
      aria-labelledby="hero-heading"
      className="relative isolate scroll-mt-24 overflow-hidden"
    >
      {/* Ambient wash. Two very low-chroma fields, never interactive. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-32 -top-40 h-[42rem] w-[42rem] rounded-full bg-[radial-gradient(closest-side,rgba(35,74,61,0.10),transparent_72%)]" />
        <div className="absolute -left-40 top-1/3 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(closest-side,rgba(180,85,47,0.08),transparent_72%)]" />
      </div>

      <Container className="grid min-h-[calc(100svh-4rem)] items-center gap-x-16 gap-y-14 py-14 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-x-20">
        <div ref={ref}>
          <p
            data-reveal={reveal}
            style={revealDelay(0)}
            className="flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-accent-600"
          >
            <span aria-hidden="true" className="flex items-center gap-2">
              <span className="h-px w-7 bg-accent-500/70" />
              <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
            </span>
            Seminar &amp; Workshop 2026
          </p>

          <h1
            data-reveal={reveal}
            style={revealDelay(70)}
            id="hero-heading"
            className="mt-5 text-balance font-display text-[2.75rem] font-semibold leading-[1.02] tracking-[-0.025em] text-ink-900 sm:text-6xl lg:text-[4.5rem]"
          >
            {eventConfig.name}
          </h1>

          <p
            data-reveal={reveal}
            style={revealDelay(140)}
            className="mt-6 max-w-xl text-pretty font-display text-xl font-medium leading-snug text-brand-800 sm:text-2xl"
          >
            {eventConfig.theme}
          </p>

          <p
            data-reveal={reveal}
            style={revealDelay(200)}
            className="mt-5 max-w-xl text-pretty text-[1rem] leading-relaxed text-ink-500"
          >
            {eventConfig.tagline}
          </p>

          {/* Hairline info bar: one ruled surface instead of scattered chips. */}
          <dl
            data-reveal={reveal}
            style={revealDelay(260)}
            className="mt-9 grid grid-cols-1 gap-px overflow-hidden rounded-panel border border-line bg-line sm:grid-cols-2"
          >
            <div className="bg-paper px-4 py-3.5">
              <dt className="flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-ink-500">
                <Icon name="calendar" className="h-3.5 w-3.5 text-accent-600" />
                Tanggal
              </dt>
              <dd className="mt-1.5 text-sm font-medium text-ink-900">
                {eventConfig.dateLabel}
              </dd>
            </div>
            <div className="bg-paper px-4 py-3.5">
              <dt className="flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-ink-500">
                <Icon name="clock" className="h-3.5 w-3.5 text-accent-600" />
                Waktu
              </dt>
              <dd className="mt-1.5 text-sm font-medium text-ink-900">
                {eventConfig.timeLabel}
              </dd>
            </div>
            <div className="bg-paper px-4 py-3.5 sm:col-span-2">
              <dt className="flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-ink-500">
                <Icon name="pin" className="h-3.5 w-3.5 text-accent-600" />
                Lokasi
              </dt>
              <dd className="mt-1.5 text-sm font-medium text-ink-900">
                <a
                  href="#lokasi"
                  className="transition-colors hover:text-brand-800"
                >
                  {eventConfig.venue}, {eventConfig.city}
                </a>
              </dd>
            </div>
          </dl>

          <div
            data-reveal={reveal}
            style={revealDelay(320)}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Button href="#daftar" size="lg">
              Daftar Sekarang
            </Button>
            <Button href="#tiket" variant="secondary" size="lg">
              Lihat Tiket
            </Button>
          </div>
        </div>

        {/* Arch-framed illustration: the event's growth theme drawn as a
            gateway, not a bordered placeholder rectangle. */}
        <div
          data-reveal={reveal}
          style={revealDelay(180)}
          className="relative mx-auto w-full max-w-sm lg:max-w-none"
        >
          <div
            aria-hidden="true"
            className="drift-soft pointer-events-none absolute -inset-10 -z-10 rounded-full bg-[radial-gradient(closest-side,rgba(180,85,47,0.18),transparent_74%)] blur-2xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 translate-x-3 translate-y-3 rounded-b-panel rounded-t-[12rem] border border-brand-200/70"
          />
          <figure className="relative overflow-hidden rounded-b-panel rounded-t-[12rem] border border-line bg-paper-deep shadow-panel">
            <img
              src="/img/hero.svg"
              alt="Matahari di atas perbukitan berlapis dengan tunas yang tumbuh"
              width={760}
              height={950}
              className="aspect-[4/5] h-full w-full object-cover"
            />
          </figure>
        </div>
      </Container>
    </section>
  );
}
