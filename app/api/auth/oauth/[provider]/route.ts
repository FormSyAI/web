import { NextResponse, type NextRequest } from 'next/server';

import { authOAuthRedirect } from '@/lib/auth/server';
import { normalizeAuthReturnTo } from '@/lib/auth/redirect';

const providers = ['google', 'github', 'linkedin'] as const;

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ provider: string }> },
) {
  const { provider } = await context.params;
  if (!providers.includes(provider as (typeof providers)[number])) {
    return NextResponse.json(
      { code: 'AUTH_PROVIDER_UNSUPPORTED', message: 'Unsupported provider.' },
      { status: 404 },
    );
  }

  const intent =
    request.nextUrl.searchParams.get('intent') === 'signup'
      ? 'signup'
      : 'login';
  const returnTo = normalizeAuthReturnTo(
    request.nextUrl.searchParams.get('return_to'),
  );

  return authOAuthRedirect({
    intent,
    provider: provider as (typeof providers)[number],
    returnTo,
  });
}
