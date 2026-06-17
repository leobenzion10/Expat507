# Security Headers & Configuration Reference (Next.js / Vercel)

HTTP security headers are cheap, high-leverage hardening. Vercel/Next.js set a few
defaults, but a real Content-Security-Policy and a complete header set almost always need
to be added explicitly. Verify what's currently sent, then close the gaps.

## Check what's currently set

```bash
curl -sI https://expat507.vercel.app | grep -iE \
  'content-security-policy|strict-transport-security|x-frame-options|x-content-type-options|referrer-policy|permissions-policy'
```

Anything missing from the list below is a finding (usually Low/Medium, Medium if no CSP).

## The headers to set

| Header | Recommended value | Protects against |
|--------|-------------------|------------------|
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` | Protocol downgrade / SSL strip |
| `X-Content-Type-Options` | `nosniff` | MIME sniffing |
| `X-Frame-Options` | `SAMEORIGIN` (or use CSP `frame-ancestors`) | Clickjacking |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Referrer leakage |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` | Unwanted feature access |
| `Content-Security-Policy` | see below | XSS, injection, data exfiltration |

## Setting headers in Next.js

In `next.config.js`, return them from `headers()`:

```js
const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

module.exports = {
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};
```

## Content-Security-Policy

CSP is the highest-value header and the trickiest, because it must allow exactly what your
app legitimately loads and nothing else. Build it from what the site actually uses (fonts,
analytics, the LLM/API origin, image hosts), then tighten.

A reasonable starting policy (adjust the allowlists to real sources):

```
default-src 'self';
script-src 'self';
style-src 'self' 'unsafe-inline';
img-src 'self' data: https:;
font-src 'self';
connect-src 'self' https://api.your-llm-provider.com;
frame-ancestors 'self';
base-uri 'self';
form-action 'self';
object-src 'none';
```

Notes:
- Avoid `'unsafe-inline'` and `'unsafe-eval'` in `script-src`. Next.js supports a
  **nonce-based** CSP via middleware — prefer that over allowing inline scripts.
- `connect-src` must include the origin the AI assistant calls; keep it as narrow as possible.
- Roll out in **report-only** mode first (`Content-Security-Policy-Report-Only`) to find
  what breaks before enforcing.
- `frame-ancestors 'self'` supersedes `X-Frame-Options` for modern browsers; keep both.

## Cookies

Any cookie that matters must be:

```
Set-Cookie: name=value; HttpOnly; Secure; SameSite=Lax; Path=/
```

`HttpOnly` blocks JS access (XSS theft), `Secure` forces HTTPS, `SameSite` mitigates CSRF.
Use `Strict` for sensitive cookies where cross-site navigation isn't needed.

## Other configuration checks

- **No secrets in the client bundle.** Anything under `NEXT_PUBLIC_*` ships to the browser
  — confirm no API keys live there. Search the built output for known key prefixes.
- **Source maps.** Don't expose server source maps in production.
- **Error pages.** Production should show generic 404/500 pages, never stack traces.
- **Preview deployments.** Vercel preview URLs are public by default — if they hit real
  data or the real LLM key, protect them (Vercel password protection / auth).
- **HTTPS only.** Confirm HTTP redirects to HTTPS (Vercel does this by default; verify).
- **Domain consistency.** The site advertises `expat507.com` in OG tags but serves from
  `vercel.app`; make sure the canonical domain, cookies, and CSP all align on the intended
  production domain.
