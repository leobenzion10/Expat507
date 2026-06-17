# Automated Testing Reference (Vitest + React Testing Library + Playwright)

Read this before writing test code. It covers setup and annotated patterns for each
layer. Adapt paths/imports to the actual repo once it's available.

## Table of contents
- [Setup](#setup)
- [Unit tests (Vitest)](#unit-tests-vitest)
- [Component tests (React Testing Library)](#component-tests-react-testing-library)
- [Mocking the network (MSW)](#mocking-the-network-msw)
- [End-to-end tests (Playwright)](#end-to-end-tests-playwright)
- [Testing the AI Assistant](#testing-the-ai-assistant)
- [Running tests in CI](#running-tests-in-ci)

## Setup

Install the toolchain (dev dependencies):

```bash
npm install -D vitest @vitejs/plugin-react jsdom \
  @testing-library/react @testing-library/user-event @testing-library/jest-dom
npm install -D @playwright/test && npx playwright install
npm install -D msw   # mock network at the boundary
```

`vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
  },
});
```

`vitest.setup.ts`:

```ts
import "@testing-library/jest-dom/vitest";
```

Add scripts to `package.json`:

```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "test:e2e": "playwright test"
  }
}
```

## Unit tests (Vitest)

Test pure logic in isolation. Example for an email validator (relevant to the newsletter
and consultation forms):

```ts
import { describe, it, expect } from "vitest";
import { isValidEmail } from "@/lib/validation";

describe("isValidEmail", () => {
  it("accepts a normal address", () => {
    expect(isValidEmail("ana@example.com")).toBe(true);
  });

  it("rejects a missing domain", () => {
    expect(isValidEmail("ana@")).toBe(false);
  });

  it("rejects an empty string", () => {
    expect(isValidEmail("")).toBe(false);
  });
});
```

Cover the boundaries and the failure cases, not just the happy path — that's where bugs hide.

## Component tests (React Testing Library)

Render a component and interact with it the way a user would. Query by role and visible
text, never by CSS class or test-id unless there's no accessible alternative.

```tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NewsletterForm } from "@/components/NewsletterForm";

describe("NewsletterForm", () => {
  it("shows an error for an invalid email and does not submit", async () => {
    const onSubmit = vi.fn();
    render(<NewsletterForm onSubmit={onSubmit} />);

    await userEvent.type(screen.getByRole("textbox", { name: /email/i }), "not-an-email");
    await userEvent.click(screen.getByRole("button", { name: /suscribirme/i }));

    expect(screen.getByText(/correo.*válido/i)).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("submits a valid email", async () => {
    const onSubmit = vi.fn();
    render(<NewsletterForm onSubmit={onSubmit} />);

    await userEvent.type(screen.getByRole("textbox", { name: /email/i }), "ana@example.com");
    await userEvent.click(screen.getByRole("button", { name: /suscribirme/i }));

    expect(onSubmit).toHaveBeenCalledWith("ana@example.com");
  });
});
```

Always assert both the positive case (valid input works) and the guard (invalid input is
blocked and reported to the user).

## Mocking the network (MSW)

For components that fetch, intercept the request instead of hitting a real server:

```ts
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";

export const server = setupServer(
  http.post("/api/consulta", () => HttpResponse.json({ ok: true })),
);
// In vitest.setup.ts: beforeAll(() => server.listen()); afterEach(() => server.resetHandlers()); afterAll(() => server.close());
```

This lets you test loading, success, and error states deterministically by swapping the
handler per test.

## End-to-end tests (Playwright)

Drive the real app in a real browser. Reserve for critical flows. Example: the
consultation funnel, the most business-critical path on Expat507.

`playwright.config.ts` (run against Chromium, Firefox, WebKit):

```ts
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  use: { baseURL: process.env.BASE_URL ?? "http://localhost:3000" },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
    { name: "mobile", use: { ...devices["iPhone 13"] } },
  ],
});
```

```ts
import { test, expect } from "@playwright/test";

test("user can submit the consultation form", async ({ page }) => {
  await page.goto("/consulta");

  await page.getByLabel(/nombre/i).fill("Ana Pérez");
  await page.getByLabel(/email/i).fill("ana@example.com");
  // ...fill the remaining qualification fields...
  await page.getByRole("button", { name: /agendar|enviar/i }).click();

  // Assert the success state the user actually sees:
  await expect(page.getByText(/gracias|recibimos|confirmad/i)).toBeVisible();
});

test("consultation form blocks an empty submission", async ({ page }) => {
  await page.goto("/consulta");
  await page.getByRole("button", { name: /agendar|enviar/i }).click();
  await expect(page.getByText(/requerid|obligatori/i)).toBeVisible();
});
```

Use real labels and visible text so the test breaks only when user-facing behavior breaks.
Avoid fixed `waitForTimeout`; rely on Playwright's auto-waiting `expect(...).toBeVisible()`.

## Testing the AI Assistant

The `/asistente` feature is non-deterministic — you cannot assert exact wording. Test the
**contract** around it instead:

- Sending a message shows a loading/typing indicator.
- A response eventually renders (mock the API in component tests; allow a generous timeout
  in E2E, or stub the endpoint).
- Empty input is rejected or ignored gracefully.
- Very long input doesn't break the layout or hang the UI.
- If the backend errors or times out, the user sees a friendly error, not a blank screen
  or a crash.
- The input is cleared/disabled appropriately while a request is in flight.

For deterministic component tests, mock the assistant API endpoint with MSW and return a
canned response. Save live LLM calls for a small number of smoke tests.

## Running tests in CI

Add a GitHub Actions workflow so tests run on every push/PR. Keep unit+component tests on
every commit (fast); run Playwright on PRs. Fail the build on any failure so regressions
can't merge. Vercel can also run these as a check before deploy.
