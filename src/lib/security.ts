import { NextRequest } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email: unknown): email is string {
  return typeof email === "string" && email.length <= 254 && EMAIL_RE.test(email);
}

export function escapeHtml(value: unknown): string {
  return String(value ?? "").replace(/[&<>"']/g, (c) => {
    switch (c) {
      case "&": return "&amp;";
      case "<": return "&lt;";
      case ">": return "&gt;";
      case '"': return "&quot;";
      default: return "&#39;";
    }
  });
}

export function clampString(value: unknown, maxLength: number): string {
  return typeof value === "string" ? value.slice(0, maxLength).trim() : "";
}

function getClientIp(req: NextRequest): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
}

const buckets = new Map<string, { count: number; resetAt: number }>();

/**
 * In-memory fixed-window rate limit, keyed per Vercel instance.
 * Resets on cold start — a deterrent against casual abuse, not a hard guarantee.
 */
export function rateLimit(req: NextRequest, routeKey: string, limit: number, windowMs: number): boolean {
  const key = `${routeKey}:${getClientIp(req)}`;
  const now = Date.now();
  const entry = buckets.get(key);

  if (!entry || now > entry.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (entry.count >= limit) return false;
  entry.count++;
  return true;
}
