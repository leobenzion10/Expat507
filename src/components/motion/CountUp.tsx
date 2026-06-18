"use client";

import { useEffect, useRef, useState } from "react";

/** Parses a stat string like "500+", "$1.2M", "98%" into a numeric target and surrounding text. */
function parseValue(raw: string) {
  const match = raw.match(/(-?\d+(?:[.,]\d+)?)/);
  if (!match) return { prefix: raw, number: null as number | null, suffix: "", decimals: 0 };
  const numStr = match[1].replace(",", ".");
  const number = parseFloat(numStr);
  const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
  const prefix = raw.slice(0, match.index);
  const suffix = raw.slice((match.index || 0) + match[1].length);
  return { prefix, number, suffix, decimals };
}

export default function CountUp({ value, duration = 1.4 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const { prefix, number, suffix, decimals } = parseValue(value);
  // Default to the real final value. If the animation below never runs for
  // any reason (no JS, reduced motion, an observer that never fires on some
  // mobile browser), the correct number is already on screen — it never
  // depends on the animation to appear.
  const [display, setDisplay] = useState<number>(number ?? 0);
  const hasAnimated = useRef(false);
  const rafRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (number === null) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    function animate() {
      if (hasAnimated.current) return;
      hasAnimated.current = true;
      const target = number as number;
      const start = performance.now();
      setDisplay(0);

      function tick(now: number) {
        const elapsed = (now - start) / 1000;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplay(target * eased);
        if (progress < 1) rafRef.current = requestAnimationFrame(tick);
      }

      rafRef.current = requestAnimationFrame(tick);
    }

    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      animate();
      return;
    }

    // Already in (or close to) the viewport on first paint — e.g. above-the-fold
    // hero stats — animate right away instead of waiting on an observer
    // callback that may never cross a margin-shrunk threshold on some mobile
    // browsers (the bug this replaces: counters stuck at 0 on mobile).
    const rect = el.getBoundingClientRect();
    const alreadyVisible = rect.top < window.innerHeight * 1.1 && rect.bottom > -100;
    if (alreadyVisible) {
      animate();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          animate();
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [number, duration]);

  if (number === null) {
    return <span ref={ref}>{value}</span>;
  }

  return (
    <span ref={ref}>
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}
