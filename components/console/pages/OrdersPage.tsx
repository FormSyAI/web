import { Button, downloadCsv, Select } from '@/components/console/primitives';
import { Download } from 'lucide-react';
import { useState } from 'react';

import {
  Badge,
  date,
  Empty,
  Field,
  money,
  type PageProps,
} from '@/components/console/content';
export function OrdersPage({ state, t, setModal }: PageProps) {
  const [filter, setFilter] = useState('all');
  const rows = state.orders.filter(
    (o) => filter === 'all' || o.status === filter,
  );
  return (
    <>
      <div className="cs-toolbar">
        <Field label={t('订单状态', 'Order status')}>
          <Select value={filter} onValueChange={(value) => setFilter(value)}>
            {[
              ['all', t('全部', 'All')],
              ['pending', t('待处理', 'Pending')],
              ['paid', t('已完成', 'Paid')],
              ['failed', t('失败', 'Failed')],
              ['cancelled', t('已取消', 'Cancelled')],
            ].map(([id, label]) => (
              <option key={id} value={id}>
                {label}
              </option>
            ))}
          </Select>
        </Field>
        <Button
          className="cs-button"
          disabled={!rows.length}
          onClick={() =>
            downloadCsv('formsy-orders.csv', [
              ['ID', 'Time', 'Timezone', 'Type', 'CNY', 'Status'],
              ...rows.map((o) => [
                o.id,
                date(o.time, state.profile.timezone),
                state.profile.timezone,
                o.kind,
                (o.cents / 100).toFixed(2),
                o.status,
              ]),
            ])
          }
        >
          <Download size={16} />
          {t('导出订单', 'Export orders')}
        </Button>
      </div>
      <section className="cs-card cs-table-card">
        <div className="cs-table-scroll">
          <table>
            <thead>
              <tr>
                {[
                  t('订单', 'Order'),
                  t('时间', 'Time'),
                  t('金额', 'Amount'),
                  t('状态', 'Status'),
                  '',
                ].map((v, i) => (
                  <th key={i}>{v}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((o) => (
                <tr key={o.id}>
                  <td>
                    {o.kind === 'topup'
                      ? t('API 充值', 'API top-up')
                      : `Coding Plan · ${o.plan ?? ''}`}
                    <small className="cs-mono">{o.id.slice(0, 12)}</small>
                  </td>
                  <td>{date(o.time, state.profile.timezone)}</td>
                  <td>{money(o.cents)}</td>
                  <td>
                    <Badge
                      tone={
                        o.status === 'paid'
                          ? 'success'
                          : o.status === 'failed'
                            ? 'danger'
                            : ''
                      }
                    >
                      {o.status === 'paid'
                        ? t('已完成', 'Paid')
                        : o.status === 'pending'
                          ? t('待处理', 'Pending')
                          : o.status === 'failed'
                            ? t('失败', 'Failed')
                            : t('已取消', 'Cancelled')}
                    </Badge>
                  </td>
                  <td>
                    <Button
                      className="cs-text-button"
                      onClick={() => setModal({ kind: 'order', id: o.id })}
                    >
                      {t('查看详情', 'View details')}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!rows.length && (
          <Empty
            title={t('暂无订单', 'No orders')}
            detail={t(
              '开通套餐或充值后，订单会出现在这里。',
              'Plans and top-ups appear here after checkout.',
            )}
          />
        )}
      </section>
      <p className="cs-muted">
        {t(
          '消费明细可在用量信息中导出。',
          'Export consumption details from Usage.',
        )}
      </p>
    </>
  );
}
