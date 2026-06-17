# Accessibility (a11y) Reference

Accessibility is part of QA, not an afterthought. It widens your audience and, for a
professional advisory site like Expat507, signals credibility. Target **WCAG 2.1 AA**.

Part of a11y is automatable; part needs human checks. Do both.

## Automated checks

Add axe-based checks to component and E2E tests to catch the mechanical issues:

```bash
npm install -D @axe-core/playwright jest-axe
```

Playwright:

```ts
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("home page has no automatically detectable a11y violations", async ({ page }) => {
  await page.goto("/");
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
```

Run this across the key pages: `/`, `/guias`, a single guide, `/consulta`, `/asistente`.
Automated tools catch roughly 30–50% of issues — necessary but not sufficient.

## Manual checklist

Automated tools can't judge these. Check by hand on the main pages:

### Keyboard
- Every interactive element (links, buttons, form fields, the AI chat input) is reachable
  with Tab and operable with Enter/Space.
- Focus order is logical and follows the visual layout.
- A visible focus indicator is always present — never `outline: none` without a replacement.
- No keyboard traps (you can always Tab out of a widget/modal).
- Skip-to-content link for keyboard users.

### Screen reader / semantics
- Headings are hierarchical (one `h1` per page, no skipped levels). This site uses many
  section headings — verify the structure.
- Images have meaningful `alt` text; decorative images use `alt=""`.
- Form fields have associated `<label>`s (not just placeholders).
- Buttons vs links: actions are `<button>`, navigation is `<a>`.
- The AI assistant's new messages are announced (use an `aria-live` region).
- Error messages are programmatically linked to their field (`aria-describedby`).

### Visual
- Text contrast ≥ 4.5:1 (≥ 3:1 for large text). Check the gold/accent colors against
  their backgrounds.
- The site is usable at 200% zoom without horizontal scrolling or clipped content.
- Information is never conveyed by color alone (e.g. error states need text/icon too).
- Respects `prefers-reduced-motion` for any animations.

### Forms (consulta, newsletter, contacto)
- Labels are visible and persistent.
- Required fields are marked in text, not only with color/asterisk.
- Validation errors are clear, specific, and tied to the field.
- The submit result (success/failure) is announced to assistive tech.

## Reporting

Report a11y findings using the standard bug format in SKILL.md, adding the **WCAG
criterion** (e.g. "1.4.3 Contrast") and **who it affects** (keyboard users, screen-reader
users, low-vision users) so the user can prioritize.
