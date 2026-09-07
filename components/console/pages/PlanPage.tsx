import { Button } from '@/components/console/primitives';
import { AppLink as Link } from '@/components/runtime/app-link';
import { plans, quota } from '@/lib/console/domain';
import { ArrowRight, ArrowUpRight, Check, FlaskConical } from 'lucide-react';

import {
  Badge,
  date,
  demoRoot,
  Metric,
  money,
  number,
  OrderButton,
  type PageProps,
} from '@/components/console/content';
export function PlanPage(p: PageProps) {
  const { state, t, act, setModal } = p;
  const q = quota(state),
    sub = state.subscription;
  return (
    <>
      <div className="cs-callout">
        <FlaskConical size={18} />
        {t(
          '套餐价格、额度和周期以正式开放信息为准。',
          'Plan prices, quotas and periods are subject to launch availability.',
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
              hint={t('周期：30 天', 'Cycle: 30 days')}
            />
          </div>
          <div className="cs-inline-actions">
            <Badge tone="cs-renewal-status">
              {sub.renew
                ? t('已开启续费提醒', 'Renewal reminder enabled')
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
                      '续费提醒不会触发自动付款，当前周期权益保持有效。',
                      'Renewal reminders do not trigger automatic payment; current benefits remain active.',
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
                {t('续费', 'Renew plan')}
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
              <small> / {t('30 天', '30 days')}</small>
            </div>
            <ul className="cs-checklist">
              {[
                `${number(plans[id].points)} ${t('周期点数', 'credits per cycle')}`,
                `${number(plans[id].window)} ${t('点 / 5 小时', 'credits / 5 hours')}`,
                `${plans[id].concurrency} ${t('并发上限（生产待验证）', 'concurrent requests (production unverified)')}`,
                id === 'pro'
                  ? t('全部目录模型', 'All catalog models')
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
                  ? t('升级套餐', 'Upgrade plan')
                  : t('开通套餐', 'Activate plan')}
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
              '额度按周期重置且不结转。升级按剩余周期计算差价和新增额度，不重置已用点数。关闭提醒不会结束当前周期，也不代表退款。销售规则将在服务开放前公布。',
              'Credits reset each cycle without rollover. Upgrades prorate the price and added credits while preserving usage. Cancelling a reminder does not end the current cycle or issue a refund. Sale terms will be published before launch.',
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
