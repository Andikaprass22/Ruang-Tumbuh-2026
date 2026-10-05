import { revealDelay } from "../../lib/motion";
import { useInView } from "../../lib/useInView";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  id?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  id,
}: SectionHeadingProps) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const reveal = inView ? "in" : "out";

  return (
    <div ref={ref} className="max-w-3xl">
      {eyebrow ? (
        <p
          data-reveal={reveal}
          style={revealDelay(0)}
          className="flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-brand-700"
        >
          <span aria-hidden="true" className="flex items-center gap-2">
            <span className="h-px w-7 bg-brand-400" />
            <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
          </span>
          {eyebrow}
        </p>
      ) : null}
      <h2
        data-reveal={reveal}
        style={revealDelay(70)}
        id={id}
        className="mt-4 text-balance font-display text-3xl font-semibold leading-[1.12] tracking-[-0.015em] text-ink-900 sm:text-[2.5rem]"
      >
        {title}
      </h2>
      {description ? (
        <p
          data-reveal={reveal}
          style={revealDelay(130)}
          className="mt-5 max-w-2xl text-pretty text-[1rem] leading-relaxed text-ink-500"
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
