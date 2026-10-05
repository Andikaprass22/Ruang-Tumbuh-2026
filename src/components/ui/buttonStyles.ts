import { cn } from "../../lib/utils";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "whatsapp";
export type ButtonSize = "md" | "lg";

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-[background-color,color,border-color,transform] duration-200 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60";

const VARIANTS: Record<ButtonVariant, string> = {
  primary: "bg-brand-700 text-paper hover:bg-brand-800",
  secondary:
    "border border-line bg-white/80 text-ink-900 hover:border-brand-300 hover:bg-white hover:text-brand-800",
  ghost: "text-brand-800 hover:bg-brand-50",
  whatsapp: "bg-brand-600 text-white hover:bg-brand-700",
};

// Every size clears the 44px touch-target floor (py-3 + text-sm ≈ 44px).
const SIZES: Record<ButtonSize, string> = {
  md: "px-5 py-3 text-sm",
  lg: "px-7 py-3.5 text-base",
};

export function buttonClasses(
  variant: ButtonVariant,
  size: ButtonSize,
  className?: string,
): string {
  return cn(BASE, VARIANTS[variant], SIZES[size], className);
}
