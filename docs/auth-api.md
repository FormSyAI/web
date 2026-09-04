# AURINOVA authentication interface

The public authentication UI calls a single client in `lib/auth/api.ts`. Browser
requests stay on the AURINOVA origin under `/api/auth/*`; route handlers proxy to
the identity service through `lib/auth/server.ts`. Set the server-only
`AURINOVA_AUTH_API_BASE_URL` and then set
`NEXT_PUBLIC_AURINOVA_AUTH_ENABLED=true` when the identity service is available.
Until then, the interface uses a short in-browser preview adapter so every form
state remains testable without storing credentials or creating a fake session.

All POST endpoints accept JSON, return JSON, and are called with
`credentials: include` so the server can own an `HttpOnly`, `Secure`,
`SameSite=Lax` session cookie. The browser UI never stores access tokens or the
upstream service origin.

## Endpoints

- `POST /v1/auth/signup/prepare` with `{ email }`; returns
  `{ signupToken, message?, redirectTo? }`.
- `POST /v1/auth/signup/complete` with
  `{ email, fullName, password, signupToken, termsAccepted: true, verificationToken }`.
- `POST /v1/auth/login` with `{ email, password }`.
- `POST /v1/auth/password/reset-request` with `{ email }`.
- `POST /v1/auth/sso/resolve` with either `{ workEmail }` or `{ accountId }`.
- `GET /v1/auth/oauth/:provider/authorize?intent=login|signup&return_to=/account/home`
  for Google, GitHub, and LinkedIn top-level redirects.

Successful POST responses may include an internal `redirectTo`. Error responses
may use `{ code, message, fieldErrors }`; `fieldErrors` keys match the submitted
field names. Keep login and password-reset responses deliberately ambiguous so
they do not reveal whether an email address is registered.
