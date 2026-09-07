import { useNavigate, useLocation } from 'react-router';
import {
  useEffect,
  useState,
  type SyntheticEvent,
  type ReactNode,
} from 'react';
import {
  Activity,
  House,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronRight,
  Code2,
  Cpu,
  Download,
  ExternalLink,
  FlaskConical,
  KeyRound,
  Menu,
  Plus,
  ReceiptText,
  Settings,
  Terminal,
  Wallet,
  X,
  AlertCircle,
  CircleCheck,
  RefreshCw,
} from 'lucide-react';
import Image from '@/components/runtime/app-image';
import { AppLink as Link, withBasePath } from '@/components/runtime/app-link';
import { useI18n } from '@/components/i18n/i18n-provider';
import { useSession } from '@/components/auth/session-provider';
import {
  Dialog,
  Button,
  Input,
  Select,
  Checkbox,
  CopyButton,
  downloadCsv,
} from '@/components/console/primitives';
import { consoleNavigation, consoleErrors } from '@/content/console.i18n';
import { demoAction, resetDemo, useDemoState } from '@/lib/console/demo-store';
import {
  ConsoleError,
  models,
  plans,
  quota,
  type Action,
  type ConsoleState,
  type Funding,
  type PlanId,
  type Usage,
} from '@/lib/console/domain';
import './console.css';

type T = (zh: string, en: string) => string;
const demoRoot = '/demo/console';
const navIcons = {
  chart: Activity,
  code: Code2,
  models: Cpu,
  key: KeyRound,
  terminal: Terminal,
  wallet: Wallet,
  receipt: ReceiptText,
  settings: Settings,
};
const money = (cents: number) => `¥${(cents / 100).toFixed(2)}`;
const number = (n: number) => n.toLocaleString('en-US');
function date(value: string | null, tz: string) {
  return value
    ? new Intl.DateTimeFormat('sv-SE', {
        dateStyle: 'short',
        timeStyle: 'short',
        timeZone: tz,
      }).format(new Date(value))
    : '—';
}
const sourceName = (s: Funding, t: T) =>
  s === 'plan' ? 'Coding Plan' : t('API 按量', 'Metered API');
const modelName = (id: string) => models.find((m) => m.id === id)?.name ?? id;
const keyName = (s: ConsoleState, id: string) =>
  s.keys.find((k) => k.id === id)?.name ?? '—';
type Modal =
  | { kind: 'order'; id: string }
  | { kind: 'key' }
  | { kind: 'secret'; secret: string }
  | { kind: 'confirm'; title: string; body: string; run: () => void }
  | { kind: 'request'; item: Usage };
