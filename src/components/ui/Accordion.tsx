import { useState } from "react";
import type { Faq } from "../../lib/types";
import { cn } from "../../lib/utils";

interface AccordionProps {
  items: Faq[];
}

export function Accordion({ items }: AccordionProps) {
  const [openIds, setOpenIds] = useState<string[]>([]);

  const toggle = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((value) => value !== id) : [...prev, id],
    );
  };

  return (
    <div className="border-t border-line">
      {items.map((item) => {
        const open = openIds.includes(item.id);
        return (
          <div key={item.id} className="border-b border-line">
            <h3>
              <button
                type="button"
                id={`faq-trigger-${item.id}`}
                aria-expanded={open}
                aria-controls={`faq-panel-${item.id}`}
                onClick={() => toggle(item.id)}
                className="flex w-full items-start justify-between gap-6 py-5 text-left"
              >
                <span
                  className={cn(
                    "font-display text-base font-semibold leading-snug transition-colors sm:text-lg",
                    open ? "text-brand-800" : "text-ink-900",
                  )}
                >
                  {item.question}
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "mt-0.5 shrink-0 text-ink-500 transition-transform duration-200",
                    open && "rotate-45",
                  )}
                >
                  <svg
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.8}
                    strokeLinecap="round"
                    className="h-5 w-5"
                  >
                    <path d="M10 4v12M4 10h12" />
                  </svg>
                </span>
              </button>
            </h3>
            {/* Collapses by grid row rather than animating height. The padding
                lives one level in, so the measured row can reach zero.
                `visibility` keeps the answer out of the tab order while closed. */}
            <div
              id={`faq-panel-${item.id}`}
              role="region"
              aria-labelledby={`faq-trigger-${item.id}`}
              data-collapse
              data-open={open}
            >
              <div>
                <p className="max-w-2xl pb-6 text-sm leading-relaxed text-ink-500">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
