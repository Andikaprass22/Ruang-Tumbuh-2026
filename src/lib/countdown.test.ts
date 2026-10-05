import { describe, it, expect } from "vitest";
import { getCountdown } from "./countdown";

const START = "2026-11-14T09:00:00+07:00";
const END = "2026-11-14T16:00:00+07:00";

describe("getCountdown", () => {
  it("counts down while the event is upcoming", () => {
    const now = new Date("2026-11-14T08:59:59+07:00");
    const c = getCountdown(START, END, now);
    expect(c.state).toBe("upcoming");
    expect(c.seconds).toBe(1);
  });

  it("splits a multi-day gap into days/hours/minutes/seconds", () => {
    const now = new Date("2026-11-12T07:58:57+07:00");
    const c = getCountdown(START, END, now);
    expect([c.days, c.hours, c.minutes, c.seconds]).toEqual([2, 1, 1, 3]);
  });

  it("is 'live' at exactly the start and zeroes the parts", () => {
    const c = getCountdown(START, END, new Date(START));
    expect(c.state).toBe("live");
    expect([c.days, c.hours, c.minutes, c.seconds]).toEqual([0, 0, 0, 0]);
  });

  it("is 'ended' after the end (Review Focus #2)", () => {
    const c = getCountdown(START, END, new Date("2026-11-15T00:00:00+07:00"));
    expect(c.state).toBe("ended");
    expect([c.days, c.hours, c.minutes, c.seconds]).toEqual([0, 0, 0, 0]);
  });

  it("never returns negative parts (Review Focus #2)", () => {
    const c = getCountdown(START, END, new Date("2026-12-01T00:00:00+07:00"));
    expect(
      c.days >= 0 && c.hours >= 0 && c.minutes >= 0 && c.seconds >= 0,
    ).toBe(true);
  });

  it("degrades to 'ended' on an invalid date (Review Focus #3)", () => {
    const c = getCountdown("bukan-tanggal", END, new Date());
    expect(c.state).toBe("ended");
    expect(Number.isNaN(c.seconds)).toBe(false);
  });
});
