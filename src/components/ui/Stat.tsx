import { cn } from "../../lib/utils";

interface StatProps {
  value: string;
  label: string;
  className?: string;
}

export function Stat({ value, label, className }: StatProps) {
  return (
    <div
      className={cn(
        "rounded-panel border border-line bg-white px-3 py-4 text-center shadow-card sm:px-4",
        className,
      )}
    >
      <div className="font-display text-2xl font-semibold tabular-nums text-brand-800 sm:text-3xl">
        {value}
      </div>
      <div className="mt-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-ink-500">
        {label}
      </div>
    </div>
  );
}
