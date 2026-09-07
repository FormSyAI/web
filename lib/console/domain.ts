import { modelCatalog } from '../../content/model-catalog';
/** Local demonstration only. Amounts and quotas are illustrative, never saleable. */
export type Funding = 'plan' | 'api';
export type PlanId = 'starter' | 'pro';
export type KeyStatus = 'active' | 'paused' | 'revoked';
export type ConsoleKey = {
  id: string;
  name: string;
  tail: string;
  funding: Funding;
  models: string[];
  status: KeyStatus;
  createdAt: string;
  expiresAt: string | null;
  lastUsed: string | null;
  budget?: number | null;
  budgetUsed?: number;
};
export type Model = {
  id: string;
  name: string;
  logo: string;
  source: string;
  kind: string;
  context: number;
  input: number;
  cached: number;
  output: number;
  pro: boolean;
};
export const models: Model[] = modelCatalog;
export const plans = {
  starter: {
    name: 'Starter',
    cents: 4900,
    points: 10000,
    window: 2500,
    concurrency: 2,
  },
  pro: {
    name: 'Pro',
    cents: 14900,
    points: 40000,
    window: 10000,
    concurrency: 5,
  },
} as const;
export type Subscription = {
  plan: PlanId;
  start: string;
  end: string;
  used: number;
  limit?: number;
  windowStart: string;
  windowUsed: number;
  renew: boolean;
  nextPlan: PlanId | null;
};
export type Usage = {
  id: string;
  time: string;
  keyId: string;
  model: string;
  funding: Funding;
  input: number;
  cached: number;
  output: number;
  points: number;
  cents: number;
  status: 'success' | 'failed';
  latency: number;
};
export type Order = {
  id: string;
  time: string;
  kind: 'subscription' | 'upgrade' | 'renewal' | 'topup';
  plan?: PlanId;
  cents: number;
  status: 'pending' | 'paid' | 'failed' | 'cancelled';
  processedAt?: string;
};
export type Ledger = {
  id: string;
  time: string;
  orderId?: string;
  requestId?: string;
  cents: number;
  kind: 'topup' | 'usage';
};
export type ConsoleState = {
  version: 1;
  keys: ConsoleKey[];
  subscription: Subscription | null;
  cash: number;
  usage: Usage[];
  orders: Order[];
  ledger: Ledger[];
  profile: { name: string; timezone: string; notifications: boolean };
  events: { time: string; action: string }[];
};
export const WINDOW_MS = 5 * 3600 * 1000;
export const MONTH_MS = 30 * 24 * 3600 * 1000; // Explicitly a 30-day demo cycle.
const uid = () => crypto.randomUUID();
const iso = (n: number) => new Date(n).toISOString();
export function freshState(): ConsoleState {
  return {
    version: 1,
    keys: [],
    subscription: null,
    cash: 0,
    usage: [],
    orders: [],
    ledger: [],
    profile: {
      name: 'Demo workspace',
      timezone: 'Asia/Shanghai',
      notifications: true,
    },
    events: [],
  };
}
export function cost(
  model: Model,
  input: number,
  cached: number,
  output: number,
) {
  const points = Math.ceil(
    ((input - cached) * model.input +
      cached * model.cached +
      output * model.output) /
      100,
  );
  return { points, cents: Math.ceil(points / 10) };
}
export function quota(s: ConsoleState, now = Date.now()) {
  const sub = s.subscription;
  if (!sub)
    return { active: false, remaining: 0, windowRemaining: 0, reset: null };
  const plan = plans[sub.plan];
  const start = new Date(sub.windowStart).getTime();
  const elapsed = Math.max(0, Math.floor((now - start) / WINDOW_MS));
  return {
    active: now < Date.parse(sub.end),
    remaining: Math.max(0, (sub.limit ?? plan.points) - sub.used),
    windowRemaining: Math.max(0, plan.window - (elapsed ? 0 : sub.windowUsed)),
    reset: iso(start + (elapsed + 1) * WINDOW_MS),
  };
}
export type Action =
  | { type: 'order'; kind: Order['kind']; plan?: PlanId; cents?: number }
  | { type: 'pay'; id: string; result: 'paid' | 'failed' | 'cancelled' }
  | { type: 'renew'; enabled: boolean }
  | { type: 'downgrade'; plan: PlanId }
  | {
      type: 'key';
      name: string;
      funding: Funding;
      models: string[];
      days: number;
      budget?: number | null;
    }
  | { type: 'rotate'; id: string }
  | { type: 'key-status'; id: string; status: KeyStatus }
  | {
      type: 'request';
      keyId: string;
      model: string;
      fail?: boolean;
      requestId: string;
    }
  | { type: 'profile'; name: string; timezone: string; notifications: boolean };
