# Manual & Exploratory QA Reference

Some things can't be automated cheaply: visual polish, cross-device feel, content
correctness, and the "does this actually make sense to a user" judgment. This reference
covers structured manual QA.

## Cross-browser / device matrix

Test critical flows on at least:

| Environment | Why |
|-------------|-----|
| Chrome (desktop) | Largest share; baseline |
| Safari (desktop + iOS) | WebKit quirks differ from Chromium; many expat users are on Apple |
| Firefox (desktop) | Gecko engine differences |
| Android Chrome | Mobile baseline |
| Small mobile (375px) and large desktop (1440px+) | Layout breakpoints |

For Expat507's international audience, iOS Safari and mobile are especially important.

## Exploratory testing charters

Instead of just clicking randomly, run time-boxed "charters" — a focused mission for
~20 minutes each:

- **Consultation funnel:** Try to complete `/consulta` as a real lead. Then try to break
  it: skip fields, paste huge text, double-click submit, go back mid-flow, submit twice.
- **AI Assistant:** Ask normal questions. Then send empty messages, extremely long
  messages, messages in English/German, special characters, and spam rapidly. Does the UI
  stay stable? Does it always recover from errors?
- **Content browsing:** Click every category filter on `/guias`. Open several guides.
  Check for broken links, missing images, broken layout, and wrong/placeholder text.
- **Navigation:** Every header/footer link goes where it claims. Logo returns home. Back
  button behaves. 404 page exists and is friendly for bad URLs.

Note anything surprising — exploratory testing's value is finding the bugs you didn't
think to write a test for.

## Content & SEO checks (high value for this site)

Expat507 lives and dies by content quality and search visibility:

- No placeholder/lorem text or "2024" dates that should be current.
- Spelling/grammar in Spanish across guides.
- Each page has a unique, accurate `<title>` and meta description.
- OpenGraph image and tags render correctly (test with a link preview / the OG image URL).
- Internal links between related guides aren't broken.
- Images are optimized (use Next.js `<Image>`), sized correctly, and have alt text.
- Structured data / canonical URLs are consistent (the og:url points to expat507.com —
  verify the production domain vs the vercel.app domain is intentional).

## Responsive & visual checks

- No horizontal scroll at any breakpoint.
- Tap targets on mobile are at least ~44px.
- Text doesn't overflow or get clipped in cards/testimonials.
- Forms are comfortable to fill on a phone (correct input types/keyboards: `type="email"`,
  `inputmode`, etc.).
- Loading and empty states look intentional, not broken.

## Pre-release smoke test

A 10-minute pass before any deploy:

1. Home loads, hero and CTAs work.
2. One guide opens and renders fully.
3. Category filter works.
4. Consultation form submits successfully (use a test entry).
5. Newsletter signup gives clear feedback.
6. AI assistant returns a response.
7. No console errors in the browser devtools.
8. Mobile viewport looks correct.

If all eight pass, the deploy is probably safe. If any fail, hold and file a bug.
