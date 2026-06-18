"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

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
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(0);
  const { prefix, number, suffix, decimals } = parseValue(value);

  useEffect(() => {
    if (!inView || number === null) return;
    const target = number;
    const start = performance.now();
    let raf: number;

    function tick(now: number) {
      const elapsed = (now - start) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(target * eased);
      if (progress < 1) raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, number, duration]);

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
