---
name: web-security-audit
description: >-
  Defensive security audit and authorized penetration testing for a web application you
  own or are explicitly authorized to test (Next.js / Vercel stack). Use this skill
  whenever the user wants to find and fix security weaknesses in their own site: review
  code or configuration for OWASP Top 10 issues (injection, XSS, broken auth/access
  control, SSRF, misconfiguration), audit API routes, harden HTTP security headers and
  CSP, check dependencies for known vulnerabilities, review how forms and personal data
  are handled, or assess the security of an LLM-backed feature (prompt injection, cost
  abuse, data leakage). Trigger this even when the user just says "is my site secure",
  "check for vulnerabilities", "harden this", "review my API", or "pentest my site" —
  they want a structured, remediation-focused audit of their own property.
---

# Web Security Audit

This skill performs a **defensive** security audit of a web application the user owns or
is authorized to test. The objective is always the same: find weaknesses and fix them.
Every finding ends with a concrete remediation, not just a problem statement.

This is not a toolkit for attacking systems. It does not produce weaponized exploits or
help access systems the user doesn't control.

## Authorization gate — check this first, every time

Before doing any active testing (sending requests to a live site, fuzzing inputs, probing
endpoints), confirm:

- The target belongs to the user, or they have **explicit written authorization** to test it.
- Testing is scoped to that property only — not third-party services it integrates with
  (payment processors, email providers, the LLM vendor's API, etc.).

If ownership/authorization is unclear, ask before any active testing. **Static review of
the user's own code and configuration is always fine** and is the safest place to start —
prefer it over active probing whenever the source is available. Active testing should be
done against a staging/preview environment when possible, never in a way that degrades a
production service for real users (no high-volume fuzzing, no destructive payloads).

## Workflow

1. **Scope & authorize** — confirm the target and what's in/out of scope (gate above).
2. **Map the attack surface** — enumerate entry points: pages, forms, API routes, the AI
   assistant, third-party integrations, auth boundaries, and where personal data flows.
3. **Review by category** — work through the OWASP-based checklist, prioritizing the
   surfaces that actually exist on this site.
4. **For each finding**: record severity, evidence, impact, and a specific fix.
5. **Report** using the template below, ordered by severity.
6. **Verify fixes** — re-check after remediation.

Prefer reviewing source/config over probing a live site. Read the relevant reference file
for the area under audit:

- `references/owasp-checklist.md` — the OWASP Top 10 review checklist with what to look
  for and how to remediate, oriented to a Next.js app.
- `references/headers-and-config.md` — security headers, Content-Security-Policy, cookie
  flags, and Next.js/Vercel hardening, with copy-ready config.
- `references/api-and-forms.md` — API route security, input validation, rate limiting,
  anti-spam, CSRF, and personal-data handling for the consultation/newsletter/contact forms.
- `references/ai-assistant-security.md` — securing the LLM-backed `/asistente`: prompt
  injection, system-prompt leakage, cost/abuse controls, and output handling.

## This project: Expat507

Tuned for the Expat507 site (Next.js on Vercel). The attack surface that actually matters
here, in priority order:

- **AI Assistant (`/asistente`)** — highest-attention area. An LLM endpoint invites prompt
  injection, system-prompt/secret leakage, and unbounded API cost abuse if not rate-limited
  and authenticated. See `references/ai-assistant-security.md`.
- **Forms collecting PII (`/consulta`, `/contacto`, `/newsletter`)** — input validation,
  injection, spam/bot abuse, CSRF, and where the personal data goes (email, DB, CRM). The
  consultation form gathers people's financial/migration situation, which is sensitive.
  See `references/api-and-forms.md`.
- **API routes** (Next.js `/api/*` backing the above) — authentication, authorization,
  rate limiting, server-side validation, and not trusting client input.
- **Security headers & CSP** — Vercel/Next.js defaults are a starting point but usually
  need a real CSP and stricter headers. See `references/headers-and-config.md`.
- **Dependencies** — run `npm audit` and check for outdated packages with known CVEs.
- **Data privacy** — the site collects personal data from international users; check
  consent, storage, and the privacy/terms pages reflect reality.

User-facing auth seems minimal (a content site), so account-takeover surface is small —
but verify there's no unprotected admin route, preview deployment, or exposed API.

## Quick automated checks

These are safe to run against the user's own site and give fast signal:

```bash
npm audit --omit=dev            # known-vulnerable dependencies
npx npm-check-updates            # outdated packages
# Security headers — inspect the response headers:
curl -sI https://expat507.vercel.app | grep -iE 'content-security|strict-transport|x-frame|x-content-type|referrer-policy|permissions-policy'
```

For a broader dynamic scan of the user's own site, **OWASP ZAP** (baseline scan) is the
standard free tool. Run it against a staging/preview URL, review findings, and triage —
scanners produce false positives, so confirm each finding before reporting it as real.

## Severity & report format

Rate findings by impact × likelihood: **Critical / High / Medium / Low / Info**.

```markdown
## [SEVERITY] Finding title
**Category:** (e.g. OWASP A03 Injection / Security misconfiguration)
**Location:** file:line or endpoint/route
**Description:** what the weakness is, in plain terms.
**Impact:** what an attacker could do if it's exploited.
**Evidence:** the code/config/response that demonstrates it.
**Remediation:** the specific fix, ideally with a code/config snippet.
**References:** OWASP/CWE link.
```

Order the report by severity, lead with an executive summary (counts per severity + the
top 3 things to fix first), and make every remediation actionable.

## Principles

- **Find-and-fix, not find-and-brag.** A finding without a remediation is half a job.
- **Static review before active probing.** It's safer and usually faster.
- **Confirm before reporting.** Scanners and pattern-matches produce false positives.
- **Defense in depth.** Don't rely on a single control; validate on the server even if the
  client validates too.
- **Least privilege & secure defaults.** Recommend the safe default, then justify any
  loosening.
- **Never include real secrets in reports or test artifacts.** Redact tokens and keys.
