# AURINOVA authentication interface

Reviewed: 2026-09-07. This document describes the existing frontend adapter and required external service contract. Content migration does not enable authentication. Public login/signup navigation remains available; forms explicitly show preview mode until the required service configuration is ready. The proposed session, console and subscription extensions are documented in [Console and Coding Plan](CONSOLE_AND_CODING_PLAN.md).

The public authentication UI calls a single browser client in
`lib/auth/api.ts`. Set `VITE_AURINOVA_AUTH_API_BASE_URL` and
`VITE_AURINOVA_AUTH_ENABLED=true` when an external identity service is
available. Until then, the interface visibly identifies preview mode and uses a
short in-browser adapter so every form state remains testable without storing
credentials, creating a session, or claiming that an email was sent.

The external service must allow requests from the deployed website origin and
support credentialed CORS. Its session cookies must be configured for the final
frontend and API domains. The API origin is included in the public JavaScript
bundle, so it must never contain credentials or private configuration.

All POST endpoints accept a bounded, schema-validated JSON body, return JSON,
and are called with `credentials: include` so the identity service can own an
`HttpOnly`, `Secure` session cookie. The browser UI never stores access tokens.
Production identity services must use HTTPS.

Live signup also requires `VITE_TURNSTILE_SITE_KEY`. The browser sends the
one-time Turnstile token as `verificationToken`; the identity service must
validate it with Turnstile before creating an account. Signup remains in preview
mode until the auth flag, Turnstile key, Terms URL, and Data Processing
Agreement URL are all present; login, SSO, and password reset can still use the
live service independently.

Set `VITE_AURINOVA_TERMS_URL` and
`VITE_AURINOVA_DATA_AGREEMENT_URL` to approved legal documents before enabling
live authentication. While they are unset, the UI links to explicit local
readiness notices.

## Endpoints

- `POST /api/auth/signup/prepare` with `{ email }`; returns
  `{ signupToken, message?, redirectTo? }`.
- `POST /api/auth/signup/complete` with
  `{ email, fullName, password, signupToken, termsAccepted: true, verificationToken, returnTo? }`.
- `POST /api/auth/login` with `{ email, password, returnTo? }`.
- `POST /api/auth/password/reset-request` with `{ email }`.
- `POST /api/auth/sso/resolve` with exactly one of `{ workEmail }` or
  `{ accountId }`, plus optional `returnTo`.
- `GET /api/auth/oauth/:provider?intent=login|signup&return_to=/aurinova-reference`
  for Google, GitHub, and LinkedIn top-level redirects. The external service
  must allow the final static-site URL as an OAuth return origin.

Successful POST responses may include an internal `redirectTo`. Error responses
may use `{ code, message, fieldErrors }`; `fieldErrors` keys match the submitted
field names. Keep login and password-reset responses deliberately ambiguous so
they do not reveal whether an email address is registered.

`POST /api/auth/sso/resolve` must return a safe internal `redirectTo` that starts
the organization identity-provider flow. The browser sends its current
`Accept-Language`; the service can use it to localize its response.

Every `returnTo` and `redirectTo` must be a same-origin relative URL. The client
rejects absolute URLs, protocol-relative URLs, backslashes, and control
characters. The identity service must apply the same rule.


## 控制台衔接（2026-09-07）

登录默认回跳为 `/console/usage`。登录、邮箱、SSO、注册和找回密码之间切换保留经过校验的 `return_to`，支持站点 base path。无身份配置时保留预览提示，并提供 `/demo/console/usage` 独立演示入口；演示操作不会创建登录会话。

预留 `GET /api/auth/session`（身份服务基址）：使用 Cookie，401 表示未登录；成功返回 `{ "user": { "id": "…", "displayName": "…", "emailVerified": true }, "workspace": { "id": "…", "name": "…" } }`。`POST /api/auth/logout` 负责服务端注销。SessionProvider 提供查询、刷新与注销方法；异常保持错误态，不退回演示身份。后端仍须校验工作空间权限、跨域来源和 CSRF。
