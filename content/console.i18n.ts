export const consoleNavigation = [
  { path: 'usage', zh: '用量信息', en: 'Usage', icon: 'chart' },
  { path: 'coding-plan', zh: 'Coding Plan', en: 'Coding Plan', icon: 'code' },
  { path: 'models', zh: '模型', en: 'Models', icon: 'models' },
  { path: 'api-keys', zh: 'API Keys', en: 'API Keys', icon: 'key' },
  {
    path: 'integrations',
    zh: '工具接入',
    en: 'Integrations',
    icon: 'terminal',
  },
  { path: 'billing/balance', zh: '余额与充值', en: 'Balance', icon: 'wallet' },
  {
    path: 'billing/orders',
    zh: '订单与账单',
    en: 'Orders & billing',
    icon: 'receipt',
  },
  { path: 'settings', zh: '账号设置', en: 'Settings', icon: 'settings' },
] as const;
export const consoleErrors: Record<string, [string, string]> = {
  INVALID_BUDGET: ['预算须为正整数。', 'Budget must be a positive integer.'],
  KEY_BUDGET_EXHAUSTED: [
    '该 Key 的子预算已耗尽。',
    'This key has reached its budget limit.',
  ],
  INVALID_AMOUNT: [
    '充值金额范围为 ¥10–1,000。',
    'Top-ups range from ¥10 to ¥1,000.',
  ],
  INVALID_NAME: [
    '请输入 1–48 个字符的名称。',
    'Enter a name of 1–48 characters.',
  ],
  INVALID_PLAN: [
    '当前无法进行此套餐操作。',
    'This plan change is unavailable.',
  ],
  PLAN_ALREADY_ACTIVE: [
    '已有生效套餐，请使用升级或续费入口。',
    'A plan is already active. Use upgrade or renewal.',
  ],
  PLAN_STILL_ACTIVE: [
    '当前套餐尚未到期。',
    'Your current plan has not expired.',
  ],
  INVALID_UPGRADE: [
    '套餐状态已变化，请重新选择升级方案。',
    'The plan changed. Please select an upgrade again.',
  ],
  ORDER_NOT_FOUND: ['订单不存在。', 'Order not found.'],
  ORDER_CLOSED: [
    '订单已关闭，请重新创建。',
    'This order is closed. Create a new order.',
  ],
  NO_PLAN: ['尚未开通套餐。', 'No active subscription.'],
  PLAN_REQUIRED: ['请先开通套餐。', 'Activate a plan first.'],
  INVALID_MODEL: ['请选择至少一个模型。', 'Select at least one model.'],
  MODEL_NOT_ALLOWED: [
    'Key 或当前套餐未授权此模型。',
    'This key or plan does not allow this model.',
  ],
  KEY_LIMIT: [
    '最多保留 10 个可用 Key。',
    'Up to 10 non-revoked keys are allowed.',
  ],
  KEY_NOT_FOUND: ['请选择有效 Key。', 'Select a valid key.'],
  KEY_REVOKED: ['Key 已撤销，无法恢复。', 'This key has been revoked.'],
  KEY_PAUSED: ['Key 已停用，请先恢复。', 'This key is paused.'],
  KEY_EXPIRED: ['Key 已过期。', 'This key has expired.'],
  INVALID_EXPIRY: ['请选择有效期。', 'Select an expiry period.'],
  PLAN_EXPIRED: ['套餐未开通或已到期。', 'Your plan is missing or expired.'],
  QUOTA_EXHAUSTED: [
    '额度已耗尽，请等待重置或升级。不会自动扣除 API 余额。',
    'Quota exhausted. Wait for reset or upgrade. API balance is never charged automatically.',
  ],
  BALANCE_INSUFFICIENT: [
    'API 余额不足，请充值。套餐额度不会抵扣此调用。',
    'Insufficient API balance. Plan credits do not cover this call.',
  ],
};
