import type { NextRequest } from 'next/server';

import { proxyAuthPost } from '@/lib/auth/server';

export function POST(request: NextRequest) {
  return proxyAuthPost(request, '/v1/auth/signup/prepare');
}
