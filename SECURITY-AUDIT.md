# FutBidder security audit

Date: 4 September 2026

Scope: Node HTTP server, static file delivery, Google authentication, account statistics, multiplayer lobby APIs, browser rendering and Render configuration.

## Fixed findings

### Critical: internal files were publicly downloadable

The previous static handler served arbitrary files located in the project directory. In the deployed version, `/server.js` returned HTTP 200; a local `stats-store.json` could also have become downloadable when present.

Fix: static delivery now uses an explicit allowlist containing only the files required by the browser and the six approved avatar files. Files such as `server.js`, `package.json`, `.env`, `render.yaml` and `stats-store.json` return HTTP 404.

### High: lobby member secrets were exposed

The identifiers used to authorise host and player actions were also returned to every person able to read a lobby. A person who knew the lobby code could reuse the host identifier and impersonate the host.

Fix: member secrets are now generated with `crypto.randomBytes()` and are returned only to their owner. Other clients receive separate public display identifiers. Polling sends the private identifier in a request header instead of the URL. Lobby codes now use cryptographically secure randomness.

### High: missing request resource limits

The JSON parser previously accepted an unlimited request body and the application had no rate limiting, session expiry or hard cap on active lobbies.

Fix: requests now have a 32 KB body limit, JSON-only content validation, per-IP rate limits, HTTP timeouts, limited headers, a maximum number of requests per socket, bounded rate-limit memory, at most 250 active lobbies and at most 20 managers per lobby.

### Medium: missing browser security headers

Fix: all responses now include an enforced Content Security Policy, clickjacking protection, MIME-sniffing protection, a restrictive permissions policy, a safer referrer policy and HSTS in production. The CSP permits only the Google Identity endpoints documented by Google that are required by the login flow.

### Medium: sessions did not expire

Fix: login sessions use 256-bit random tokens and expire after 12 hours of inactivity by default. Expired sessions and rate-limit buckets are removed automatically.

### Medium: stored statistics text was insufficiently sanitised

An authenticated client could store HTML-like content in the champion field, which the browser later rendered in an HTML template.

Fix: profile and statistics text is normalised when written and when older records are read. Control characters and HTML delimiters are removed. A regression test covers this case.

### Low: untrusted Host header reflection and arbitrary lineup payloads

Fix: the public origin shown by the client is built only from a validated host value. Multiplayer lineups now accept only known formation slots and players owned by that manager, reject duplicate assignments and limit processing to eleven entries.

## Verification performed

- JavaScript syntax checks for client, localisation and server code.
- Account statistics regression test.
- Automated security regression test for CSP and security headers.
- Automated checks that internal files return 404.
- Invalid JSON, unsupported content type and oversized body tests.
- Lobby test proving that public identifiers cannot authorise host actions.
- Browser test of the home page, single-player auction and multiplayer lobby with CSP enabled.
- Repository scan for common committed API keys and private-key signatures; none were found.

Run the full suite with:

```bash
npm run check
```

## Residual risks and operational actions

- The production site remains vulnerable to the old static-file issue until this update is deployed. Redeploy immediately and confirm that `/server.js` returns 404.
- Rate limiting is in-process. A platform or CDN rate limiter/WAF is still needed for large distributed denial-of-service attacks or multiple Render instances.
- Single-player statistics are calculated in the browser, so an authenticated user can falsify their own totals by calling the API directly. This does not provide access to another account, but a future public leaderboard would require server-authoritative matches or signed match receipts.
- The SPA keeps its bearer session in browser storage. The enforced CSP and output sanitisation reduce the risk of token theft, but a future authentication revision should prefer an HttpOnly, Secure, SameSite cookie plus CSRF protection.
- File-based statistics are appropriate for the current small deployment but do not provide database-level access control, encryption at rest or multi-instance locking. Use a managed database before significant growth.
- Volumetric network attacks and TLS certificate security remain the responsibility of Render or a fronting CDN/WAF.
- Re-run this audit after adding dependencies, payments, chat, file uploads, administrator functions or a public leaderboard.