export class ConsoleError extends Error {
  constructor(public code: string) {
    super(code);
  }
}
export function transact(
  current: ConsoleState,
  action: Action,
  now = Date.now(),
): ConsoleState {
  const s = structuredClone(current);
  const time = iso(now);
  const assert = (ok: unknown, code: string) => {
    if (!ok) throw new ConsoleError(code);
  };
  switch (action.type) {
    case 'order': {
      let cents = 0;
      if (action.kind === 'topup') {
        cents = action.cents ?? 0;
        assert(
          Number.isInteger(cents) && cents >= 1000 && cents <= 100000,
          'INVALID_AMOUNT',
        );
      } else {
        assert(action.plan && action.plan in plans, 'INVALID_PLAN');
        const selected = plans[action.plan!];
        cents = selected.cents;
        const active = quota(s, now).active;
        if (action.kind === 'subscription')
          assert(!active, 'PLAN_ALREADY_ACTIVE');
        if (action.kind === 'renewal')
          assert(s.subscription && !active, 'PLAN_STILL_ACTIVE');
        if (action.kind === 'upgrade') {
          assert(
            active &&
              s.subscription?.plan === 'starter' &&
              action.plan === 'pro',
            'INVALID_UPGRADE',
          );
          const fraction = Math.min(
            1,
            Math.max(0, (Date.parse(s.subscription!.end) - now) / MONTH_MS),
          );
          cents = Math.ceil((selected.cents - plans.starter.cents) * fraction);
        }
      }
      s.orders.unshift({
        id: uid(),
        time,
        kind: action.kind,
        plan: action.plan,
        cents,
        status: 'pending',
      });
      break;
    }
    case 'pay': {
      const order = s.orders.find((o) => o.id === action.id);
      assert(order, 'ORDER_NOT_FOUND');
      if (order!.status === 'paid') return current; // duplicate callback is idempotent
      assert(order!.status === 'pending', 'ORDER_CLOSED');
      order!.status = action.result;
      if (action.result !== 'paid') break;
      order!.processedAt = time;
      if (order!.kind === 'topup') {
        s.cash += order!.cents;
        s.ledger.unshift({
          id: uid(),
          time,
          orderId: order!.id,
          cents: order!.cents,
          kind: 'topup',
        });
      } else if (order!.kind === 'upgrade') {
        assert(
          quota(s, now).active && s.subscription?.plan === 'starter',
          'INVALID_UPGRADE',
        );
        // No reset of used credits or cycle on upgrade. Prorated extra quota tracked below.
        const sub = s.subscription!;
        const fraction = Math.min(
          1,
          Math.max(0, (Date.parse(sub.end) - now) / MONTH_MS),
        );
        sub.limit =
          (sub.limit ?? plans.starter.points) +
          Math.floor((plans.pro.points - plans.starter.points) * fraction);
        sub.plan = 'pro';
        sub.nextPlan = null;
      } else {
        assert(!quota(s, now).active, 'PLAN_ALREADY_ACTIVE');
        s.subscription = {
          plan: order!.plan!,
          start: time,
          end: iso(now + MONTH_MS),
          used: 0,
          windowStart: time,
          windowUsed: 0,
          renew: false,
          nextPlan: null,
        };
      }
      break;
    }
    case 'renew':
      assert(s.subscription, 'NO_PLAN');
      s.subscription!.renew = action.enabled;
      break;
    case 'downgrade':
      assert(
        s.subscription?.plan === 'pro' &&
          quota(s, now).active &&
          action.plan === 'starter',
        'INVALID_PLAN',
      );
      s.subscription!.nextPlan = action.plan;
      break;
    case 'key': {
      assert(
        action.name.trim().length > 0 && action.name.trim().length <= 48,
        'INVALID_NAME',
      );
      assert(
        action.models.length &&
          action.models.every((id) => models.some((m) => m.id === id)),
        'INVALID_MODEL',
      );
      assert(
        s.keys.filter((k) => k.status !== 'revoked').length < 10,
        'KEY_LIMIT',
      );
      if (action.funding === 'plan')
        assert(quota(s, now).active, 'PLAN_REQUIRED');
      assert([7, 30, 90].includes(action.days), 'INVALID_EXPIRY');
      assert(
        action.budget == null ||
          (Number.isInteger(action.budget) && action.budget > 0),
        'INVALID_BUDGET',
      );
      s.keys.unshift({
        id: uid(),
        name: action.name.trim(),
        tail: uid().slice(-6),
        funding: action.funding,
        models: action.models,
        status: 'active',
        createdAt: time,
        expiresAt: iso(now + action.days * 86400000),
        lastUsed: null,
        budget: action.budget ?? null,
        budgetUsed: 0,
      });
      break;
    }
    case 'rotate': {
      const key = s.keys.find((k) => k.id === action.id);
      assert(key && key.status !== 'revoked', 'KEY_REVOKED');
      assert(
        !key!.expiresAt || now < Date.parse(key!.expiresAt),
        'KEY_EXPIRED',
      );
      const replacement = {
        ...key!,
        id: uid(),
        tail: uid().slice(-6),
        createdAt: time,
        lastUsed: null,
      };
      key!.status = 'revoked';
      s.keys.unshift(replacement);
      break;
    }
    case 'key-status': {
      const key = s.keys.find((k) => k.id === action.id);
      assert(key, 'KEY_NOT_FOUND');
      assert(key!.status !== 'revoked', 'KEY_REVOKED');
      key!.status = action.status;
      break;
    }
    case 'request': {
      if (s.usage.some((u) => u.id === action.requestId)) return current;
      const key = s.keys.find((k) => k.id === action.keyId);
      assert(key, 'KEY_NOT_FOUND');
      assert(
        key!.status === 'active',
        key!.status === 'revoked' ? 'KEY_REVOKED' : 'KEY_PAUSED',
      );
      assert(
        !key!.expiresAt || now < Date.parse(key!.expiresAt),
        'KEY_EXPIRED',
      );
      const model = models.find((m) => m.id === action.model);
      assert(model && key!.models.includes(action.model), 'MODEL_NOT_ALLOWED');
      const input = 1800,
        cached = 600,
        output = 700;
      const charge = cost(model!, input, cached, output);
      const consumption =
        key!.funding === 'plan' ? charge.points : charge.cents;
      assert(
        key!.budget == null ||
          (key!.budgetUsed ?? 0) + consumption <= key!.budget,
        'KEY_BUDGET_EXHAUSTED',
      );
      if (key!.funding === 'plan') {
        const q = quota(s, now);
        assert(q.active, 'PLAN_EXPIRED');
        assert(
          !model!.pro || s.subscription!.plan === 'pro',
          'MODEL_NOT_ALLOWED',
        );
        assert(
          q.remaining >= charge.points && q.windowRemaining >= charge.points,
          'QUOTA_EXHAUSTED',
        );
        if (!action.fail) {
          const sub = s.subscription!;
          const elapsed = Math.floor(
            (now - Date.parse(sub.windowStart)) / WINDOW_MS,
          );
          if (elapsed > 0) {
            sub.windowStart = iso(
              Date.parse(sub.windowStart) + elapsed * WINDOW_MS,
            );
            sub.windowUsed = 0;
          }
          sub.used += charge.points;
          sub.windowUsed += charge.points;
        }
      } else {
        assert(s.cash >= charge.cents, 'BALANCE_INSUFFICIENT');
        if (!action.fail) {
          s.cash -= charge.cents;
          s.ledger.unshift({
            id: uid(),
            time,
            requestId: action.requestId,
            cents: -charge.cents,
            kind: 'usage',
          });
        }
      }
      if (!action.fail) key!.budgetUsed = (key!.budgetUsed ?? 0) + consumption;
      key!.lastUsed = time;
      s.usage.unshift({
        id: action.requestId,
        time,
        keyId: key!.id,
        model: model!.id,
        funding: key!.funding,
        input: action.fail ? 0 : input,
        cached: action.fail ? 0 : cached,
        output: action.fail ? 0 : output,
        points: !action.fail && key!.funding === 'plan' ? charge.points : 0,
        cents: !action.fail && key!.funding === 'api' ? charge.cents : 0,
        status: action.fail ? 'failed' : 'success',
        latency: action.fail ? 0 : 842,
      });
      break;
    }
    case 'profile':
      assert(
        action.name.trim().length > 0 && action.name.length <= 48,
        'INVALID_NAME',
      );
      s.profile = {
        name: action.name.trim(),
        timezone: action.timezone,
        notifications: action.notifications,
      };
      break;
  }
  s.events.unshift({ time, action: action.type });
  return s;
}
export function sampleState(now = Date.now()): ConsoleState {
  let s = freshState();
  const start = now - 6 * 86400000;
  s = transact(s, { type: 'order', kind: 'subscription', plan: 'pro' }, start);
  s = transact(s, { type: 'pay', id: s.orders[0].id, result: 'paid' }, start);
  s = transact(s, { type: 'order', kind: 'topup', cents: 10000 }, start);
  s = transact(s, { type: 'pay', id: s.orders[0].id, result: 'paid' }, start);
  for (const funding of ['plan', 'api'] as const)
    s = transact(
      s,
      {
        type: 'key',
        name: funding === 'plan' ? 'Local coding' : 'API sandbox',
        funding,
        models: models.map((m) => m.id),
        days: 30,
      },
      start,
    );
  for (let i = 0; i < 42; i++)
    s = transact(
      s,
      {
        type: 'request',
        keyId: s.keys[i % 2].id,
        model: models[i % 3 ? 0 : 1].id,
        fail: i % 13 === 0,
        requestId: uid(),
      },
      start + i * ((5 * 86400000) / 42),
    );
  return s;
}
