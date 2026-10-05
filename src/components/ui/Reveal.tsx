import type { ReactNode } from "react";
import { revealDelay } from "../../lib/motion";
import { useInView } from "../../lib/useInView";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

/**
 * One entrance per section body. The wrapper keeps whatever layout classes it
 * is given, so a grid stays a grid; it only adds the reveal state.
 */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      data-reveal={inView ? "in" : "out"}
      style={revealDelay(delay)}
      className={className}
    >
      {children}
    </div>
  );
}
