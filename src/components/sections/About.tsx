import { audience } from "../../lib/data";
import { eventConfig } from "../../lib/site";
import { Card } from "../ui/Card";
import { Container } from "../ui/Container";
import { Icon } from "../ui/Icon";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

export function About() {
  return (
    <section id="tentang" aria-labelledby="tentang-heading" className="scroll-mt-24">
      <Container className="py-20 sm:py-24 lg:py-28">
        <SectionHeading
          id="tentang-heading"
          eyebrow="Tentang acara"
          title="Satu hari untuk menata langkah"
          description="Ruang Tumbuh bukan panggung motivasi, melainkan ruang kerja bersama: dengar, coba, dan bawa pulang satu langkah yang bisa langsung dijalankan."
        />

        <Reveal className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-4 text-[1rem] leading-relaxed text-ink-500">
            <p>{eventConfig.description}</p>
            <p>
              Sepanjang hari Anda akan mendengar sesi seminar, mengikuti satu
              workshop praktik, dan berdiskusi dengan peserta lain yang sedang
              membangun hal serupa.
            </p>
            <p>
              Yang dibawa pulang: catatan arah yang lebih jelas, satu karya kecil
              yang sudah dimulai, dan kenalan baru dari komunitas yang berbeda.
            </p>
          </div>

          <div>
            <h3 className="font-display text-lg font-semibold text-ink-900">
              Siapa yang cocok mengikuti
            </h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {audience.map((profile) => (
                <Card key={profile.id} className="p-5">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-50 text-brand-700">
                    <Icon name={profile.icon} />
                  </span>
                  <h4 className="mt-3 font-display text-base font-semibold text-ink-900">
                    {profile.title}
                  </h4>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-500">
                    {profile.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
