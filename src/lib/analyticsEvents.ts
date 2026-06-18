"use client";

import { track } from "@vercel/analytics";
import { sendGAEvent } from "@next/third-parties/google";

export type AnalyticsEvent =
  | "consulta_submitted"
  | "newsletter_subscribed"
  | "guide_downloaded"
  | "tool_completed"
  // Prepared for when WhatsApp / chat are activated — not wired into the UI yet.
  | "whatsapp_clicked"
  | "chat_opened";

type EventProps = Record<string, string | number | boolean>;

export function trackEvent(name: AnalyticsEvent, props?: EventProps) {
  try {
    track(name, props);
  } catch {
    // analytics must never break the user-facing flow
  }
  try {
    sendGAEvent("event", name, props ?? {});
  } catch {
    // GA may not be loaded (no NEXT_PUBLIC_GA_MEASUREMENT_ID) — that's fine
  }
}
