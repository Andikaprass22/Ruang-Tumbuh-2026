import { speakers } from "../../lib/data";
import { Badge } from "../ui/Badge";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

export function Speakers() {
  return (
    <section
      id="pembicara"
      aria-labelledby="pembicara-heading"
      className="scroll-mt-24 border-t border-line bg-paper-deep"
    >
      <Container className="py-20 sm:py-24 lg:py-28">
        <SectionHeading
          id="pembicara-heading"
          eyebrow="Pembicara & fasilitator"
          title="Orang yang berbagi di Ruang Tumbuh"
          description="Enam suara dari bidang yang berbeda — menulis, desain, musik, riset, dan fotografi."
        />

        <Reveal className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {speakers.map((speaker) => (
            <article
              key={speaker.id}
              data-card
              className="flex flex-col overflow-hidden rounded-b-panel rounded-t-[7rem] border border-line bg-white shadow-card transition-[border-color,box-shadow,transform]"
            >
              <img
                src={speaker.photo}
                alt={speaker.name}
                loading="lazy"
                width={400}
                height={500}
                className="aspect-[4/5] w-full object-cover"
              />
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-display text-lg font-semibold text-ink-900">
                  {speaker.name}
                </h3>
                <p className="text-sm text-ink-500">{speaker.role}</p>
                <p className="mt-3 text-sm font-medium text-brand-800">
                  {speaker.topic}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">
                  {speaker.bio}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {speaker.tags.map((tag) => (
                    <Badge key={tag} tone="neutral">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </Reveal>

        <p className="mt-6 text-xs leading-relaxed text-ink-500">
          Catatan: nama, peran, dan topik di atas adalah konten demo untuk
          template. Ganti dengan pembicara asli di{" "}
          <code className="rounded bg-paper px-1.5 py-0.5 text-ink-700">
            src/lib/data.ts
          </code>
          .
        </p>
      </Container>
    </section>
  );
}
