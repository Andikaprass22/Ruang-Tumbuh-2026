export type CountdownState = "upcoming" | "live" | "ended";

export interface Countdown {
  state: CountdownState;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const ZERO = { days: 0, hours: 0, minutes: 0, seconds: 0 } as const;

const DAY_MS = 24 * 60 * 60 * 1000;
const HOUR_MS = 60 * 60 * 1000;
const MINUTE_MS = 60 * 1000;
const SECOND_MS = 1000;

/**
 * Pure countdown math. Returns "ended" with zeroed parts for any unparseable
 * date, so a bad `startISO` in the config can never produce `NaN` or throw.
 * Once `now` reaches `start`, the state leaves "upcoming" and every part is
 * zero, which is what lets the UI stop ticking.
 */
export function getCountdown(
  startISO: string,
  endISO: string,
  now: Date,
): Countdown {
  const start = new Date(startISO).getTime();
  const end = new Date(endISO).getTime();

  if (Number.isNaN(start) || Number.isNaN(end)) {
    return { state: "ended", ...ZERO };
  }

  const current = now.getTime();

  if (current >= end) {
    return { state: "ended", ...ZERO };
  }
  if (current >= start) {
    return { state: "live", ...ZERO };
  }

  const diff = start - current;
  return {
    state: "upcoming",
    days: Math.max(0, Math.floor(diff / DAY_MS)),
    hours: Math.max(0, Math.floor((diff % DAY_MS) / HOUR_MS)),
    minutes: Math.max(0, Math.floor((diff % HOUR_MS) / MINUTE_MS)),
    seconds: Math.max(0, Math.floor((diff % MINUTE_MS) / SECOND_MS)),
  };
}
