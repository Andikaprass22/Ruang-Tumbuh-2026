import { useEffect, useState } from "react";
import { getCountdown, type Countdown } from "./countdown";

/**
 * Ticking wrapper around `getCountdown`. It only runs while the event is
 * upcoming and clears its interval the moment the state changes to "live" or
 * "ended", so the countdown stops after the event starts.
 */
export function useCountdown(startISO: string, endISO: string): Countdown {
  const [countdown, setCountdown] = useState<Countdown>(() =>
    getCountdown(startISO, endISO, new Date()),
  );

  useEffect(() => {
    if (getCountdown(startISO, endISO, new Date()).state !== "upcoming") {
      return;
    }

    const interval = window.setInterval(() => {
      const next = getCountdown(startISO, endISO, new Date());
      setCountdown(next);
      if (next.state !== "upcoming") {
        window.clearInterval(interval);
      }
    }, 1000);

    return () => window.clearInterval(interval);
  }, [startISO, endISO]);

  return countdown;
}
