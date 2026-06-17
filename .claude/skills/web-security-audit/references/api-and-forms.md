# API Routes & Forms Security Reference

The forms (`/consulta`, `/contacto`, `/newsletter`) and the API routes behind them are the
main place untrusted input enters Expat507, and where personal data leaves it. This is
where to focus.

## Server-side input validation (non-negotiable)

Client-side validation is for UX only — an attacker bypasses it trivially by calling the
API directly. **Validate every field again on the server.**

Use a schema validator (e.g. Zod) in each API route / server action:

```ts
import { z } from "zod";

const ConsultaSchema = z.object({
  nombre: z.string().trim().min(1).max(100),
  email: z.string().email().max(254),
  mensaje: z.string().max(2000).optional(),
  // ...only the fields you expect; reject unknown fields
}).strict();

export async function POST(req: Request) {
  const parsed = ConsultaSchema.safeParse(await req.json());
  if (!parsed.success) {
    return Response.json({ error: "Invalid input" }, { status: 400 });
  }
  // proceed with parsed.data only
}
```

Principles: allowlist expected fields (`.strict()`), bound every string length, reject
rather than coerce, and never reflect raw input back into a response or page.

## Rate limiting & anti-automation

Without limits, forms get spammed and the AI endpoint can be drained. Add:

- **Rate limiting per IP** on every POST endpoint (e.g. Upstash Ratelimit on Vercel, or
  Vercel's built-in firewall rules). Cap both burst and sustained rates.
- **Bot protection** on lead/newsletter forms: a CAPTCHA (hCaptcha/Turnstile) or at least
  a honeypot field + timing check. This protects your lead quality and your costs.
- **Idempotency / double-submit guard** so a double click doesn't create duplicate leads.

## CSRF

For cookie-authenticated state-changing requests, protect against cross-site request
forgery: use `SameSite` cookies (see headers reference) plus a CSRF token or an
origin/referer check on the server. Pure public form posts that don't rely on a session
cookie are lower risk, but still verify the request `Origin` matches your domain.

## Personal data handling (PII)

The consultation form collects sensitive personal and financial-situation data. Audit the
full data path:

- **In transit:** HTTPS only (enforced). Never send form data to a third party over HTTP.
- **At rest:** if stored (DB, spreadsheet, CRM), confirm access is restricted and the store
  isn't public. Don't store more than needed.
- **In logs:** do not log full form contents, emails, or messages. Redact PII.
- **Third parties:** identify every place the data flows — email service, CRM, the LLM
  provider — and confirm each is intended and covered by the privacy policy.
- **Consent & policy:** the form should obtain consent; the linked privacy/terms pages
  must accurately describe what's collected and where it goes.
- **Deletion:** have a way to honor a "delete my data" request.

## API route hardening checklist

- Reject wrong HTTP methods (only allow what the route needs).
- Authenticate/authorize any route that isn't meant to be public.
- Set a sensible request body size limit to prevent memory abuse.
- Return generic errors; never leak stack traces, query details, or internal paths.
- Don't trust headers like `X-Forwarded-For` for security decisions without validating the
  proxy chain (on Vercel, use the platform-provided client IP).
- Set CORS deliberately — don't use a wildcard `Access-Control-Allow-Origin` on endpoints
  that return or accept sensitive data.
- Ensure no debug/test endpoint shipped to production.

## Quick test ideas (against your own staging environment)

- Submit each form with: empty body, missing required fields, oversized fields, unexpected
  extra fields, and script-like strings (`<script>`, `'; DROP TABLE`) — confirm the server
  rejects/escapes and nothing is reflected or executed.
- Call the API route directly (bypassing the form) to confirm server-side validation holds.
- Submit rapidly to confirm rate limiting and bot protection trigger.
- Confirm a malformed request returns a clean 400, not a 500 with a stack trace.
