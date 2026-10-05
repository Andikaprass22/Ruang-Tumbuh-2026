import { agenda, getAgendaSpeaker } from "../../lib/data";
import type { AgendaItem, AgendaTrack } from "../../lib/types";
import { Badge, type BadgeTone } from "../ui/Badge";
import { Container } from "../ui/Container";
import { Icon } from "../ui/Icon";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

const TRACK_TONE: Record<AgendaTrack, BadgeTone> = {
  Pembukaan: "neutral",
  Seminar: "brand",
  Workshop: "accent",
  Istirahat: "neutral",
  Penutup: "brand",
};

/** Items that share a start time run at the same moment, in different rooms. */
function groupByTime(items: AgendaItem[]): AgendaItem[][] {
  const groups: AgendaItem[][] = [];
  for (const item of items) {
    const last = groups[groups.length - 1];
    if (last && last[0].time === item.time) {
      last.push(item);
    } else {
      groups.push([item]);
    }
  }
  return groups;
}

function SessionBody({ item }: { item: AgendaItem }) {
  const speaker = getAgendaSpeaker(item);

  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="font-display text-base font-semibold text-ink-900">
          {item.title}
        </h3>
        <Badge tone={TRACK_TONE[item.track]}>{item.track}</Badge>
      </div>
      <p className="mt-1.5 text-sm leading-relaxed text-ink-500">
        {item.description}
      </p>
      <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-500">
        {speaker ? (
          <a
            href="#pembicara"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-brand-800"
          >
            <Icon name="mic" className="h-3.5 w-3.5" />
            {speaker.name}
          </a>
        ) : null}
        {item.location ? (
          <span className="inline-flex items-center gap-1.5">
            <Icon name="pin" className="h-3.5 w-3.5" />
            {item.location}
          </span>
        ) : null}
      </p>
    </>
  );
}

export function Agenda() {
  const groups = groupByTime(agenda);

  return (
    <section
      id="agenda"
      aria-labelledby="agenda-heading"
      className="scroll-mt-24 border-t border-line"
    >
      <Container className="py-20 sm:py-24 lg:py-28">
        <SectionHeading
          id="agenda-heading"
          eyebrow="Agenda"
          title="Alur acara, dari pagi sampai sore"
          description="Sesi seminar berjalan sepanjang hari, dengan dua workshop paralel di sesi siang. Pilih salah satu saat mendaftar."
        />

        <Reveal className="mt-12">
          <ol className="border-t border-line">
            {groups.map((group) => {
              const parallel = group.length > 1;
              return (
                <li
                  key={group[0].id}
                  className="grid gap-4 border-b border-line py-6 sm:grid-cols-[7.5rem_1fr] sm:gap-8"
                >
                  <div className="flex items-baseline gap-2 sm:flex-col sm:gap-0.5">
                    <span className="font-display text-lg font-semibold tabular-nums text-brand-800">
                      {group[0].time}
                    </span>
                    {group[0].endTime ? (
                      <span className="text-xs tabular-nums text-ink-500">
                        {`– ${group[0].endTime}`}
                      </span>
                    ) : null}
                  </div>

                  {parallel ? (
                    <div className="min-w-0">
                      <p className="mb-3 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-accent-600">
                        Dua sesi paralel — pilih satu
                      </p>
                      <div className="grid gap-4 md:grid-cols-2">
                        {group.map((item) => (
                          <div
                            key={item.id}
                            data-card
                            className="rounded-panel border border-line bg-white p-5 shadow-card transition-[border-color,box-shadow,transform]"
                          >
                            <SessionBody item={item} />
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="min-w-0">
                      <SessionBody item={group[0]} />
                    </div>
                  )}
                </li>
              );
            })}
          </ol>
        </Reveal>
      </Container>
    </section>
  );
}
