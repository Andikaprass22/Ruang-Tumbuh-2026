import { useEffect, useRef, useState } from "react";

/**
 * Reports whether an element has entered the viewport, once.
 *
 * The CSS it drives only exists under `prefers-reduced-motion: no-preference`,
 * so this hook never has to produce a reduced variant. When the browser has no
 * IntersectionObserver the element starts visible rather than stuck hidden.
 */
export function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(
    () => typeof IntersectionObserver === "undefined",
  );

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}
