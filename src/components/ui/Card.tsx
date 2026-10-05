import type { ReactNode } from "react";
import { cn } from "../../lib/utils";

interface CardProps {
  className?: string;
  children: ReactNode;
}

export function Card({ className, children }: CardProps) {
  return (
    <div
      data-card
      className={cn(
        "rounded-panel border border-line bg-white shadow-card transition-[border-color,box-shadow,transform]",
        className,
      )}
    >
      {children}
    </div>
  );
}
