/** Contract for the future authenticated service. No fallback to demo data. */
import type { ConsoleKey, Funding, Order, Subscription, Usage } from './domain';
export class ConsoleServiceError extends Error {
  constructor(
    public code: string,
    public status: number,
    message: string,
  ) {
    super(message);
  }
}
const base = import.meta.env.VITE_AURINOVA_CONSOLE_API_BASE_URL?.trim();
export const isConsoleConfigured = Boolean(
  base && import.meta.env.VITE_AURINOVA_CONSOLE_ENABLED === 'true',
);
export async function consoleRequest<T>(
  path: string,
  options: {
    method?: 'GET' | 'POST';
    body?: unknown;
    idempotencyKey?: string;
    signal?: AbortSignal;
  } = {},
): Promise<T> {
  if (!isConsoleConfigured)
    throw new ConsoleServiceError(
      'SERVICE_UNAVAILABLE',
      503,
      'Console service is not configured.',
    );
  const response = await fetch(
    `${base!.replace(/\/$/, '')}/${path.replace(/^\//, '')}`,
    {
      method: options.method ?? 'GET',
      credentials: 'include',
      cache: 'no-store',
      signal: options.signal ?? AbortSignal.timeout(12000),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-AURINOVA-Console-Request': 'console-ui-v1',
        ...(options.idempotencyKey
          ? { 'Idempotency-Key': options.idempotencyKey }
          : {}),
      },
      ...(options.body ? { body: JSON.stringify(options.body) } : {}),
    },
  );
  const data = await response.json();
  if (!response.ok)
    throw new ConsoleServiceError(
      data.code ?? 'REQUEST_FAILED',
      response.status,
      data.message ?? 'Request failed.',
    );
  return data as T;
}
export function workspaceApi(workspaceId: string) {
  const root = `/api/console/workspaces/${encodeURIComponent(workspaceId)}`;
  return {
    usage: (query = '') =>
      consoleRequest<{
        items: Usage[];
        updatedAt: string;
        nextCursor: string | null;
      }>(`${root}/usage/requests${query ? `?${query}` : ''}`),
    keys: () => consoleRequest<ConsoleKey[]>(`${root}/keys`),
    createKey: (
      body: {
        name: string;
        funding: Funding;
        models: string[];
        days: number;
        budget?: number;
      },
      idempotencyKey: string,
    ) =>
      consoleRequest<{ key: ConsoleKey; secret: string }>(`${root}/keys`, {
        method: 'POST',
        body,
        idempotencyKey,
      }),
    revokeKey: (id: string) =>
      consoleRequest(`${root}/keys/${encodeURIComponent(id)}/revoke`, {
        method: 'POST',
      }),
    subscription: () =>
      consoleRequest<Subscription | null>(`${root}/subscription`),
    orders: () => consoleRequest<Order[]>(`${root}/orders`),
    createOrder: (
      body: { kind: string; plan?: string; cents?: number },
      idempotencyKey: string,
    ) =>
      consoleRequest<Order>(`${root}/orders`, {
        method: 'POST',
        body,
        idempotencyKey,
      }),
    wallet: () =>
      consoleRequest<{
        cash: number;
        granted: number;
        reserved: number;
        currency: string;
      }>(`${root}/wallet`),
    summary: () => consoleRequest(`${root}/usage/summary`),
    models: () => consoleRequest(`${root}/models`),
    plans: () => consoleRequest(`${root}/plans`),
    ledger: () => consoleRequest(`${root}/wallet/ledger`),
    profile: () => consoleRequest(`${root}/profile`),
    updateProfile: (body: {
      name: string;
      timezone: string;
      notifications: boolean;
    }) => consoleRequest(`${root}/profile`, { method: 'POST', body }),
    setKeyStatus: (id: string, status: 'active' | 'paused') =>
      consoleRequest(`${root}/keys/${encodeURIComponent(id)}/status`, {
        method: 'POST',
        body: { status },
      }),
    rotateKey: (id: string, idempotencyKey: string) =>
      consoleRequest<{ key: ConsoleKey; secret: string }>(
        `${root}/keys/${encodeURIComponent(id)}/rotate`,
        { method: 'POST', idempotencyKey },
      ),
    diagnose: (
      body: { keyId: string; model: string },
      idempotencyKey: string,
    ) =>
      consoleRequest(`${root}/diagnostics`, {
        method: 'POST',
        body,
        idempotencyKey,
      }),
    cancelRenewal: () =>
      consoleRequest(`${root}/subscription/cancel-renewal`, { method: 'POST' }),
  };
}
