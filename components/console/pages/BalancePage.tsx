import { Button, Input } from '@/components/console/primitives';
import { AppLink as Link } from '@/components/runtime/app-link';
import { ArrowRight, Wallet } from 'lucide-react';
import { useState } from 'react';

import {
  date,
  demoRoot,
  Field,
  Metric,
  money,
  type PageProps,
} from '@/components/console/content';
export function BalancePage({ state, t, act, setModal }: PageProps) {
  const [amount, setAmount] = useState('100');
  return (
    <>
      <div className="cs-callout">
        <Wallet size={18} />
        {t(
          '支付服务尚未接入，当前充值不会产生扣款。',
          'Payment services are not connected, so current top-ups do not create charges.',
        )}
      </div>
      <div className="cs-metrics">
        <Metric
          label={t('可用余额', 'Available balance')}
          value={money(state.cash)}
          hint="CNY"
        />
        <Metric
          label={t('赠送余额', 'Granted balance')}
          value="¥0.00"
          hint={t('当前无赠送额度', 'No granted balance')}
        />
        <Metric
          label={t('冻结金额', 'Reserved amount')}
          value="¥0.00"
          hint={t(
            '真实并发预留由后端实现',
            'Live concurrent reservations require the backend',
          )}
        />
      </div>
      <section className="cs-card">
        <h2>{t('余额充值', 'Add balance')}</h2>
        <p className="cs-muted">
          {t(
            'API 余额用于按量 Key，与 Coding Plan 分别管理。',
            'API balance funds metered keys, separately from Coding Plan.',
          )}
        </p>
        <div className="cs-inline-actions">
          {['10', '50', '100', '500'].map((v) => (
            <Button
              key={v}
              className={`cs-button ${amount === v ? 'selected' : ''}`}
              onClick={() => setAmount(v)}
            >
              ¥{v}
            </Button>
          ))}
        </div>
        <Field label={t('自定义金额（CNY）', 'Custom amount (CNY)')}>
          <Input
            type="number"
            min="10"
            max="1000"
            step="1"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </Field>
        <Button
          className="cs-button primary"
          onClick={() => {
            const next = act({
              type: 'order',
              kind: 'topup',
              cents: Math.round(Number(amount) * 100),
            });
            if (next) setModal({ kind: 'order', id: next.orders[0].id });
          }}
        >
          {t('创建充值订单', 'Create top-up order')}
          <ArrowRight size={16} />
        </Button>
      </section>
      <section className="cs-card cs-table-card">
        <div className="cs-card-heading">
          <h2>{t('余额流水', 'Balance transactions')}</h2>
          <Link href={`${demoRoot}/billing/orders`}>
            {t('订单与账单', 'Orders & billing')}
          </Link>
        </div>
        <div className="cs-table-scroll">
          <table>
            <thead>
              <tr>
                {[
                  t('时间', 'Time'),
                  t('类型', 'Type'),
                  t('金额', 'Amount'),
                  t('关联记录', 'Reference'),
                ].map((v) => (
                  <th key={v}>{v}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {state.ledger.slice(0, 30).map((l) => (
                <tr key={l.id}>
                  <td>{date(l.time, state.profile.timezone)}</td>
                  <td>
                    {l.kind === 'topup'
                      ? t('充值', 'Top-up')
                      : t('API 消费', 'API usage')}
                  </td>
                  <td className={l.cents > 0 ? 'cs-success' : ''}>
                    {l.cents > 0 ? '+' : ''}
                    {money(l.cents)}
                  </td>
                  <td className="cs-mono">
                    {(l.orderId ?? l.requestId)?.slice(0, 12)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!state.ledger.length && (
          <p className="cs-table-empty">{t('暂无流水', 'No transactions')}</p>
        )}
      </section>
    </>
  );
}