type PageProps = {
  state: ConsoleState;
  t: T;
  act: (a: Action) => ConsoleState | null;
  setModal: (m: Modal | null) => void;
  notice: (s: string) => void;
};
function Badge({
  children,
  tone = '',
}: {
  children: ReactNode;
  tone?: string;
}) {
  return <span className={`cs-badge ${tone}`}>{children}</span>;
}
function Empty({
  title,
  detail,
  href,
  label,
}: {
  title: string;
  detail: string;
  href?: string;
  label?: string;
}) {
  return (
    <div className="cs-empty">
      <Activity size={28} />
      <h3>{title}</h3>
      <p>{detail}</p>
      {href && (
        <Link className="cs-button primary" href={href}>
          {label}
          <ArrowRight size={16} />
        </Link>
      )}
    </div>
  );
}
function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="cs-field">
      <span>{label}</span>
      {children}
    </label>
  );
}
function Metric({
  label,
  value,
  hint,
}: {
  label: string;
  value: ReactNode;
  hint?: string;
}) {
  return (
    <div className="cs-metric">
      <span>{label}</span>
      <strong>{value}</strong>
      {hint && <small>{hint}</small>}
    </div>
  );
}
function OrderButton({
  plan,
  kind,
  children,
  act,
  setModal,
}: {
  plan?: PlanId;
  kind: 'subscription' | 'upgrade' | 'renewal';
  children: ReactNode;
} & Pick<PageProps, 'act' | 'setModal'>) {
  return (
    <Button
      className="cs-button primary"
      onClick={() => {
        const next = act({ type: 'order', kind, plan });
        if (next) setModal({ kind: 'order', id: next.orders[0].id });
      }}
    >
      {children}
      <ArrowRight size={16} />
    </Button>
  );
}
function useClock() {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 30000);
    return () => clearInterval(timer);
  }, []);
  return now;
}
function UsagePage({ state, t, setModal }: PageProps) {
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
              onChange={(e) => {
                setRange(e.target.value);
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
              onChange={(e) => {
                setModel(e.target.value);
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
              onChange={(e) => {
                setKey(e.target.value);
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
                <i style={{ height: `${(s.value / max) * 140}px` }} />
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
function PlanPage(p: PageProps) {
  const { state, t, act, setModal } = p;
  const q = quota(state),
    sub = state.subscription;
  return (
    <>
      <div className="cs-callout">
        <FlaskConical size={18} />
        {t(
          '以下价格、额度和周期均为交互演示参数，尚未开放销售。',
          'Prices, quotas and periods below are illustrative. Plans are not available for purchase.',
        )}
      </div>
      {sub && (
        <section className="cs-card">
          <div className="cs-card-heading">
            <h2>
              {t('当前套餐', 'Current plan')} · {plans[sub.plan].name}
            </h2>
            <Badge tone={q.active ? 'success' : 'danger'}>
              {q.active ? t('使用中', 'Active') : t('已到期', 'Expired')}
            </Badge>
          </div>
          <div className="cs-metrics">
            <Metric
              label={t('月额度剩余', 'Cycle credits left')}
              value={number(q.remaining)}
            />
            <Metric
              label={t('5 小时窗口剩余', '5-hour window left')}
              value={number(q.windowRemaining)}
              hint={`${t('重置', 'Resets')}: ${date(q.reset, state.profile.timezone)}`}
            />
            <Metric
              label={t('到期时间', 'Expires at')}
              value={date(sub.end, state.profile.timezone)}
              hint={t('演示周期：30 天', 'Demo cycle: 30 days')}
            />
          </div>
          <div className="cs-inline-actions">
            <Badge tone="cs-renewal-status">
              {sub.renew
                ? t('已模拟开启续费提醒', 'Renewal reminder simulated')
                : t('手动续费', 'Manual renewal')}
            </Badge>
            {q.active ? (
              <Button
                className="cs-button"
                onClick={() =>
                  setModal({
                    kind: 'confirm',
                    title: sub.renew
                      ? t('取消续费提醒', 'Cancel renewal reminder')
                      : t('开启续费提醒', 'Enable renewal reminder'),
                    body: t(
                      '仅切换演示状态，不触发任何付款。当前周期权益保持有效。',
                      'Only changes demo state. No payment occurs; current benefits remain active.',
                    ),
                    run: () => {
                      act({ type: 'renew', enabled: !sub.renew });
                      setModal(null);
                    },
                  })
                }
              >
                {sub.renew
                  ? t('取消续费提醒', 'Cancel reminder')
                  : t('续费提醒', 'Renewal reminder')}
              </Button>
            ) : (
              <OrderButton
                kind="renewal"
                plan={sub.nextPlan ?? sub.plan}
                {...p}
              >
                {t('模拟续费', 'Demo renewal')}
              </OrderButton>
            )}
            {q.active && sub.plan === 'pro' && (
              <Button
                className="cs-button"
                disabled={sub.nextPlan === 'starter'}
                onClick={() =>
                  setModal({
                    kind: 'confirm',
                    title: t(
                      '下周期降级到 Starter',
                      'Switch to Starter next cycle',
                    ),
                    body: t(
                      '当前周期继续保留 Pro 权益。续费时使用 Starter。',
                      'Pro remains active this cycle. The next renewal uses Starter.',
                    ),
                    run: () => {
                      act({ type: 'downgrade', plan: 'starter' });
                      setModal(null);
                    },
                  })
                }
              >
                {sub.nextPlan
                  ? t('已预约降级', 'Downgrade scheduled')
                  : t('预约降级', 'Schedule downgrade')}
              </Button>
            )}
          </div>
        </section>
      )}
      <div className="cs-plan-grid">
        {(['starter', 'pro'] as const).map((id) => (
          <section
            className={`cs-card cs-price-card ${id === 'pro' ? 'featured' : ''}`}
            key={id}
          >
            <div className="cs-card-heading">
              <h2>{plans[id].name}</h2>
              {id === 'pro' && (
                <Badge>{t('高频开发', 'Frequent coding')}</Badge>
              )}
            </div>
            <p>
              {id === 'starter'
                ? t('适合个人日常编程', 'For everyday development')
                : t(
                    '适合复杂任务与高频使用',
                    'For complex tasks and frequent use',
                  )}
            </p>
            <div className="cs-price">
              {money(plans[id].cents)}
              <small> / {t('30 天 · 示例', '30 days · example')}</small>
            </div>
            <ul className="cs-checklist">
              {[
                `${number(plans[id].points)} ${t('周期点数', 'credits per cycle')}`,
                `${number(plans[id].window)} ${t('点 / 5 小时', 'credits / 5 hours')}`,
                `${plans[id].concurrency} ${t('并发上限（生产待验证）', 'concurrent requests (production unverified)')}`,
                id === 'pro'
                  ? t(
                      '全部目录模型 · 演示权限',
                      'All catalog models · demo access',
                    )
                  : t(
                      'GLM Flash / DeepSeek Flash / MiniMax / Nemotron',
                      'GLM Flash / DeepSeek Flash / MiniMax / Nemotron',
                    ),
                t(
                  '额度耗尽停止，不自动扣余额',
                  'Stops at quota; no automatic wallet charges',
                ),
              ].map((v) => (
                <li key={v}>
                  <Check size={16} />
                  {v}
                </li>
              ))}
            </ul>
            {q.active && sub?.plan === id ? (
              <Button className="cs-button" disabled>
                {t('当前套餐', 'Current plan')}
              </Button>
            ) : q.active && id === 'starter' ? (
              <span className="cs-muted">
                {t('可在上方预约下周期降级', 'Schedule a downgrade above')}
              </span>
            ) : (
              <OrderButton
                {...p}
                kind={q.active ? 'upgrade' : 'subscription'}
                plan={id}
              >
                {q.active
                  ? t('模拟升级', 'Demo upgrade')
                  : t('模拟开通', 'Try demo plan')}
              </OrderButton>
            )}
          </section>
        ))}
      </div>
      <section className="cs-card">
        <h2>{t('点数如何计算', 'How credits work')}</h2>
        <p className="cs-muted">
          {t(
            '未缓存输入、缓存输入和输出分别计量，按模型倍率折算。一次工具任务可能包含多次 API 调用。',
            'Uncached input, cached input and output are metered separately with model multipliers. A tool task may contain multiple API requests.',
          )}
        </p>
        <code className="cs-code">
          {t(
            '点数 = ⌈((输入 − 缓存) × 输入倍率 + 缓存 × 缓存倍率 + 输出 × 输出倍率) / 100⌉',
            'Credits = ceil(((input − cached) × input rate + cached × cache rate + output × output rate) / 100)',
          )}
        </code>
        <Link className="cs-text-button" href={`${demoRoot}/models`}>
          {t('查看模型倍率', 'View model multipliers')}
          <ArrowRight size={15} />
        </Link>
        <details>
          <summary>
            {t('额度、升级与取消规则', 'Quota, upgrade and cancellation rules')}
          </summary>
          <p>
            {t(
              '额度按演示周期重置且不结转。升级按剩余周期计算示例差价和新增额度，不重置已用点数。关闭提醒不会结束当前周期，也不代表退款。真实销售规则将在开放前公布。',
              'Credits reset each demo cycle without rollover. Upgrades prorate the illustrative price and added credits while preserving usage. Cancelling a reminder does not end the current cycle or issue a refund. Sale terms will be published before launch.',
            )}
          </p>
        </details>
      </section>
      <div className="cs-card cs-enterprise">
        <div>
          <h2>{t('团队与企业', 'Teams & enterprise')}</h2>
          <p>
            {t(
              '项目预算、SSO 和私有部署按阶段开放。',
              'Project budgets, SSO and private deployments will be introduced in stages.',
            )}
          </p>
        </div>
        <Link className="cs-button" href="/aurinova-reference#engagement">
          {t('了解合作方式', 'Explore engagement')}
          <ArrowUpRight size={16} />
        </Link>
      </div>
    </>
  );
}
function ModelsPage({ state, t }: PageProps) {
  const [search, setSearch] = useState('');
  return (
    <>
      <div className="cs-callout">
        <FlaskConical size={18} />
        {t(
          '这些模型用于演示，不连接真实供应商。兼容工具和真实价格将在验证后开放。',
          'These models are illustrative and do not connect to providers. Tool compatibility and real prices require validation.',
        )}
      </div>
      <Field label={t('搜索模型', 'Search models')}>
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t('名称或能力', 'Name or capability')}
        />
      </Field>
      <div className="cs-plan-grid">
        {models
          .filter(
            (m) =>
              m.name.toLowerCase().includes(search.toLowerCase()) ||
              m.kind.includes(search.toLowerCase()),
          )
          .map((m) => (
            <section className="cs-card" key={m.id}>
              <div className="cs-card-heading">
                <Image
                  src={m.logo}
                  alt=""
                  width={32}
                  height={32}
                  style={{ objectFit: 'contain' }}
                />
                <Badge>
                  {!m.pro || state.subscription?.plan === 'pro'
                    ? t('演示可用', 'Demo available')
                    : t('Pro 权益', 'Pro benefit')}
                </Badge>
              </div>
              <h2>{m.name}</h2>
              <a
                href={m.source}
                target="_blank"
                rel="noreferrer"
                className="cs-text-button"
              >
                {t('模型官方仓库', 'Official model repository')} ↗
              </a>
              <p className="cs-muted">
                {m.kind === 'code'
                  ? t(
                      '日常代码编辑、补全与工具调用演示。',
                      'Everyday editing, completion and tool-call examples.',
                    )
                  : t(
                      '复杂问题分析与多步执行演示。',
                      'Complex analysis and multi-step execution examples.',
                    )}
              </p>
              <dl className="cs-details">
                <div>
                  <dt>{t('示例上下文', 'Illustrative context')}</dt>
                  <dd>{number(m.context)} Tokens</dd>
                </div>
                <div>
                  <dt>
                    {t(
                      '输入 / 缓存 / 输出倍率',
                      'Input / cache / output multipliers',
                    )}
                  </dt>
                  <dd>
                    {m.input} / {m.cached} / {m.output}
                  </dd>
                </div>
                <div>
                  <dt>{t('示例 API 计量', 'Illustrative API cost')}</dt>
                  <dd>
                    {t(
                      '每 10 点折算 ¥0.01，向上取分',
                      '¥0.01 per 10 credits, rounded up to cents',
                    )}
                  </dd>
                </div>
                <div>
                  <dt>{t('真实协议兼容', 'Live protocol compatibility')}</dt>
                  <dd>{t('待验证', 'Unverified')}</dd>
                </div>
              </dl>
              <Link
                className="cs-button"
                href={`${demoRoot}/integrations?model=${m.id}`}
              >
                {t('查看配置示例', 'View configuration example')}
                <ArrowRight size={15} />
              </Link>
            </section>
          ))}
      </div>
      {!models.some(
        (m) =>
          m.name.toLowerCase().includes(search.toLowerCase()) ||
          m.kind.includes(search.toLowerCase()),
      ) && (
        <Empty
          title={t('没有匹配模型', 'No models found')}
          detail={t('尝试其他搜索词。', 'Try another search term.')}
        />
      )}
    </>
  );
}
function KeysPage({ state, t, act, setModal }: PageProps) {
  return (
    <>
      <div className="cs-callout">
        <KeyRound size={18} />
        {t(
          '每个 Key 固定使用套餐或 API 余额。这里生成的 DEMO 标识无法用于真实调用。',
          'Each key uses a fixed billing source. DEMO identifiers generated here cannot authenticate real requests.',
        )}
      </div>
      <div className="cs-section-actions">
        <span>
          {state.keys.filter((k) => k.status !== 'revoked').length} / 10{' '}
          {t('个可用 Key', 'non-revoked keys')}
        </span>
        <Button
          className="cs-button primary"
          onClick={() => setModal({ kind: 'key' })}
        >
          <Plus size={16} />
          {t('创建演示 Key', 'Create demo key')}
        </Button>
      </div>
      <section className="cs-card cs-table-card">
        <div className="cs-table-scroll">
          <table>
            <thead>
              <tr>
                {[
                  t('名称', 'Name'),
                  t('计费来源', 'Billing source'),
                  t('状态', 'Status'),
                  t('最近使用 / 到期', 'Last used / expiry'),
                  t('操作', 'Actions'),
                ].map((v) => (
                  <th key={v}>{v}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {state.keys.map((k) => (
                <tr key={k.id}>
                  <td>
                    <strong>{k.name}</strong>
                    <small>DEMO-••••{k.tail}</small>
                  </td>
                  <td>
                    {sourceName(k.funding, t)}
                    {k.budget != null && (
                      <small>
                        {t('预算', 'Budget')}:{' '}
                        {k.funding === 'plan'
                          ? `${k.budgetUsed ?? 0} / ${k.budget}`
                          : `${money(k.budgetUsed ?? 0)} / ${money(k.budget)}`}
                      </small>
                    )}
                    <small>
                      {k.models
                        .map((id) => modelName(id).replace(' · Demo', ''))
                        .join(', ')}
                    </small>
                  </td>
                  <td>
                    <Badge
                      tone={
                        k.status === 'active'
                          ? 'success'
                          : k.status === 'revoked'
                            ? 'danger'
                            : ''
                      }
                    >
                      {k.status === 'active'
                        ? t('可用', 'Active')
                        : k.status === 'paused'
                          ? t('已停用', 'Paused')
                          : t('已撤销', 'Revoked')}
                    </Badge>
                  </td>
                  <td>
                    {date(k.lastUsed, state.profile.timezone)}
                    <small>{date(k.expiresAt, state.profile.timezone)}</small>
                  </td>
                  <td aria-label={t('Key 操作', 'Key actions')}>
                    <div className="cs-inline-actions">
                      <Button
                        className="cs-text-button"
                        disabled={k.status === 'revoked'}
                        onClick={() =>
                          act({
                            type: 'key-status',
                            id: k.id,
                            status: k.status === 'active' ? 'paused' : 'active',
                          })
                        }
                      >
                        {k.status === 'active'
                          ? t('停用', 'Pause')
                          : t('恢复', 'Resume')}
                      </Button>
                      <Button
                        className="cs-text-button danger"
                        disabled={k.status === 'revoked'}
                        onClick={() =>
                          setModal({
                            kind: 'confirm',
                            title: t('撤销演示 Key', 'Revoke demo key'),
                            body: t(
                              `撤销「${k.name}」后，该标识无法再次模拟调用，已有记录仍保留。`,
                              `Revoking “${k.name}” prevents further simulated requests. Usage records remain.`,
                            ),
                            run: () => {
                              act({
                                type: 'key-status',
                                id: k.id,
                                status: 'revoked',
                              });
                              setModal(null);
                            },
                          })
                        }
                      >
                        {t('撤销', 'Revoke')}
                      </Button>
                      <Button
                        className="cs-text-button"
                        disabled={k.status === 'revoked'}
                        onClick={() =>
                          setModal({
                            kind: 'confirm',
                            title: t('轮换演示 Key', 'Rotate demo key'),
                            body: t(
                              '生成新标识并撤销旧标识；保留模型权限、到期时间和已用子预算。',
                              'Creates a replacement and revokes the old key, preserving models, expiry and budget usage.',
                            ),
                            run: () => {
                              const next = act({ type: 'rotate', id: k.id });
                              if (next)
                                setModal({
                                  kind: 'secret',
                                  secret: `DEMO-NOT-A-REAL-KEY-${next.keys[0].tail}`,
                                });
                            },
                          })
                        }
                      >
                        {t('轮换', 'Rotate')}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!state.keys.length && (
          <Empty
            title={t('还没有 API Key', 'No API keys yet')}
            detail={t(
              '先选择服务，再创建对应计费类型的 Key。',
              'Choose a service, then create a key for that billing source.',
            )}
          />
        )}
      </section>
    </>
  );
}
function IntegrationsPage({ state, t, act, notice }: PageProps) {
  const [tool, setTool] = useState('generic');
  const [selectedModel, setSelectedModel] = useState(
    new URLSearchParams(window.location.search).get('model') ?? models[0].id,
  );
  const [key, setKey] = useState(
    state.keys.find((k) => k.status === 'active')?.id ?? '',
  );
  const [result, setResult] = useState<Usage | null>(null);
  const [pending, setPending] = useState(false);
  const tools = [
    ['generic', t('通用 Chat Completions', 'Generic Chat Completions')],
    ['cline', 'Cline'],
    ['roo', 'Roo Code'],
    ['claude', 'Claude Code'],
    ['codex', 'Codex CLI'],
  ];
  const supported = tool === 'generic';
  const config = JSON.stringify(
    {
      base_url: 'https://api.example.invalid/v1',
      api_key: 'YOUR_API_KEY',
      model: selectedModel,
    },
    null,
    2,
  );
  const run = async (fail = false) => {
    setPending(true);
    setResult(null);
    await new Promise((resolve) => setTimeout(resolve, 350));
    const next = act({
      type: 'request',
      keyId: key,
      model: selectedModel,
      fail,
      requestId: crypto.randomUUID(),
    });
    if (next) {
      setResult(next.usage[0]);
      notice(
        fail
          ? t(
              '已模拟推理前失败，无使用扣费。',
              'Simulated pre-inference failure. No usage charged.',
            )
          : t(
              '模拟调用完成，用量和账单已更新。',
              'Simulation complete. Usage and billing updated.',
            ),
      );
    }
    setPending(false);
  };
  return (
    <>
      <div className="cs-callout">
        <Terminal size={18} />
        {t(
          '本页只生成配置模板并模拟请求，不发送代码、Key 或提示词到外部服务。',
          'This page generates templates and simulates requests. It sends no code, keys or prompts to external services.',
        )}
      </div>
      <div className="cs-two-column">
        <section className="cs-card">
          <h2>{t('1. 选择工具和模型', '1. Choose a tool and model')}</h2>
          <Field label={t('编程工具', 'Coding tool')}>
            <Select value={tool} onChange={(e) => setTool(e.target.value)}>
              {tools.map(([id, label]) => (
                <option key={id} value={id}>
                  {label}
                </option>
              ))}
            </Select>
          </Field>
          <Field label={t('模型', 'Model')}>
            <Select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
            >
              {models.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </Select>
          </Field>
          <p>
            <Badge>
              {supported
                ? t('示例协议', 'Example protocol')
                : t('待兼容性验证', 'Compatibility unverified')}
            </Badge>
          </p>
          <p className="cs-muted">
            {supported
              ? t(
                  '模板使用目录模型 ID；服务域名为占位值，正式模型映射与服务地址尚未配置。',
                  'The template uses catalog model IDs. The endpoint is a placeholder; production model mapping and service endpoints are pending.',
                )
              : t(
                  '该工具的完整接入需要验证协议、流式输出、工具调用与错误处理，目前不提供未经验证的配置。',
                  'This tool requires protocol, streaming, tool-call and error-handling validation. Unverified configuration is not provided.',
                )}
          </p>
        </section>
        <section className="cs-card">
          <h2>{t('2. 查看配置模板', '2. Review the template')}</h2>
          {supported ? (
            <>
              <pre className="cs-code">{config}</pre>
              <CopyButton
                value={config}
                label={t('复制', 'Copy')}
                copiedLabel={t('已复制', 'Copied')}
              />
              <p className="cs-muted">
                {t(
                  '真实 Key 应在本地工具内填写。不要把 Key 提交到代码仓库。',
                  'Enter a real key in your local tool. Keep keys out of repositories.',
                )}
              </p>
            </>
          ) : (
            <Empty
              title={t('接入指南待开放', 'Guide not available yet')}
              detail={t(
                '可先用下方诊断体验额度和计费流程。',
                'Use the diagnostic below to explore quota and billing flows.',
              )}
            />
          )}
        </section>
      </div>
      <section className="cs-card">
        <h2>{t('3. 模拟连接诊断', '3. Simulate a diagnostic')}</h2>
        <p className="cs-muted">
          {t(
            '成功测试会消耗本地演示点数或演示余额；失败测试模拟推理前拒绝，不扣费。',
            'A successful test consumes local demo credits or balance. Failure tests simulate rejection before inference and do not charge.',
          )}
        </p>
        <Field label={t('使用的 Key', 'Key to use')}>
          <Select value={key} onChange={(e) => setKey(e.target.value)}>
            <option value="">{t('请选择', 'Select a key')}</option>
            {state.keys.map((k) => (
              <option key={k.id} value={k.id}>
                {k.name} · {sourceName(k.funding, t)} ·{' '}
                {k.status === 'active'
                  ? t('可用', 'Active')
                  : k.status === 'paused'
                    ? t('已停用', 'Paused')
                    : t('已撤销', 'Revoked')}
              </option>
            ))}
          </Select>
        </Field>
        <div className="cs-inline-actions">
          <Button
            className="cs-button primary"
            disabled={!key || pending}
            onClick={() => void run()}
          >
            {pending ? <RefreshCw size={16} /> : <Terminal size={16} />}{' '}
            {t('模拟成功调用', 'Simulate successful request')}
          </Button>
          <Button
            className="cs-button"
            disabled={!key || pending}
            onClick={() => void run(true)}
          >
            {t('模拟失败', 'Simulate failure')}
          </Button>
          <Link className="cs-text-button" href={`${demoRoot}/api-keys`}>
            {t('管理 Key', 'Manage keys')}
          </Link>
        </div>
        {result && (
          <output className="cs-result">
            <CircleCheck size={18} />
            <div>
              <strong>
                {result.status === 'success'
                  ? t('演示调用已完成', 'Demo request completed')
                  : t('已记录失败状态', 'Failure recorded')}
              </strong>
              <p>{result.id}</p>
              <span>
                {result.input + result.output} Tokens ·{' '}
                {result.funding === 'plan'
                  ? `${result.points} ${t('点数', 'credits')}`
                  : money(result.cents)}
              </span>
            </div>
            <Link href={`${demoRoot}/usage`}>
              {t('查看用量', 'View usage')}
              <ArrowRight size={16} />
            </Link>
          </output>
        )}
      </section>
    </>
  );
}
function BalancePage({ state, t, act, setModal }: PageProps) {
  const [amount, setAmount] = useState('100');
  return (
    <>
      <div className="cs-callout">
        <Wallet size={18} />
        {t(
          '演示充值不会打开支付渠道，也不会产生真实扣款。',
          'Demo top-ups do not open payment providers or charge money.',
        )}
      </div>
      <div className="cs-metrics">
        <Metric
          label={t('可用余额', 'Available balance')}
          value={money(state.cash)}
          hint="CNY · DEMO"
        />
        <Metric
          label={t('赠送余额', 'Granted balance')}
          value="¥0.00"
          hint={t('演示环境未设置赠送额度', 'No grants in this demo')}
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
        <h2>{t('模拟充值', 'Demo top-up')}</h2>
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
          {t('创建演示订单', 'Create demo order')}
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
function OrdersPage({ state, t, setModal }: PageProps) {
  const [filter, setFilter] = useState('all');
  const rows = state.orders.filter(
    (o) => filter === 'all' || o.status === filter,
  );
  return (
    <>
      <div className="cs-toolbar">
        <Field label={t('订单状态', 'Order status')}>
          <Select value={filter} onChange={(e) => setFilter(e.target.value)}>
            {[
              ['all', t('全部', 'All')],
              ['pending', t('待处理', 'Pending')],
              ['paid', t('已模拟完成', 'Simulated paid')],
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
            downloadCsv('formsy-demo-orders.csv', [
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
                        ? t('已模拟完成', 'Simulated paid')
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
              '模拟开通套餐或充值后，订单会出现在这里。',
              'Orders appear after starting a demo subscription or top-up.',
            )}
          />
        )}
      </section>
      <p className="cs-muted">
        {t(
          '全部记录仅作演示，不构成真实订单、账单或发票。消费明细可在用量信息中导出。',
          'All records are illustrative and are not actual orders, bills or invoices. Export consumption details from Usage.',
        )}
      </p>
    </>
  );
}
function SettingsPage({ state, t, act, setModal }: PageProps) {
  const navigate = useNavigate();
  const [name, setName] = useState(state.profile.name),
    [timezone, setTimezone] = useState(state.profile.timezone),
    [notifications, setNotifications] = useState(state.profile.notifications);
  return (
    <>
      <section className="cs-card">
        <h2>{t('演示工作空间', 'Demo workspace')}</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            act({ type: 'profile', name, timezone, notifications });
          }}
        >
          <Field label={t('显示名称', 'Display name')}>
            <Input
              value={name}
              maxLength={48}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Field>
          <Field label={t('显示时区', 'Display timezone')}>
            <Select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
            >
              {[
                'Asia/Shanghai',
                'UTC',
                'America/Los_Angeles',
                'Europe/London',
              ].map((z) => (
                <option key={z}>{z}</option>
              ))}
            </Select>
          </Field>
          <label className="cs-checkbox">
            <Checkbox
              className="cs-checkbox-control"
              checked={notifications}
              onCheckedChange={setNotifications}
            />
            {t(
              '模拟额度提醒偏好（不会发送消息）',
              'Demo quota reminder preference (no messages sent)',
            )}
          </label>
          <Button className="cs-button primary" type="submit">
            {t('保存偏好', 'Save preferences')}
          </Button>
        </form>
      </section>
      <section className="cs-card">
        <h2>{t('账号与安全', 'Account & security')}</h2>
        <p className="cs-muted">
          {t(
            '当前是独立演示空间，没有真实账号、登录凭据或设备会话。正式登录、邮箱验证、第三方身份与 SSO 使用现有认证入口。',
            'This is an isolated demo workspace with no real account, credentials or sessions. Existing authentication handles production login, email verification, external identities and SSO.',
          )}
        </p>
        <Link
          className="cs-button"
          href="/aurinova-reference/login?return_to=%2Fconsole%2Fusage"
        >
          {t('前往登录', 'Go to login')}
          <ExternalLink size={15} />
        </Link>
      </section>
      <section className="cs-card">
        <h2>{t('演示数据', 'Demo data')}</h2>
        <p className="cs-muted">
          {t(
            '数据仅保存在此浏览器。可切换为空白新用户，或恢复示例用量。',
            'Data stays in this browser. Start with a blank workspace or restore sample usage.',
          )}
        </p>
        <div className="cs-inline-actions">
          {[true, false].map((blank) => (
            <Button
              className="cs-button"
              key={String(blank)}
              onClick={() =>
                setModal({
                  kind: 'confirm',
                  title: blank
                    ? t('切换为空白工作空间', 'Start with a blank workspace')
                    : t('恢复示例数据', 'Restore sample data'),
                  body: t(
                    '将替换此浏览器中的演示订单、Key 和用量，不影响真实账号。',
                    'This replaces local demo orders, keys and usage. Real accounts are unaffected.',
                  ),
                  run: () => {
                    resetDemo(blank);
                    setModal(null);
                    void navigate(`${demoRoot}/usage`);
                  },
                })
              }
            >
              {blank
                ? t('体验新用户流程', 'Try the new-user flow')
                : t('恢复示例数据', 'Restore sample data')}
            </Button>
          ))}
        </div>
      </section>
      <section className="cs-card">
        <h2>{t('最近演示操作', 'Recent demo actions')}</h2>
        {state.events.slice(0, 6).map((e, i) => (
          <div className="cs-audit-row" key={i}>
            <span>{e.action}</span>
            <time>{date(e.time, state.profile.timezone)}</time>
          </div>
        ))}
      </section>
    </>
  );
}
function KeyDialog({ t, act, setModal }: PageProps) {
  const [name, setName] = useState(''),
    [funding, setFunding] = useState<Funding>('plan'),
    [allowed, setAllowed] = useState([models[0].id]),
    [days, setDays] = useState(30);
  const [budget, setBudget] = useState('');
  const submit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const next = act({
      type: 'key',
      name,
      funding,
      models: allowed,
      days,
      budget:
        budget === ''
          ? null
          : Math.round(Number(budget) * (funding === 'api' ? 100 : 1)),
    });
    if (next)
      setModal({
        kind: 'secret',
        secret: `DEMO-NOT-A-REAL-KEY-${next.keys[0].tail}`,
      });
  };
  return (
    <form onSubmit={submit}>
      <p className="cs-muted">
        {t(
          '标识仅在此处显示，无法用于任何真实服务。',
          'This identifier is shown here once and cannot access any real service.',
        )}
      </p>
      <Field label={t('名称', 'Name')}>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={48}
          required
          placeholder={t('例如：我的编程工具', 'e.g. My coding tool')}
        />
      </Field>
      <Field label={t('计费来源', 'Billing source')}>
        <Select
          value={funding}
          onChange={(e) => setFunding(e.target.value as Funding)}
        >
          <option value="plan">Coding Plan</option>
          <option value="api">{t('API 余额', 'API balance')}</option>
        </Select>
      </Field>
      <p className="cs-callout">
        {funding === 'plan'
          ? t(
              '只扣套餐点数，额度不足即停止。',
              'Uses plan credits only; stops at quota.',
            )
          : t(
              '按量扣 API 余额，即使已有套餐也单独结算。',
              'Uses API balance, even if you also have a plan.',
            )}
      </p>
      <fieldset>
        <legend>{t('允许的模型', 'Allowed models')}</legend>
        {models.map((m) => (
          <label className="cs-checkbox" key={m.id}>
            <Checkbox
              className="cs-checkbox-control"
              checked={allowed.includes(m.id)}
              onCheckedChange={(checked) =>
                setAllowed(
                  checked
                    ? [...allowed, m.id]
                    : allowed.filter((id) => id !== m.id),
                )
              }
            />
            {m.name}
          </label>
        ))}
      </fieldset>
      <Field
        label={
          funding === 'plan'
            ? t('子预算（点数，可留空）', 'Credit budget (optional)')
            : t('子预算（CNY，可留空）', 'Budget in CNY (optional)')
        }
      >
        <Input
          type="number"
          min="1"
          step="1"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          placeholder={t(
            '仍受工作空间总额度限制',
            'Workspace limits still apply',
          )}
        />
      </Field>
      <Field label={t('有效期', 'Expiry')}>
        <Select value={days} onChange={(e) => setDays(Number(e.target.value))}>
          {[7, 30, 90].map((d) => (
            <option key={d} value={d}>
              {d} {t('天', 'days')}
            </option>
          ))}
        </Select>
      </Field>
      <Button className="cs-button primary" type="submit">
        {t('创建演示 Key', 'Create demo key')}
      </Button>
    </form>
  );
}
function ConsoleDemo() {
  const location = useLocation();
  const { locale, toggleLocale } = useI18n();
  const t: T = (zh, en) => (locale === 'zh-CN' ? zh : en);
  const { state, storageAvailable } = useDemoState();
  const [mobile, setMobile] = useState(false);
  const [modal, setModal] = useState<Modal | null>(null);
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');
  const path =
    location.pathname.replace(/\/+$/, '').slice(`${demoRoot}/`.length) ||
    'usage';
  const nav = consoleNavigation.find((n) => n.path === path);
  const title = nav
    ? locale === 'zh-CN'
      ? nav.zh
      : nav.en
    : t('页面未找到', 'Page not found');
  const act = (action: Action) => {
    try {
      const next = demoAction(action);
      setError('');
      setNotice(t('演示状态已更新', 'Demo state updated'));
      return next;
    } catch (e) {
      const code = e instanceof ConsoleError ? e.code : '';
      setError(
        consoleErrors[code]?.[locale === 'zh-CN' ? 0 : 1] ??
          t('操作失败，请重试。', 'Action failed. Please retry.'),
      );
      return null;
    }
  };
  const p: PageProps = { state, t, act, setModal, notice: setNotice };
  useEffect(() => {
    document.title = `${title} · FormSy Console`;
  }, [title]);
  const order =
    modal?.kind === 'order'
      ? state.orders.find((o) => o.id === modal.id)
      : null;
  const modalTitle =
    modal?.kind === 'key'
      ? t('创建演示 Key', 'Create demo key')
      : modal?.kind === 'secret'
        ? t('保存演示标识', 'Save the demo identifier')
        : modal?.kind === 'confirm'
          ? modal.title
          : modal?.kind === 'request'
            ? t('请求详情', 'Request details')
            : t('演示订单', 'Demo order');
  return (
    <div className="cs-app">
      <a className="skip-link" href="#console-main">
        {t('跳转到内容', 'Skip to content')}
      </a>
      <aside
        className={`cs-sidebar ${mobile ? 'open' : ''}`}
        aria-label={t('控制台导航', 'Console navigation')}
      >
        <Link className="cs-brand" href="/">
          <Image
            src={withBasePath('/aurinova-logo.svg')}
            alt="AURINOVA"
            width={168}
            height={29}
          />
          <span>FORMSY CONSOLE</span>
        </Link>
        <div className="cs-workspace">
          <span className="cs-avatar">F</span>
          <div>
            <strong>{state.profile.name}</strong>
            <small>{t('个人空间 · 演示', 'Personal workspace · Demo')}</small>
          </div>
          <Button
            className="cs-icon-button cs-mobile-only"
            onClick={() => setMobile(false)}
            aria-label={t('关闭菜单', 'Close menu')}
          >
            <X size={18} />
          </Button>
        </div>
        <nav>
          {consoleNavigation.map((n, i) => {
            const Icon = navIcons[n.icon];
            return (
              <div key={n.path}>
                {[0, 3, 5, 7].includes(i) && (
                  <p className="cs-nav-label">
                    {i === 0
                      ? t('使用', 'USAGE')
                      : i === 3
                        ? t('接入', 'DEVELOP')
                        : i === 5
                          ? t('费用', 'BILLING')
                          : t('管理', 'ACCOUNT')}
                  </p>
                )}
                <Link
                  href={`${demoRoot}/${n.path}`}
                  aria-current={path === n.path ? 'page' : undefined}
                >
                  <Icon size={18} />
                  {locale === 'zh-CN' ? n.zh : n.en}
                </Link>
              </div>
            );
          })}
        </nav>
        <div className="cs-sidebar-bottom">
          <Link href="/">
            <House size={17} />
            {t('返回官网', 'Website')}
            <ArrowUpRight className="cs-sidebar-link-arrow" size={14} />
          </Link>
          <Link href="/aurinova-reference/docs">
            <BookOpen size={17} />
            {t('接口文档', 'API documentation')}
            <ArrowUpRight className="cs-sidebar-link-arrow" size={14} />
          </Link>
          <Link href="/aurinova-reference#engagement">
            <ExternalLink size={17} />
            {t('帮助与合作', 'Help & engagement')}
          </Link>
        </div>
      </aside>
      {mobile && (
        <Button
          className="cs-mobile-scrim"
          aria-label={t('关闭菜单', 'Close menu')}
          onClick={() => setMobile(false)}
        />
      )}
      <div className="cs-work">
        <header className="cs-topbar">
          <div>
            <Button
              className="cs-icon-button cs-mobile-only"
              onClick={() => setMobile(true)}
              aria-expanded={mobile}
              aria-label={t('打开菜单', 'Open menu')}
            >
              <Menu size={20} />
            </Button>
            <span className="cs-muted">FormSy</span>
            <ChevronRight size={14} />
            <span>{title}</span>
          </div>
          <div>
            <Button className="cs-button" onClick={toggleLocale}>
              {locale === 'zh-CN' ? 'EN' : '中文'}
            </Button>
            <Link
              className="cs-avatar"
              href={`${demoRoot}/settings`}
              aria-label={t('账号设置', 'Account settings')}
            >
              D
            </Link>
          </div>
        </header>
        <main id="console-main" className="cs-main">
          <div className="cs-page-heading">
            <div>
              <p className="cs-eyebrow">WORKSPACE / DEMO</p>
              <h1>{title}</h1>
              <p className="cs-muted">
                {path === 'usage'
                  ? t(
                      '把每一次调用、每一份额度看清楚。',
                      'Understand every request and every credit.',
                    )
                  : path === 'coding-plan'
                    ? t(
                        '选择额度，专注构建。',
                        'Choose your capacity. Focus on building.',
                      )
                    : t(
                        '统一管理你的模型服务与接入。',
                        'Manage your model services and integrations.',
                      )}
              </p>
            </div>
            <Badge>
              <span className="cs-dot" />
              {t('本地演示', 'Local demo')}
            </Badge>
          </div>
          {!storageAvailable && (
            <div className="cs-callout">
              {t(
                '浏览器存储不可用，刷新后演示状态可能丢失。',
                'Browser storage is unavailable. Demo state may be lost on refresh.',
              )}
            </div>
          )}
          {error && !modal && (
            <div className="cs-error" role="alert">
              <AlertCircle size={17} />
              {error}
            </div>
          )}
          {notice && !modal && (
            <output className="cs-notice">
              <Check size={16} />
              {notice}
            </output>
          )}
          {path === 'usage' ? (
            <UsagePage {...p} />
          ) : path === 'coding-plan' ? (
            <PlanPage {...p} />
          ) : path === 'models' ? (
            <ModelsPage {...p} />
          ) : path === 'api-keys' ? (
            <KeysPage {...p} />
          ) : path === 'integrations' ? (
            <IntegrationsPage {...p} />
          ) : path === 'billing/balance' ? (
            <BalancePage {...p} />
          ) : path === 'billing/orders' ? (
            <OrdersPage {...p} />
          ) : path === 'settings' ? (
            <SettingsPage {...p} />
          ) : (
            <Empty
              title={t('页面未找到', 'Page not found')}
              detail={t(
                '请从侧栏选择页面。',
                'Choose a page from the sidebar.',
              )}
              href={`${demoRoot}/usage`}
              label={t('返回用量信息', 'Back to usage')}
            />
          )}
          <footer className="cs-footer">
            <span>© 2026 AURINOVA · FormSy</span>
            <span>
              {t(
                '团队、任务验证和上下文资产将分阶段开放。',
                'Teams, task verification and context assets will follow in stages.',
              )}
            </span>
          </footer>
        </main>
      </div>
      {modal && (
        <Dialog
          title={modalTitle}
          onClose={() => {
            setModal(null);
            setError('');
          }}
        >
          {error && (
            <div className="cs-error" role="alert">
              {error}
            </div>
          )}
          {modal.kind === 'key' ? (
            <KeyDialog {...p} />
          ) : modal.kind === 'secret' ? (
            <>
              <p>
                {t(
                  '此标识仅作演示，关闭后列表只展示尾号。',
                  'This is a demo identifier. Only its suffix is shown after closing.',
                )}
              </p>
              <pre className="cs-code">{modal.secret}</pre>
              <CopyButton
                value={modal.secret}
                label={t('复制', 'Copy')}
                copiedLabel={t('已复制', 'Copied')}
              />
              <Button
                className="cs-button primary"
                onClick={() => setModal(null)}
              >
                {t('我已了解', 'Understood')}
              </Button>
            </>
          ) : modal.kind === 'confirm' ? (
            <>
              <p>{modal.body}</p>
              <div className="cs-inline-actions">
                <Button className="cs-button" onClick={() => setModal(null)}>
                  {t('取消', 'Cancel')}
                </Button>
                <Button className="cs-button primary" onClick={modal.run}>
                  {t('确认', 'Confirm')}
                </Button>
              </div>
            </>
          ) : modal.kind === 'request' ? (
            <>
              <dl className="cs-details">
                {[
                  ['ID', modal.item.id],
                  [t('模型', 'Model'), modelName(modal.item.model)],
                  [
                    t('计费来源', 'Billing source'),
                    sourceName(modal.item.funding, t),
                  ],
                  [
                    t(
                      '输入 / 缓存输入 / 输出',
                      'Input / cached input / output',
                    ),
                    `${modal.item.input} / ${modal.item.cached} / ${modal.item.output}`,
                  ],
                  [
                    t('点数 / 金额', 'Credits / amount'),
                    `${modal.item.points} / ${money(modal.item.cents)}`,
                  ],
                  [t('时延', 'Latency'), `${modal.item.latency} ms`],
                  [
                    t('任务验证', 'Task verification'),
                    t(
                      '无任务证据，不计算完成率',
                      'No task evidence; completion rate is not calculated',
                    ),
                  ],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
            </>
          ) : order ? (
            <>
              <p className="cs-callout">
                {t(
                  '本地模拟，不会收取任何费用。',
                  'Local simulation. No money will be charged.',
                )}
              </p>
              <dl className="cs-details">
                <div>
                  <dt>{t('订单 ID', 'Order ID')}</dt>
                  <dd className="cs-mono">{order.id}</dd>
                </div>
                <div>
                  <dt>{t('内容', 'Item')}</dt>
                  <dd>
                    {order.kind === 'topup'
                      ? t('API 充值', 'API top-up')
                      : `Coding Plan · ${order.plan}`}
                  </dd>
                </div>
                <div>
                  <dt>{t('演示金额', 'Illustrative amount')}</dt>
                  <dd>{money(order.cents)} CNY</dd>
                </div>
                <div>
                  <dt>{t('状态', 'Status')}</dt>
                  <dd>
                    {order.status === 'paid'
                      ? t('已完成', 'Paid')
                      : order.status === 'pending'
                        ? t('待处理', 'Pending')
                        : order.status === 'failed'
                          ? t('失败', 'Failed')
                          : t('已取消', 'Cancelled')}
                  </dd>
                </div>
              </dl>
              {order.kind === 'upgrade' && (
                <p>
                  {t(
                    '差价与新增额度按当前周期剩余时长计算，当前用量不重置。',
                    'Price and added credits are prorated for the remaining cycle. Existing usage is preserved.',
                  )}
                </p>
              )}
              {order.status === 'pending' ? (
                <div className="cs-inline-actions">
                  <Button
                    className="cs-button primary"
                    onClick={() => {
                      if (act({ type: 'pay', id: order.id, result: 'paid' }))
                        setNotice(
                          t('已模拟支付成功', 'Payment success simulated'),
                        );
                    }}
                  >
                    {t('模拟支付成功', 'Simulate success')}
                  </Button>
                  <Button
                    className="cs-button"
                    onClick={() =>
                      act({ type: 'pay', id: order.id, result: 'failed' })
                    }
                  >
                    {t('模拟失败', 'Simulate failure')}
                  </Button>
                  <Button
                    className="cs-button"
                    onClick={() =>
                      act({ type: 'pay', id: order.id, result: 'cancelled' })
                    }
                  >
                    {t('关闭订单', 'Cancel order')}
                  </Button>
                </div>
              ) : (
                <output className="cs-notice">
                  {order.status === 'paid'
                    ? t(
                        '演示权益已更新，可创建 Key 或验证调用。',
                        'Demo benefits updated. Create a key or test a request.',
                      )
                    : t(
                        '订单已结束，未增加权益。',
                        'Order closed without granting benefits.',
                      )}
                </output>
              )}
            </>
          ) : null}
        </Dialog>
      )}
    </div>
  );
}
export default function ConsolePage() {
  const { locale } = useI18n();
  const t: T = (zh, en) => (locale === 'zh-CN' ? zh : en);
  const session = useSession();
  const { pathname, search } = useLocation();
  const demo = pathname === demoRoot || pathname.startsWith(`${demoRoot}/`);
  if (demo) return <ConsoleDemo />;
  return (
    <main className="cs-gate">
      <Link href="/">
        <Image
          src={withBasePath('/aurinova-logo.svg')}
          alt="AURINOVA"
          width={220}
          height={38}
        />
      </Link>
      <section className="cs-card">
        <Badge>FORMSY CONSOLE</Badge>
        <h1>
          {session.status === 'loading'
            ? t('正在验证会话', 'Checking your session')
            : session.status === 'authenticated'
              ? t('控制台服务待接入', 'Console service connection pending')
              : t('进入 FormSy 控制台', 'Enter the FormSy console')}
        </h1>
        <p>
          {session.status === 'error'
            ? t(
                '暂时无法验证登录状态。请重试；演示空间可独立访问。',
                'Your session could not be verified. Retry, or explore the independent demo.',
              )
            : session.status === 'authenticated'
              ? t(
                  '身份已验证，真实模型与计费服务尚未接入。可先查看独立演示。',
                  'Your identity is verified. Live model and billing services are not connected. Explore the isolated demo.',
                )
              : t(
                  '真实控制台需要身份与业务后端。你可以继续登录，或无需账号体验演示。',
                  'The live console requires identity and business services. Continue to login or explore without an account.',
                )}
        </p>
        <div className="cs-inline-actions">
          {session.status === 'error' ? (
            <Button
              className="cs-button"
              onClick={() => void session.refresh()}
            >
              {t('重试', 'Retry')}
            </Button>
          ) : session.status !== 'authenticated' &&
            session.status !== 'loading' ? (
            <Link
              className="cs-button"
              href={`/aurinova-reference/login?return_to=${encodeURIComponent(pathname + search)}`}
            >
              {t('登录 / 注册', 'Log in / sign up')}
            </Link>
          ) : null}
          <Link className="cs-button primary" href={`${demoRoot}/usage`}>
            {t('体验交互演示', 'Explore interactive demo')}
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}
