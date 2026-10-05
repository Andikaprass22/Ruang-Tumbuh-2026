import { eventConfig } from "../../lib/site";
import { useCountdown } from "../../lib/useCountdown";
import { Container } from "../ui/Container";
import { Icon } from "../ui/Icon";
import { Stat } from "../ui/Stat";

function pad(value: number): string {
  return value.toString().padStart(2, "0");
}

export function Countdown() {
  const countdown = useCountdown(eventConfig.startISO, eventConfig.endISO);
  const organizerUrl = eventConfig.socials[0]?.url ?? "#daftar";

  return (
    <section
      aria-label="Hitung mundur acara"
      className="border-y border-line bg-paper-deep"
    >
      <Container className="flex flex-col items-center gap-6 py-12 sm:py-14">
        {countdown.state === "upcoming" ? (
          <>
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-brand-700">
              Menuju hari-H
            </p>
            <div
              aria-live="off"
              className="grid w-full max-w-md grid-cols-4 gap-3 sm:gap-4"
            >
              <Stat value={countdown.days.toString()} label="Hari" />
              <Stat value={pad(countdown.hours)} label="Jam" />
              <Stat value={pad(countdown.minutes)} label="Menit" />
              <Stat value={pad(countdown.seconds)} label="Detik" />
            </div>
          </>
        ) : countdown.state === "live" ? (
          <p
            role="status"
            className="flex items-center gap-3 text-center font-display text-lg font-semibold text-brand-800 sm:text-xl"
          >
            <Icon name="spark" className="h-5 w-5 shrink-0 text-accent-500" />
            Acara sedang berlangsung. Selamat bertumbuh!
          </p>
        ) : (
          <div
            role="status"
            className="flex flex-col items-center gap-3 text-center"
          >
            <p className="font-display text-lg font-semibold text-brand-800 sm:text-xl">
              Acara telah selesai — terima kasih telah hadir.
            </p>
            <a
              href={organizerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-brand-700 underline underline-offset-4 transition-colors hover:text-brand-900"
            >
              Ikuti kabar acara berikutnya
              <Icon name="arrow" className="h-4 w-4" />
            </a>
          </div>
        )}
      </Container>
    </section>
  );
}
