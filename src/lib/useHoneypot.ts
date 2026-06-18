"use client";

import { useRef, useState } from "react";

/** Tracks a hidden honeypot value plus the form's mount time, to pair with isBotSubmission() server-side. */
export function useHoneypot() {
  const mountedAt = useRef(Date.now());
  const [website, setWebsite] = useState("");
  return { website, setWebsite, ts: mountedAt.current };
}
