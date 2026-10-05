import { describe, it, expect } from "vitest";
import { prefersReducedMotion, revealDelay } from "./motion";

describe("revealDelay", () => {
  it("returns the staggered CSS variable for the reveal transition", () => {
    expect(revealDelay(60)).toEqual({ "--reveal-delay": "60ms" });
  });
});

describe("prefersReducedMotion", () => {
  it("returns a boolean", () => {
    expect(typeof prefersReducedMotion()).toBe("boolean");
  });
});
