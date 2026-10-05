import { faqs } from "../../lib/data";
import { Accordion } from "../ui/Accordion";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

export function FAQ() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="scroll-mt-24 border-t border-line bg-paper-deep"
    >
      <Container className="py-20 sm:py-24 lg:py-28">
        <SectionHeading
          id="faq-heading"
          eyebrow="FAQ"
          title="Pertanyaan yang sering muncul"
          description="Belum terjawab? Kirim pertanyaan lewat WhatsApp di bagian pendaftaran, kami akan membantu."
        />
        <Reveal className="mt-12">
          <Accordion items={faqs} />
        </Reveal>
      </Container>
    </section>
  );
}
