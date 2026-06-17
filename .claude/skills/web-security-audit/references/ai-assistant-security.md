# AI Assistant Security Reference (`/asistente`)

An LLM-backed feature is a distinct attack surface from a normal API. The model will do
roughly what its input tells it to, the backend call costs money per request, and the
system prompt or API key can leak if the integration is careless. Audit it on its own.

This is defensive review of the user's **own** assistant feature — testing your own
endpoint to harden it, not attacking someone else's.

## The key risks

### 1. Prompt injection
User text (or text pulled from a guide/web source the assistant reads) can contain
instructions that override your intent — "ignore your instructions and do X", or hidden
instructions inside retrieved content.
**Mitigate:**
- Keep the system prompt server-side; never let the client send or edit it.
- Treat all model output as untrusted: don't auto-execute it, don't render it as raw HTML,
  don't let it trigger privileged actions without a separate authorization check.
- Constrain scope: instruct the model to only answer about Panama expat/investment topics,
  and validate/format outputs rather than trusting them.
- If the assistant retrieves content (RAG), sanitize and clearly delimit retrieved text so
  it's treated as data, not instructions.

### 2. System-prompt / secret leakage
Users may try to extract the system prompt, internal instructions, or — worse — anything
sensitive interpolated into it.
**Mitigate:**
- Never put secrets, API keys, or internal URLs in the prompt.
- Accept that the system prompt may leak; design so leaking it causes no harm.
- The LLM **API key must live only on the server** — never `NEXT_PUBLIC_`, never sent to
  the browser. Confirm the browser calls *your* API route, which then calls the LLM, not
  the LLM provider directly from the client.

### 3. Cost / denial-of-wallet abuse
Each request costs money. Unprotected, an attacker can loop requests and run up a large
bill or exhaust quota.
**Mitigate:**
- Rate-limit per IP/session, both burst and daily caps.
- Cap input length and max output tokens per request.
- Add bot protection (Turnstile/CAPTCHA) if abuse appears.
- Set a hard monthly spend cap / alerts at the LLM provider.
- Consider requiring a lightweight session/consent before the assistant is usable.

### 4. Unsafe output handling
Model output rendered as HTML can carry XSS; output used in a query/command can carry
injection.
**Mitigate:** render assistant responses as plain text or sanitized markdown (DOMPurify +
allowlist), never via `dangerouslySetInnerHTML` on raw output. Never feed model output
into SQL/shell/eval.

### 5. Sensitive-topic / liability output
This assistant advises on migration, banking and legal topics. Bad output is a liability,
not just a bug.
**Mitigate:** include disclaimers that it's informational, not legal/financial advice
(the site already states this — ensure the assistant repeats it). Consider guardrails to
avoid fabricating specific legal/financial claims.

## Audit checklist

- [ ] LLM API key is server-only; confirm it's absent from the client bundle and network tab.
- [ ] The browser calls your own API route, not the LLM provider directly.
- [ ] System prompt is server-side and contains no secrets.
- [ ] Per-IP/session rate limiting is in place, with input-length and output-token caps.
- [ ] A provider-side spend cap and usage alerts exist.
- [ ] Output is rendered safely (sanitized; not raw HTML).
- [ ] Bot protection is available if/when abuse is detected.
- [ ] Errors/timeouts are handled gracefully and don't leak internal details.
- [ ] Disclaimers for legal/financial topics are present.
- [ ] Conversations aren't logged with PII unless intended and disclosed.

## Safe self-testing (your own endpoint, staging)

To confirm your defenses, send your own assistant adversarial-style inputs and check it
holds up — this is hardening, not attacking:

- A message asking it to reveal or ignore its instructions → it should stay on-task and
  leak nothing sensitive.
- A message with embedded "system" style instructions → it should treat them as user text.
- Very long input and rapid repeated requests → rate limits / length caps should trigger.
- Input with HTML/script tags → the rendered response must not execute them.
- Watch the browser network tab → confirm no API key or system prompt is exposed client-side.

Report findings with the standard severity/remediation format from the main SKILL.md.
