import { NextResponse, type NextRequest } from 'next/server';

const timeoutMs = 12_000;

function authServiceBaseUrl() {
  const value = process.env.AURINOVA_AUTH_API_BASE_URL?.trim();
  if (!value) return null;
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:' && url.protocol !== 'http:') return null;
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
  return NextResponse.json(
    {
      code: 'AUTH_NOT_CONFIGURED',
      message: 'The authentication service is not configured.',
    },
    { status: 503 },
  );
}

export async function proxyAuthPost(request: NextRequest, path: string) {
  const url = upstreamUrl(path);
  if (!url) return unavailable();

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const headers = new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    });
    const cookie = request.headers.get('cookie');
    const csrfToken = request.headers.get('x-csrf-token');
    if (cookie) headers.set('Cookie', cookie);
    if (csrfToken) headers.set('X-CSRF-Token', csrfToken);

    const upstream = await fetch(url, {
      method: 'POST',
      cache: 'no-store',
      redirect: 'manual',
      headers,
      body: await request.text(),
      signal: controller.signal,
    });
    const responseHeaders = new Headers({
      'Cache-Control': 'no-store',
      'Content-Type':
        upstream.headers.get('content-type') ?? 'application/json',
    });
    const setCookie = upstream.headers.get('set-cookie');
    if (setCookie) responseHeaders.set('Set-Cookie', setCookie);

    return new Response(await upstream.text(), {
      status: upstream.status,
      headers: responseHeaders,
    });
  } catch (error) {
    const timedOut =
      error instanceof DOMException && error.name === 'AbortError';
    return NextResponse.json(
      {
        code: timedOut ? 'AUTH_TIMEOUT' : 'AUTH_UPSTREAM_ERROR',
        message: timedOut
          ? 'The authentication service took too long to respond.'
          : 'The authentication service is temporarily unavailable.',
      },
      { status: 502 },
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
  const url = upstreamUrl(`/v1/auth/oauth/${provider}/authorize`);
  if (!url) return unavailable();
  url.searchParams.set('intent', intent);
  url.searchParams.set('return_to', returnTo);
  return NextResponse.redirect(url, 307);
}
