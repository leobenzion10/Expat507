---
name: web-qa
description: >-
  Quality assurance for web applications built with Next.js, React and TypeScript.
  Use this skill whenever the user wants to test their website or web app, write or
  improve automated tests (unit, component, integration, end-to-end), build a test
  plan or QA checklist, verify a feature works as expected, set up regression testing,
  check accessibility (a11y), evaluate performance, or write a bug report. Trigger this
  even when the user only says things like "make sure this page works", "I broke
  something, can you check", "add tests for this", "is this accessible", or "QA this
  before I ship" — they want structured QA, not an ad-hoc glance.
---

# Web QA

This skill helps deliver disciplined, repeatable quality assurance for a Next.js +
TypeScript web application. The goal is to catch bugs before users do, and to leave
behind automated tests that keep catching them.

QA is not "click around and hope". It is layered: each layer catches a different class
of bug at a different cost. Cover the cheap, fast layers thoroughly and reserve the
slow, expensive layers for the flows that matter most.

## This project: Expat507

This skill is tuned for the Expat507 site (Next.js on Vercel) — an expat/investor guide
platform for Panama. Its critical surfaces, in rough priority order for QA:

- **Lead/consultation form (`/consulta`)** — the business-critical conversion funnel.
  A broken or silently-failing form here means lost leads. Test happy path, validation,
  submission success/error states, and that data actually reaches its destination.
- **Newsletter signup (`/newsletter`) and contact form (`/contacto`)** — email capture.
  Test validation, duplicate/invalid emails, success and error feedback.
- **AI Assistant (`/asistente`)** — an LLM-backed chat feature. Non-deterministic, so test
  the *contract* (loading state, error handling, empty input, very long input, the UI
  doesn't break on slow/failed responses) rather than exact wording. See the AI testing
  note in `references/automated-testing.md`.
- **Guides (`/guias`, `/guias/[slug]`, `/guias?category=...`)** — content rendering,
  category filtering, dynamic article routes, broken-link checks, and SEO/meta tags
  (this site depends heavily on correct meta/OpenGraph data — verify it).
- **Navigation, responsiveness and accessibility** across the whole site.

When the user shares the actual repository, map these to the real file/route names and
refine the test plan accordingly.

## Workflow

When asked to QA something, work through these steps in order:

1. **Clarify the target.** What exactly is being tested — a single component, a page,
   a user flow (e.g. signup → checkout), or the whole app before a release? Ask only if
   it is genuinely unclear; otherwise infer from context and state your assumption.
2. **Pick the right layer(s).** Use the decision guide below. Most features need a
   component test plus one happy-path E2E test. Don't write an E2E test for something a
   unit test covers more cheaply.
3. **Write a short test plan** (template below) so the user can see coverage at a glance.
4. **Generate the tests** following the patterns in the reference files.
5. **Run them and report** pass/fail clearly. For any failure, give a concise bug report.
6. **Note gaps.** Call out what is NOT covered so the user can decide if it matters.

## The testing layers

Choose layers by what you're testing — this is the core judgment call in QA:

- **Unit tests (Vitest)** — pure functions, utilities, formatting, validation, business
  logic. Fast and cheap; write many. No DOM needed.
- **Component tests (Vitest + React Testing Library)** — a single React component renders
  correctly, responds to props, handles user interaction (clicks, typing), shows the
  right states (loading, error, empty). This is where most UI bugs are caught cheaply.
- **Integration tests** — several units/components working together, often with a mocked
  API or database. Good for forms, data fetching, and state that spans components.
- **End-to-end tests (Playwright)** — a real browser drives the actual running app through
  a full user flow. Slow and more brittle, so reserve for critical paths: auth, payment,
  the core thing your site exists to do. Run across Chromium, Firefox and WebKit.
- **Accessibility (a11y)** — keyboard navigation, screen-reader semantics, color contrast,
  focus management. Partly automatable, partly manual. See `references/accessibility.md`.
- **Performance** — Core Web Vitals (LCP, CLS, INP), bundle size, image optimization.
  Catch regressions, not micro-optimizations.

For detailed, copy-ready test patterns and setup, read the reference file for the layer
you need:

- `references/automated-testing.md` — Vitest, React Testing Library and Playwright setup,
  plus annotated example tests for each layer. Read this before writing any test code.
- `references/accessibility.md` — the a11y checklist and how to automate part of it.
- `references/manual-qa.md` — cross-browser/device matrix and exploratory testing guidance
  for things that can't be automated.

## Test plan template

Before writing tests, produce a short plan so coverage is visible. Use this structure:

```markdown
# Test Plan: [feature/page name]

## Scope
What is being tested and what is explicitly out of scope.

## Test cases
| # | Layer | Scenario | Expected result | Priority |
|---|-------|----------|-----------------|----------|
| 1 | Component | Submit button disabled while form invalid | Button is disabled | High |
| 2 | E2E | User completes signup with valid data | Redirected to dashboard | High |
| 3 | Unit | Email validator rejects "a@b" | Returns false | Medium |

## Risks / not covered
What could still break that these tests don't catch.
```

Prioritize ruthlessly: a few high-value tests that run reliably beat dozens of flaky ones.

## Bug report format

When a test fails or you find a defect, report it like this — precise and reproducible:

```markdown
**Bug:** [one-line summary]
**Severity:** Critical / High / Medium / Low
**Steps to reproduce:**
1. ...
2. ...
**Expected:** what should happen
**Actual:** what happens instead
**Evidence:** error message, failing assertion, or screenshot path
**Suspected cause:** (if known) file/line or root cause
```

## Principles

- **Test behavior, not implementation.** Assert what the user sees and does, not internal
  state. Tests that break on harmless refactors are worse than no tests.
- **Make failures obvious.** A failing test should tell you what broke without debugging.
- **Keep tests deterministic.** No real network, no random data, no time-of-day
  dependence. Mock the boundaries; control the clock.
- **Cheap layers first.** If a bug can be caught by a unit test, don't reach for E2E.
- **Leave the suite green.** Don't hand back failing or skipped tests without flagging them.
