import { env as workerEnv } from 'cloudflare:workers';
import { NextResponse, type NextRequest } from 'next/server';

import { normalizeAuthReturnTo } from './redirect';

export type AuthRequestKind =
  | 'login'
  | 'password-reset'
  | 'signup-complete'
  | 'signup-prepare'
  | 'sso';

type JsonRecord = Record<string, unknown>;
type ValidatedBody =
  | { ok: true; value: JsonRecord }
  | { ok: false; response: Response };

const timeoutMs = 12_000;
const maxRequestBytes = 16 * 1024;
const maxResponseBytes = 128 * 1024;
const authRequestHeader = 'auth-ui-v1';
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const accountIdPattern = /^[A-Za-z0-9][A-Za-z0-9._-]*$/;

type AuthRuntimeBindings = {
  AURINOVA_AUTH_API_BASE_URL?: string;
  AURINOVA_AUTH_COOKIE_NAMES?: string;
  AURINOVA_AUTH_ENABLED?: string;
};

const authRuntimeBindings = workerEnv as unknown as AuthRuntimeBindings;

function runtimeBinding(name: keyof AuthRuntimeBindings) {
  const workerValue = authRuntimeBindings[name];
  if (typeof workerValue === 'string') return workerValue;
  return process.env[name];
}

function isRecord(value: unknown): value is JsonRecord {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function jsonError(
  status: number,
  code: string,
  message: string,
  fieldErrors?: Record<string, string>,
) {
  return NextResponse.json(
    { code, message, ...(fieldErrors ? { fieldErrors } : {}) },
    { status, headers: { 'Cache-Control': 'no-store' } },
  );
}

function serverAuthEnabled() {
  return runtimeBinding('AURINOVA_AUTH_ENABLED')?.toLowerCase() === 'true';
}

function authServiceBaseUrl() {
  const value = runtimeBinding('AURINOVA_AUTH_API_BASE_URL')?.trim();
  if (!value) return null;
  try {
    const url = new URL(value);
    const localDevelopmentOrigin =
      process.env.NODE_ENV !== 'production' &&
      url.protocol === 'http:' &&
      ['localhost', '127.0.0.1', '[::1]'].includes(url.hostname);
    if (url.protocol !== 'https:' && !localDevelopmentOrigin) return null;
    return url;
  } catch {
    return null;
  }
}

function upstreamUrl(path: string) {
  const base = authServiceBaseUrl();
  if (!base) return null;
  return new URL(
    path.replace(/^\//, ''),
    `${base.toString().replace(/\/$/, '')}/`,
  );
}

function unavailable() {
  return jsonError(
    503,
    'AUTH_NOT_CONFIGURED',
    'The authentication service is not configured.',
  );
}

function validateSameOriginRequest(request: NextRequest) {
  if (request.headers.get('x-aurinova-auth-request') !== authRequestHeader) {
    return jsonError(
      403,
      'AUTH_REQUEST_REJECTED',
      'The authentication request could not be verified.',
    );
  }

  const origin = request.headers.get('origin');
  if (!origin) return null;
  try {
    if (new URL(origin).origin !== request.nextUrl.origin) {
      return jsonError(
        403,
        'AUTH_REQUEST_REJECTED',
        'Cross-origin authentication requests are not allowed.',
      );
    }
  } catch {
    return jsonError(
      403,
      'AUTH_REQUEST_REJECTED',
      'The authentication request origin is invalid.',
    );
  }
  return null;
}

function hasOnlyKeys(body: JsonRecord, allowed: readonly string[]) {
  return Object.keys(body).every((key) => allowed.includes(key));
}

function readString(
  body: JsonRecord,
  key: string,
  { max, min = 1, trim = false }: { max: number; min?: number; trim?: boolean },
) {
  const raw = body[key];
  if (typeof raw !== 'string') return null;
  const value = trim ? raw.trim() : raw;
  if (value.length < min || value.length > max) return null;
  return value;
}

function readOptionalReturnTo(body: JsonRecord) {
  if (body.returnTo === undefined) return undefined;
  const normalized = normalizeAuthReturnTo(body.returnTo, '');
  return normalized || null;
}

function invalidFields(fieldErrors: Record<string, string>) {
  return {
    ok: false as const,
    response: jsonError(
      400,
      'AUTH_VALIDATION_FAILED',
      'Review the highlighted fields and try again.',
      fieldErrors,
    ),
  };
}

function validatePayload(kind: AuthRequestKind, body: unknown): ValidatedBody {
  if (!isRecord(body)) {
    return invalidFields({ form: 'A JSON object is required.' });
  }

  if (kind === 'signup-prepare' || kind === 'password-reset') {
    if (!hasOnlyKeys(body, ['email'])) {
      return invalidFields({
        form: 'The request contains unsupported fields.',
      });
    }
    const email = readString(body, 'email', { max: 254, trim: true });
    if (!email || !emailPattern.test(email)) {
      return invalidFields({ email: 'Enter a valid email address.' });
    }
    return { ok: true, value: { email } };
  }

  const returnTo = readOptionalReturnTo(body);
  if (returnTo === null) {
    return invalidFields({ returnTo: 'The requested destination is invalid.' });
  }

  if (kind === 'login') {
    if (!hasOnlyKeys(body, ['email', 'password', 'returnTo'])) {
      return invalidFields({
        form: 'The request contains unsupported fields.',
      });
    }
    const email = readString(body, 'email', { max: 254, trim: true });
    const password = readString(body, 'password', { max: 256 });
    const fieldErrors: Record<string, string> = {};
    if (!email || !emailPattern.test(email)) {
      fieldErrors.email = 'Enter a valid email address.';
    }
    if (!password) fieldErrors.password = 'Enter your password.';
    if (Object.keys(fieldErrors).length) return invalidFields(fieldErrors);
    return {
      ok: true,
      value: { email, password, ...(returnTo ? { returnTo } : {}) },
    };
  }

  if (kind === 'sso') {
    if (!hasOnlyKeys(body, ['workEmail', 'accountId', 'returnTo'])) {
      return invalidFields({
        form: 'The request contains unsupported fields.',
      });
    }
    const workEmail =
      body.workEmail === undefined
        ? undefined
        : readString(body, 'workEmail', { max: 254, trim: true });
    const accountId =
      body.accountId === undefined
        ? undefined
        : readString(body, 'accountId', { max: 128, trim: true });
    const fieldErrors: Record<string, string> = {};
    if (workEmail === null || (workEmail && !emailPattern.test(workEmail))) {
      fieldErrors.workEmail = 'Enter a valid work email address.';
    }
    if (
      accountId === null ||
      (accountId && !accountIdPattern.test(accountId))
    ) {
      fieldErrors.accountId = 'Enter a valid account ID.';
    }
    if (!workEmail && !accountId) {
      fieldErrors.workEmail = 'Enter a work email or account ID.';
    }
    if (Object.keys(fieldErrors).length) return invalidFields(fieldErrors);
    return {
      ok: true,
      value: {
        ...(workEmail ? { workEmail } : {}),
        ...(accountId ? { accountId } : {}),
        ...(returnTo ? { returnTo } : {}),
      },
    };
  }

  if (
    !hasOnlyKeys(body, [
      'email',
      'fullName',
      'password',
      'signupToken',
      'termsAccepted',
      'verificationToken',
      'returnTo',
    ])
  ) {
    return invalidFields({ form: 'The request contains unsupported fields.' });
  }

  const email = readString(body, 'email', { max: 254, trim: true });
  const fullName = readString(body, 'fullName', { max: 120, trim: true });
  const password = readString(body, 'password', { max: 256, min: 8 });
  const signupToken = readString(body, 'signupToken', { max: 2048 });
  const verificationToken = readString(body, 'verificationToken', {
    max: 4096,
    min: 20,
  });
  const fieldErrors: Record<string, string> = {};
  if (!email || !emailPattern.test(email)) {
    fieldErrors.email = 'Enter a valid email address.';
  }
  if (!fullName) fieldErrors.fullName = 'Enter your full name.';
  if (
    !password ||
    !/[a-z]/.test(password) ||
    !/[A-Z]/.test(password) ||
    !/\d/.test(password) ||
    !/[^A-Za-z0-9]/.test(password)
  ) {
    fieldErrors.password =
      'Use at least 8 characters with upper- and lowercase letters, a number, and a special character.';
  }
  if (!signupToken) fieldErrors.signupToken = 'The signup session has expired.';
  if (!verificationToken || verificationToken.startsWith('preview-')) {
    fieldErrors.verificationToken = 'Complete the human verification again.';
  }
  if (body.termsAccepted !== true) {
    fieldErrors.termsAccepted = 'Accept the terms to create an account.';
  }
  if (Object.keys(fieldErrors).length) return invalidFields(fieldErrors);
  return {
    ok: true,
    value: {
      email,
      fullName,
      password,
      signupToken,
      termsAccepted: true,
      verificationToken,
      ...(returnTo ? { returnTo } : {}),
    },
  };
}

async function readValidatedBody(
  request: NextRequest,
  kind: AuthRequestKind,
): Promise<ValidatedBody> {
  if (
    !request.headers
      .get('content-type')
      ?.toLowerCase()
      .startsWith('application/json')
  ) {
    return {
      ok: false,
      response: jsonError(
        415,
        'AUTH_CONTENT_TYPE_REQUIRED',
        'Authentication requests must use JSON.',
      ),
    };
  }

  const declaredLength = Number(request.headers.get('content-length') ?? '0');
  if (Number.isFinite(declaredLength) && declaredLength > maxRequestBytes) {
    return {
      ok: false,
      response: jsonError(
        413,
        'AUTH_REQUEST_TOO_LARGE',
        'The request is too large.',
      ),
    };
  }

  const rawBody = await request.text();
  if (new TextEncoder().encode(rawBody).byteLength > maxRequestBytes) {
    return {
      ok: false,
      response: jsonError(
        413,
        'AUTH_REQUEST_TOO_LARGE',
        'The request is too large.',
      ),
    };
  }

  try {
    return validatePayload(kind, JSON.parse(rawBody) as unknown);
  } catch {
    return {
      ok: false,
      response: jsonError(
        400,
        'AUTH_INVALID_JSON',
        'The request body is invalid.',
      ),
    };
  }
}

function authCookieNames() {
  const configured = runtimeBinding('AURINOVA_AUTH_COOKIE_NAMES')
    ?.split(',')
    .map((name) => name.trim())
    .filter(Boolean);
  return new Set(
    configured?.length
      ? configured
      : [
          '__Host-aurinova_session',
          '__Host-aurinova_refresh',
          '__Host-aurinova_csrf',
        ],
  );
}

function allowedCookieHeader(header: string | null, names: Set<string>) {
  if (!header) return '';
  return header
    .split(';')
    .map((part) => part.trim())
    .filter((part) => {
      const separator = part.indexOf('=');
      return separator > 0 && names.has(part.slice(0, separator));
    })
    .join('; ');
}

function upstreamSetCookies(headers: Headers) {
  const extendedHeaders = headers as Headers & {
    getSetCookie?: () => string[];
  };
  if (typeof extendedHeaders.getSetCookie === 'function') {
    return extendedHeaders.getSetCookie();
  }
  const single = headers.get('set-cookie');
  return single ? [single] : [];
}

function appendAllowedSetCookies(
  target: Headers,
  source: Headers,
  names: Set<string>,
) {
  for (const cookie of upstreamSetCookies(source)) {
    if (cookie.length > 4096) continue;
    const separator = cookie.indexOf('=');
    const name = separator > 0 ? cookie.slice(0, separator).trim() : '';
    if (!names.has(name) || /;\s*domain=/i.test(cookie)) continue;
    const hostOnly = name.startsWith('__Host-');
    const path = cookie.match(/;\s*path=([^;]*)/i)?.[1]?.trim();
    if (hostOnly && path && path !== '/') continue;
    let securedCookie = cookie;
    if (!/;\s*path=/i.test(securedCookie)) securedCookie += '; Path=/';
    if (!/;\s*samesite=/i.test(securedCookie))
      securedCookie += '; SameSite=Lax';
    if (!/;\s*httponly/i.test(securedCookie)) securedCookie += '; HttpOnly';
    if (
      (hostOnly ||
        name.startsWith('__Secure-') ||
        /;\s*samesite=none/i.test(securedCookie) ||
        process.env.NODE_ENV === 'production') &&
      !/;\s*secure/i.test(securedCookie)
    ) {
      securedCookie += '; Secure';
    }
    target.append('Set-Cookie', securedCookie);
  }
}

export async function proxyAuthPost(
  request: NextRequest,
  path: string,
  kind: AuthRequestKind,
) {
  if (!serverAuthEnabled()) return unavailable();
  const requestRejection = validateSameOriginRequest(request);
  if (requestRejection) return requestRejection;

  const url = upstreamUrl(path);
  if (!url) return unavailable();
  const body = await readValidatedBody(request, kind);
  if (!body.ok) return body.response;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const headers = new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    });
    const acceptLanguage = request.headers.get('accept-language');
    if (
      acceptLanguage &&
      acceptLanguage.length <= 128 &&
      /^[A-Za-z0-9,;=._ *-]+$/.test(acceptLanguage)
    ) {
      headers.set('Accept-Language', acceptLanguage);
    }
    const cookieNames = authCookieNames();
    const cookie = allowedCookieHeader(
      request.headers.get('cookie'),
      cookieNames,
    );
    if (cookie) headers.set('Cookie', cookie);

    const upstream = await fetch(url, {
      method: 'POST',
      cache: 'no-store',
      redirect: 'manual',
      headers,
      body: JSON.stringify(body.value),
      signal: controller.signal,
    });
    const declaredResponseLength = Number(
      upstream.headers.get('content-length') ?? '0',
    );
    if (
      Number.isFinite(declaredResponseLength) &&
      declaredResponseLength > maxResponseBytes
    ) {
      return jsonError(
        502,
        'AUTH_INVALID_RESPONSE',
        'The authentication service returned an invalid response.',
      );
    }

    const responseBody = await upstream.text();
    if (new TextEncoder().encode(responseBody).byteLength > maxResponseBytes) {
      return jsonError(
        502,
        'AUTH_INVALID_RESPONSE',
        'The authentication service returned an invalid response.',
      );
    }

    const responseHeaders = new Headers({
      'Cache-Control': 'no-store',
      'Content-Type':
        upstream.headers.get('content-type') ?? 'application/json',
    });
    appendAllowedSetCookies(responseHeaders, upstream.headers, cookieNames);

    return new Response(responseBody, {
      status: upstream.status,
      headers: responseHeaders,
    });
  } catch (error) {
    const timedOut =
      error instanceof DOMException && error.name === 'AbortError';
    return jsonError(
      timedOut ? 504 : 502,
      timedOut ? 'AUTH_TIMEOUT' : 'AUTH_UPSTREAM_ERROR',
      timedOut
        ? 'The authentication service took too long to respond.'
        : 'The authentication service is temporarily unavailable.',
    );
  } finally {
    clearTimeout(timer);
  }
}

export function authOAuthRedirect({
  intent,
  provider,
  returnTo,
}: {
  intent: 'login' | 'signup';
  provider: 'google' | 'github' | 'linkedin';
  returnTo: string;
}) {
  if (!serverAuthEnabled()) return unavailable();
  const url = upstreamUrl(`/v1/auth/oauth/${provider}/authorize`);
  if (!url) return unavailable();
  url.searchParams.set('intent', intent);
  url.searchParams.set('return_to', normalizeAuthReturnTo(returnTo));
  return NextResponse.redirect(url, 307);
}
