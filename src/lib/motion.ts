import type { CSSProperties } from "react";

/**
 * Motion helpers.
 *
 * The CSS `prefers-reduced-motion` block cannot override an explicit
 * `scrollIntoView({ behavior: "smooth" })` call, so the preference is read
 * here in JavaScript as well.
 */
export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/** Stagger offset for a staged entrance, read by the [data-reveal] CSS. */
export function revealDelay(milliseconds: number): CSSProperties {
  return { "--reveal-delay": `${milliseconds}ms` } as CSSProperties;
}
