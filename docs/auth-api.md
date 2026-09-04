# AURINOVA authentication interface

The public authentication UI calls a single client in `lib/auth/api.ts`. Browser
requests stay on the AURINOVA origin under `/api/auth/*`; route handlers proxy to
the identity service through `lib/auth/server.ts`. Set the server-only
`AURINOVA_AUTH_API_BASE_URL` and `AURINOVA_AUTH_ENABLED=true`, then build with
`NEXT_PUBLIC_AURINOVA_AUTH_ENABLED=true` when the identity service is available.
Until then, the interface visibly identifies preview mode and uses a short
in-browser adapter so every form state remains testable without storing
credentials, creating a session, or claiming that an email was sent.

Vinext route handlers read the three server-side `AURINOVA_AUTH_*` values from
Cloudflare Worker bindings at runtime. Local `vinext dev` mirrors those selected
values from the ignored `.env.local` file into the development Worker. Configure
the same bindings in the hosted environment; keep the API origin and cookie
configuration out of `NEXT_PUBLIC_*` variables.

All POST endpoints accept a bounded, schema-validated JSON body, return JSON,
and are called with `credentials: include` so the server can own an `HttpOnly`,
`Secure`, `SameSite=Lax` session cookie. The BFF requires the same-origin UI
request marker, rejects cross-origin requests, and relays only cookie names in
`AURINOVA_AUTH_COOKIE_NAMES`. The browser UI never stores access tokens or the
upstream service origin. Production upstreams must use HTTPS; local HTTP is
accepted only for loopback development.

Live signup also requires `NEXT_PUBLIC_TURNSTILE_SITE_KEY`. The browser sends the
one-time Turnstile token as `verificationToken`; the identity service must
validate it with Cloudflare before creating an account. Preview tokens are
rejected by the live BFF. Signup remains in preview mode until the auth flag,
Turnstile key, Terms URL, and Data Processing Agreement URL are all present;
login, SSO, and password reset can still use the live service independently.

Set `NEXT_PUBLIC_AURINOVA_TERMS_URL` and
`NEXT_PUBLIC_AURINOVA_DATA_AGREEMENT_URL` to approved legal documents before
enabling live authentication. While they are unset, the UI links to explicit
local readiness notices.

## Endpoints

- `POST /v1/auth/signup/prepare` with `{ email }`; returns
  `{ signupToken, message?, redirectTo? }`.
- `POST /v1/auth/signup/complete` with
  `{ email, fullName, password, signupToken, termsAccepted: true, verificationToken, returnTo? }`.
- `POST /v1/auth/login` with `{ email, password, returnTo? }`.
- `POST /v1/auth/password/reset-request` with `{ email }`.
- `POST /v1/auth/sso/resolve` with either `{ workEmail }` or `{ accountId }`,
  plus optional `returnTo`.
- `GET /v1/auth/oauth/:provider/authorize?intent=login|signup&return_to=/aurinova-reference`
  for Google, GitHub, and LinkedIn top-level redirects.

Successful POST responses may include an internal `redirectTo`. Error responses
may use `{ code, message, fieldErrors }`; `fieldErrors` keys match the submitted
field names. Keep login and password-reset responses deliberately ambiguous so
they do not reveal whether an email address is registered.

`POST /v1/auth/sso/resolve` must return a safe internal `redirectTo` that starts
the organization identity-provider flow. The browser sends its current
`Accept-Language`, and the BFF forwards a bounded value so upstream errors can
respect the selected locale. The client also localizes every BFF-defined error
code before showing it.

Every `returnTo` and `redirectTo` must be a same-origin relative URL. The client
and BFF both reject absolute URLs, protocol-relative URLs, backslashes, and
control characters. The identity service must apply the same rule.
