# OWASP Top 10 Review Checklist (Next.js oriented)

A defensive review checklist based on the OWASP Top 10 (2021). For each item: what to look
for in the user's own code/config, and how to fix it. Prioritize the categories that map
to surfaces this site actually has.

## A01 — Broken Access Control
**Look for:** API routes or pages that perform sensitive actions without checking who is
allowed; relying on the client to hide a route; predictable IDs that let one user read
another's data (IDOR); admin/preview endpoints reachable without auth; missing checks on
server actions.
**Fix:** Enforce authorization on the server for every protected route — check identity
and permission, not just authentication. Deny by default. Don't expose admin tooling on a
public path. For Next.js, guard route handlers and server actions explicitly; middleware
alone is not a complete control.

## A02 — Cryptographic Failures
**Look for:** Secrets, API keys or tokens committed to the repo or shipped to the client
(anything in `NEXT_PUBLIC_*` is public); sensitive data sent over HTTP; weak/missing
hashing for any stored credentials; PII stored in plaintext.
**Fix:** Keep secrets server-side only (never `NEXT_PUBLIC_`). Use environment variables
via Vercel's encrypted env settings. Enforce HTTPS (HSTS). Hash passwords with bcrypt/
argon2 if you ever store them. Don't log PII or secrets.

## A03 — Injection (incl. XSS)
**Look for:** Raw string concatenation into database queries or shell commands;
`dangerouslySetInnerHTML` with unsanitized content; user input reflected into the page
without escaping; markdown/HTML from guides rendered without sanitization.
**Fix:** Use parameterized queries / an ORM, never string-built SQL. React escapes by
default — avoid `dangerouslySetInnerHTML`; if you must render HTML (e.g. rich guide
content), sanitize it with a library like DOMPurify and a strict allowlist. Validate and
encode all user input. A strong CSP (see headers reference) is a second line of defense
against XSS.

## A04 — Insecure Design
**Look for:** Missing rate limiting on forms and the AI endpoint; no anti-automation on
lead capture; trusting client-side validation as the only check; no abuse modeling for the
expensive LLM feature.
**Fix:** Design controls in, not on. Rate-limit and add bot protection to forms and the
assistant. Always re-validate on the server. Think through abuse cases (spam leads, cost
exhaustion) at design time. See the api-and-forms and ai-assistant references.

## A05 — Security Misconfiguration
**Look for:** Missing security headers; verbose error pages leaking stack traces; default/
debug settings in production; directory listing; source maps exposing server code;
unprotected preview deployments; `.env` files served or committed.
**Fix:** Set the security headers and CSP (headers reference). Return generic error pages
in production; log details server-side only. Disable source maps for server code in prod.
Protect Vercel preview deployments if they touch real data. Ensure `.env*` is gitignored.

## A06 — Vulnerable & Outdated Components
**Look for:** Old dependencies with known CVEs; unmaintained packages; a stale lockfile.
**Fix:** Run `npm audit --omit=dev` and address high/critical issues. Keep dependencies
current (`npm-check-updates`). Enable Dependabot/Renovate for automated updates. Remove
packages you don't use.

## A07 — Identification & Authentication Failures
**Look for:** Weak session handling; missing secure/httpOnly/SameSite cookie flags; no
brute-force protection; tokens that don't expire; auth logic rolled by hand.
**Fix:** Use a vetted auth library (e.g. NextAuth/Auth.js) rather than custom auth. Set
cookies `HttpOnly`, `Secure`, `SameSite=Lax/Strict`. Expire and rotate sessions.
Rate-limit login attempts. (Lower priority here if the site has no user accounts — but
confirm there's no hidden admin login.)

## A08 — Software & Data Integrity Failures
**Look for:** Loading scripts from untrusted CDNs without integrity checks; insecure
deserialization; CI/CD that pulls unpinned dependencies; trusting unsigned webhooks.
**Fix:** Pin dependencies (committed lockfile). Use Subresource Integrity for third-party
scripts, or self-host them. Verify webhook signatures (e.g. from form/email providers).

## A09 — Security Logging & Monitoring Failures
**Look for:** No logging of auth failures, form abuse, or assistant errors; no alerting; no
way to detect an ongoing attack.
**Fix:** Log security-relevant events (failed validations, rate-limit hits, errors) without
logging PII/secrets. Use Vercel's observability or an external service. Set alerts for
spikes (e.g. sudden assistant usage = possible cost attack).

## A10 — Server-Side Request Forgery (SSRF)
**Look for:** Any feature that fetches a user-supplied URL server-side (image proxies,
link previews, "fetch from URL" inputs) without restriction.
**Fix:** Validate and allowlist outbound destinations; block internal/metadata addresses
(169.254.169.254, localhost, private ranges). Don't let user input dictate arbitrary
server-side requests.

## Bonus: Privacy / data protection (high relevance here)
The site collects personal and financial-situation data from international users.
**Check:** consent before collection; a privacy policy that matches actual practice; data
minimization (only collect what's needed); secure storage and transmission; a way to honor
deletion requests; where third parties (email/CRM/LLM provider) receive the data.
