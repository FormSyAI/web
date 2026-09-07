import assert from 'node:assert/strict';
import { createServer } from 'vite';
const server = await createServer({
  // Keep SSR test optimization separate from the running preview.
  cacheDir: 'node_modules/.vite-console-check',
  server: { middlewareMode: true },
  optimizeDeps: { noDiscovery: true, entries: [] },
});
try {
  const {
    freshState,
    transact,
    quota,
    models,
    plans,
    WINDOW_MS,
    MONTH_MS,
    cost,
  } = await server.ssrLoadModule('/lib/console/domain.ts');
  const now = Date.UTC(2026, 8, 7, 12);
  const expectError = (fn, code) =>
    assert.throws(fn, (error) => error.code === code);
  let s = freshState();
  s = transact(
    s,
    { type: 'order', kind: 'subscription', plan: 'starter' },
    now,
  );
  const id = s.orders[0].id;
  s = transact(s, { type: 'pay', id, result: 'paid' }, now);
  assert.equal(s.subscription.plan, 'starter');
  assert.deepEqual(
    transact(s, { type: 'pay', id, result: 'paid' }, now),
    s,
    'duplicate payment must not reset benefits',
  );
  s = transact(s, { type: 'order', kind: 'topup', cents: 1000 }, now);
  s = transact(s, { type: 'pay', id: s.orders[0].id, result: 'paid' }, now);
  assert.equal(s.cash, 1000);
  for (const funding of ['plan', 'api'])
    s = transact(
      s,
      {
        type: 'key',
        name: funding,
        funding,
        models: models.map((m) => m.id),
        days: 30,
      },
      now,
    );
  const api = s.keys.find((k) => k.funding === 'api'),
    plan = s.keys.find((k) => k.funding === 'plan');
  const initialCash = s.cash;
  s = transact(
    s,
    { type: 'request', keyId: plan.id, model: models[0].id, requestId: 'p1' },
    now,
  );
  assert.equal(s.cash, initialCash, 'plan call must not consume cash');
  const used = s.subscription.used;
  s = transact(
    s,
    { type: 'request', keyId: api.id, model: models[0].id, requestId: 'a1' },
    now,
  );
  assert.equal(
    s.subscription.used,
    used,
    'API call must not consume plan quota',
  );
  assert(s.cash < initialCash);
  assert.deepEqual(
    transact(
      s,
      { type: 'request', keyId: api.id, model: models[0].id, requestId: 'a1' },
      now,
    ),
    s,
    'duplicate usage must not charge twice',
  );
  const beforeFailure = s.cash;
  s = transact(
    s,
    {
      type: 'request',
      keyId: api.id,
      model: models[0].id,
      requestId: 'f1',
      fail: true,
    },
    now,
  );
  assert.equal(s.cash, beforeFailure);
  expectError(
    () =>
      transact(
        s,
        {
          type: 'request',
          keyId: plan.id,
          model: models[1].id,
          requestId: 'unauthorized',
        },
        now,
      ),
    'MODEL_NOT_ALLOWED',
  );
  const exhausted = structuredClone(s);
  exhausted.subscription.used = plans.starter.points;
  expectError(
    () =>
      transact(
        exhausted,
        {
          type: 'request',
          keyId: plan.id,
          model: models[0].id,
          requestId: 'q1',
        },
        now,
      ),
    'QUOTA_EXHAUSTED',
  );
  assert.equal(exhausted.cash, s.cash, 'no automatic fallback');
  const short = structuredClone(s);
  short.subscription.windowUsed = plans.starter.window;
  expectError(
    () =>
      transact(
        short,
        {
          type: 'request',
          keyId: plan.id,
          model: models[0].id,
          requestId: 'w1',
        },
        now,
      ),
    'QUOTA_EXHAUSTED',
  );
  const refreshed = transact(
    short,
    { type: 'request', keyId: plan.id, model: models[0].id, requestId: 'w2' },
    now + WINDOW_MS + 1,
  );
  assert(refreshed.subscription.windowUsed < plans.starter.window);
  assert.equal(quota(s, now + MONTH_MS).active, false);
  const zero = structuredClone(s);
  zero.cash = 0;
  expectError(
    () =>
      transact(
        zero,
        {
          type: 'request',
          keyId: api.id,
          model: models[0].id,
          requestId: 'empty',
        },
        now,
      ),
    'BALANCE_INSUFFICIENT',
  );
  let upgrade = transact(
    s,
    { type: 'order', kind: 'upgrade', plan: 'pro' },
    now + MONTH_MS / 2,
  );
  assert.equal(upgrade.orders[0].cents, 5000);
  const end = s.subscription.end;
  upgrade = transact(
    upgrade,
    { type: 'pay', id: upgrade.orders[0].id, result: 'paid' },
    now + MONTH_MS / 2,
  );
  assert.equal(upgrade.subscription.end, end);
  assert.equal(upgrade.subscription.used, used);
  assert.equal(upgrade.subscription.limit, 25000);
  const revoked = transact(
    s,
    { type: 'key-status', id: api.id, status: 'revoked' },
    now,
  );
  expectError(
    () =>
      transact(
        revoked,
        {
          type: 'request',
          keyId: api.id,
          model: models[0].id,
          requestId: 'revoked',
        },
        now,
      ),
    'KEY_REVOKED',
  );
  expectError(
    () =>
      transact(
        revoked,
        { type: 'key-status', id: api.id, status: 'active' },
        now,
      ),
    'KEY_REVOKED',
  );
  assert.deepEqual(cost(models[0], 1800, 600, 700), { points: 35, cents: 4 });
  assert.equal(
    s.cash,
    s.ledger.reduce((sum, row) => sum + row.cents, 0),
    'wallet must reconcile to ledger',
  );
  let limited = transact(
    s,
    {
      type: 'key',
      name: 'Budget check',
      funding: 'api',
      models: [models[0].id],
      days: 30,
      budget: 4,
    },
    now,
  );
  const limitedId = limited.keys[0].id;
  limited = transact(
    limited,
    {
      type: 'request',
      keyId: limitedId,
      model: models[0].id,
      requestId: 'budget-one',
    },
    now,
  );
  expectError(
    () =>
      transact(
        limited,
        {
          type: 'request',
          keyId: limitedId,
          model: models[0].id,
          requestId: 'budget-two',
        },
        now,
      ),
    'KEY_BUDGET_EXHAUSTED',
  );
  const rotated = transact(limited, { type: 'rotate', id: limitedId }, now);
  assert.equal(rotated.keys[0].budgetUsed, 4);
  assert.equal(rotated.keys.find((k) => k.id === limitedId).status, 'revoked');
  expectError(
    () =>
      transact(
        rotated,
        {
          type: 'request',
          keyId: rotated.keys[0].id,
          model: models[0].id,
          requestId: 'budget-rotate',
        },
        now,
      ),
    'KEY_BUDGET_EXHAUSTED',
  );
  console.log(
    'Console domain passed: billing isolation, duplicate events, failure charging, quotas, cycle reset, prorated upgrade, key revocation and ledger reconciliation.',
  );
} finally {
  await server.close();
}
