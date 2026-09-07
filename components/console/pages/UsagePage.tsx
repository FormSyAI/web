import { Button, downloadCsv, Select } from '@/components/console/primitives';
import { AppLink as Link } from '@/components/runtime/app-link';
import { models, plans, quota, type Funding } from '@/lib/console/domain';
import {
  ArrowUpRight,
  Check,
  ChevronRight,
  Code2,
  Download,
  Wallet,
} from 'lucide-react';
import { useState } from 'react';

import {
  Badge,
  date,
  demoRoot,
  Empty,
  Field,
  keyName,
  Metric,
  modelName,
  money,
  number,
  sourceName,
  useClock,
  type PageProps,
} from '@/components/console/content';
export function UsagePage({ state, t, setModal }: PageProps) {
  const now = useClock();
  const [funding, setFunding] = useState<Funding>('plan');
  const [range, setRange] = useState('7');
  const [model, setModel] = useState('');
  const [key, setKey] = useState('');
  const [page, setPage] = useState(0);
  const days = Number(range);
  const since = now - days * 86400000;
  const rows = state.usage.filter(
    (u) =>
      u.funding === funding &&
      Date.parse(u.time) >= since &&
      (!model || u.model === model) &&
      (!key || u.keyId === key),
  );
  const used = rows.reduce(
    (n, u) => n + (funding === 'plan' ? u.points : u.cents),
    0,
  );
  const tokens = rows.reduce((n, u) => n + u.input + u.output, 0);
  const success = rows.filter((u) => u.status === 'success').length;
  const q = quota(state, now);
  const sub = state.subscription;
  const complete = [
    q.active || state.cash > 0,
    state.keys.some((k) => k.status === 'active'),
    state.usage.some((u) => u.status === 'success'),
  ];
  const series = Array.from({ length: days }, (_, i) => {
    const end = now - (days - i - 1) * 86400000;
    const group = rows.filter(
      (u) => Date.parse(u.time) > end - 86400000 && Date.parse(u.time) <= end,
    );
    return {
      day: date(new Date(end).toISOString(), state.profile.timezone).slice(
        5,
        10,
      ),
      value: group.reduce(
        (n, u) => n + (funding === 'plan' ? u.points : u.cents),
        0,
      ),
    };
  });
  const max = Math.max(1, ...series.map((v) => v.value));
  return (
    <>
      <div className="cs-summary-grid">
        <section className="cs-card cs-plan-summary">
          <div className="cs-card-heading">
            <span>
              <Code2 size={18} /> Coding Plan
            </span>
            <Badge tone={q.active ? 'success' : ''}>
              {q.active
                ? sub && plans[sub.plan].name
                : t('未开通', 'Not active')}
            </Badge>
          </div>
          <div className="cs-big-number">
            {q.active ? number(q.remaining) : '—'}
            <small>{t('剩余点数', 'credits remaining')}</small>
          </div>
          <div className="cs-progress">
            <i
              style={{
                width: `${q.active ? (q.remaining / (sub!.limit ?? plans[sub!.plan].points)) * 100 : 0}%`,
              }}
            />
          </div>
          <div className="cs-card-bottom">
            <span>
              {t('当前周期', 'Current cycle')} ·{' '}
              {sub ? date(sub.end, state.profile.timezone) : '—'}
            </span>
            <Link href={`${demoRoot}/coding-plan`}>
              {t('管理套餐', 'Manage plan')}
              <ChevronRight size={14} />
            </Link>
          </div>
        </section>
        <section className="cs-card">
          <div className="cs-card-heading">
            <span>
              <Wallet size={18} />
              {t('API 可用余额', 'Available API balance')}
            </span>
            <Badge>{t('演示钱包', 'Demo wallet')}</Badge>
          </div>
          <div className="cs-big-number">
            {money(state.cash)}
            <small>CNY</small>
          </div>
          <p className="cs-muted">
            {t(
              '按量调用独立结算，不使用套餐点数。',
              'Metered requests are billed separately from plan credits.',
            )}
          </p>
          <div className="cs-card-bottom">
            <span>{t('全部为本地示例数据', 'Local sample data only')}</span>
            <Link href={`${demoRoot}/billing/balance`}>
              {t('模拟充值', 'Demo top-up')}
              <ChevronRight size={14} />
            </Link>
          </div>
        </section>
      </div>
      <section className="cs-onboarding">
        <strong>{t('开始构建', 'Start building')}</strong>
        {[
          t('选择服务', 'Choose a service'),
          t('创建 API Key', 'Create an API key'),
          t('验证首次调用', 'Verify first request'),
        ].map((label, i) => (
          <Link
            key={label}
            href={`${demoRoot}/${['coding-plan', 'api-keys', 'integrations'][i]}`}
          >
            <span className={complete[i] ? 'done' : ''}>
              {complete[i] ? <Check size={13} /> : i + 1}
            </span>
            {label}
            <ArrowUpRight className="cs-sidebar-link-arrow" size={14} />
          </Link>
        ))}
      </section>
      <div className="cs-toolbar">
        <fieldset
          className="cs-tabs"
          aria-label={t('计费来源', 'Billing source')}
        >
          {(['plan', 'api'] as const).map((f) => (
            <Button
              aria-pressed={f === funding}
              key={f}
              onClick={() => {
                setFunding(f);
                setPage(0);
              }}
            >
              {sourceName(f, t)}
            </Button>
          ))}
        </fieldset>
        <div className="cs-filters">
          <Field label={t('时间范围', 'Time range')}>
            <Select
              value={range}
              onValueChange={(value) => {
                setRange(value);
                setPage(0);
              }}
            >
              {[1, 7, 30].map((d) => (
                <option key={d} value={d}>
                  {t(`近 ${d} 天`, `Last ${d} days`)}
                </option>
              ))}
            </Select>
          </Field>
          <Field label={t('模型', 'Model')}>
            <Select
              value={model}
              onValueChange={(value) => {
                setModel(value);
                setPage(0);
              }}
            >
              <option value="">{t('全部模型', 'All models')}</option>
              {models.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="API Key">
            <Select
              value={key}
              onValueChange={(value) => {
                setKey(value);
                setPage(0);
              }}
            >
              <option value="">{t('全部 Key', 'All keys')}</option>
              {state.keys.map((k) => (
                <option key={k.id} value={k.id}>
                  {k.name}
                </option>
              ))}
            </Select>
          </Field>
          <Button
            className="cs-button"
            onClick={() => {
              setKey('');
              setModel('');
              setRange('7');
              setPage(0);
            }}
          >
            {t('重置', 'Reset')}
          </Button>
          <Button
            className="cs-button"
            disabled={!rows.length}
            onClick={() =>
              downloadCsv('formsy-demo-usage.csv', [
                [
                  t('时间', 'Time'),
                  t('时区', 'Timezone'),
                  'Request ID',
                  'Model',
                  'Key',
                  'Source',
                  'Input tokens',
                  'Cached input tokens',
                  'Output tokens',
                  'Points',
                  'CNY',
                  'Status',
                ],
                ...rows.map((u) => [
                  date(u.time, state.profile.timezone),
                  state.profile.timezone,
                  u.id,
                  u.model,
                  keyName(state, u.keyId),
                  u.funding,
                  u.input,
                  u.cached,
                  u.output,
                  u.points,
                  (u.cents / 100).toFixed(2),
                  u.status,
                ]),
              ])
            }
          >
            <Download size={16} />
            {t('导出', 'Export')}
          </Button>
        </div>
      </div>
      <div className="cs-metrics">
        <Metric
          label={
            funding === 'plan'
              ? t('消耗点数', 'Credits used')
              : t('消费金额', 'Amount spent')
          }
          value={funding === 'plan' ? number(used) : money(used)}
          hint={t(`近 ${days} 天`, `Last ${days} days`)}
        />
        <Metric
          label={t('API 请求次数', 'API requests')}
          value={number(rows.length)}
        />
        <Metric
          label="Tokens"
          value={number(tokens)}
          hint={t(
            '输入 + 输出，缓存不重复计算',
            'Input + output, without double-counting cache',
          )}
        />
        <Metric
          label={t('API 成功率', 'API success rate')}
          value={
            rows.length ? `${((success / rows.length) * 100).toFixed(1)}%` : '—'
          }
          hint={t(
            '不代表工程任务完成率',
            'Distinct from verified task success',
          )}
        />
      </div>
      <section className="cs-card cs-chart">
        <div className="cs-card-heading">
          <h2>
            {funding === 'plan'
              ? t('点数使用趋势', 'Credit usage')
              : t('消费趋势', 'Spend trend')}
          </h2>
          <small>
            {t('每 24 小时汇总', '24-hour intervals')} ·{' '}
            {state.profile.timezone}
          </small>
        </div>
        {rows.length ? (
          <figure
            className="cs-bars"
            aria-label={t(
              `过去 ${days} 天的用量趋势，精确值见下方明细`,
              `Usage over ${days} days. Exact values are in the table below.`,
            )}
          >
            {series.map((s, i) => (
              <div
                key={i}
                title={`${s.day}: ${funding === 'plan' ? s.value : money(s.value)}`}
              >
                <span>
                  {days <= 7
                    ? funding === 'plan'
                      ? s.value
                      : money(s.value)
                    : ''}
                </span>
                <i
                  style={{
                    height: `calc(var(--chart-height) * ${s.value / max})`,
                  }}
                />
                <small>{days <= 7 || i % 5 === 0 ? s.day : ''}</small>
              </div>
            ))}
          </figure>
        ) : (
          <Empty
            title={t('当前条件下暂无调用', 'No requests match these filters')}
            detail={t(
              '调整筛选条件，或在工具接入中模拟一次调用。',
              'Change filters or simulate a request in Integrations.',
            )}
            href={`${demoRoot}/integrations`}
            label={t('开始接入', 'Get connected')}
          />
        )}
      </section>
      <section className="cs-card cs-table-card">
        <div className="cs-card-heading">
          <h2>{t('请求明细', 'Request details')}</h2>
          <span className="cs-muted">
            {rows.length} {t('条记录', 'records')}
          </span>
        </div>
        <div className="cs-table-scroll">
          <table>
            <thead>
              <tr>
                {[
                  t('时间', 'Time'),
                  t('模型 / Key', 'Model / Key'),
                  t('计量', 'Usage'),
                  t('费用 / 点数', 'Cost / credits'),
                  t('状态', 'Status'),
                  '',
                ].map((h, i) => (
                  <th key={i}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.slice(page * 10, page * 10 + 10).map((u) => (
                <tr key={u.id}>
                  <td>{date(u.time, state.profile.timezone)}</td>
                  <td>
                    {modelName(u.model)}
                    <small>{keyName(state, u.keyId)}</small>
                  </td>
                  <td>{number(u.input + u.output)} Tokens</td>
                  <td>
                    {funding === 'plan'
                      ? `${u.points} ${t('点', 'credits')}`
                      : money(u.cents)}
                  </td>
                  <td>
                    <Badge tone={u.status === 'success' ? 'success' : 'danger'}>
                      {u.status === 'success'
                        ? t('成功', 'Success')
                        : t('失败', 'Failed')}
                    </Badge>
                  </td>
                  <td>
                    <Button
                      className="cs-text-button"
                      onClick={() => setModal({ kind: 'request', item: u })}
                    >
                      {t('详情', 'Details')}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!rows.length && (
          <p className="cs-table-empty">{t('暂无记录', 'No records')}</p>
        )}
        <div className="cs-pagination">
          <Button
            className="cs-button"
            disabled={page === 0}
            onClick={() => setPage(page - 1)}
          >
            {t('上一页', 'Previous')}
          </Button>
          <span>
            {page + 1} / {Math.max(1, Math.ceil(rows.length / 10))}
          </span>
          <Button
            className="cs-button"
            disabled={(page + 1) * 10 >= rows.length}
            onClick={() => setPage(page + 1)}
          >
            {t('下一页', 'Next')}
          </Button>
        </div>
      </section>
    </>
  );
}
