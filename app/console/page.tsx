import { useSession } from '@/components/auth/session-provider';
import { ConsoleLayout } from '@/components/console/layout';
import { Button, CopyButton, Dialog } from '@/components/console/primitives';
import { useI18n } from '@/components/i18n/i18n-provider';
import Image from '@/components/runtime/app-image';
import { AppLink as Link, withBasePath } from '@/components/runtime/app-link';
import { consoleErrors, consoleNavigation } from '@/content/console.i18n';
import { demoAction, useDemoState } from '@/lib/console/demo-store';
import { ConsoleError, type Action } from '@/lib/console/domain';
import { AlertCircle, ArrowRight, Check } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

import {
  Badge,
  demoRoot,
  Empty,
  modelName,
  money,
  sourceName,
  type Modal,
  type PageProps,
  type T,
} from '@/components/console/content';
import { BalancePage } from '@/components/console/pages/BalancePage';
import { IntegrationsPage } from '@/components/console/pages/IntegrationsPage';
import { KeyDialog } from '@/components/console/pages/KeyDialog';
import { KeysPage } from '@/components/console/pages/KeysPage';
import { ModelsPage } from '@/components/console/pages/ModelsPage';
import { OrdersPage } from '@/components/console/pages/OrdersPage';
import { PlanPage } from '@/components/console/pages/PlanPage';
import { SettingsPage } from '@/components/console/pages/SettingsPage';
import { UsagePage } from '@/components/console/pages/UsagePage';
import './console.css';
function ConsoleDemo() {
  const location = useLocation();
  const { locale } = useI18n();
  const t: T = (zh, en) => (locale === 'zh-CN' ? zh : en);
  const { state, storageAvailable } = useDemoState();
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
      setNotice(t('状态已更新', 'State updated'));
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
      ? t('创建 API Key', 'Create API key')
      : modal?.kind === 'secret'
        ? t('保存 API Key', 'Save API key')
        : modal?.kind === 'confirm'
          ? modal.title
          : modal?.kind === 'request'
            ? t('请求详情', 'Request details')
            : t('订单详情', 'Order details');
  return (
    <div className="cs-app">
      <ConsoleLayout state={state} title={title} path={path} t={t}>
        {!storageAvailable && (
          <div className="cs-callout">
            {t(
              '浏览器存储不可用，刷新后当前状态可能丢失。',
              'Browser storage is unavailable. Current state may be lost on refresh.',
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
            detail={t('请从侧栏选择页面。', 'Choose a page from the sidebar.')}
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
      </ConsoleLayout>
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
                  '请立即保存此标识，关闭后列表只展示尾号。',
                  'Save this identifier now. Only its suffix is shown after closing.',
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
                  '支付服务尚未接入，当前操作不会产生扣款。',
                  'Payment service is not connected; this action will not create a charge.',
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
                  <dt>{t('订单金额', 'Order amount')}</dt>
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
                        setNotice(t('订单已完成', 'Order completed'));
                    }}
                  >
                    {t('完成订单', 'Complete order')}
                  </Button>
                  <Button
                    className="cs-button"
                    onClick={() =>
                      act({ type: 'pay', id: order.id, result: 'failed' })
                    }
                  >
                    {t('标记失败', 'Mark as failed')}
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
                        '权益已更新，可创建 Key 或验证调用。',
                        'Benefits updated. Create a key or test a request.',
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
                '暂时无法验证登录状态，请重试。',
                'Your session could not be verified. Please retry.',
              )
            : session.status === 'authenticated'
              ? t(
                  '身份已验证，模型与计费服务正在接入。',
                  'Your identity is verified. Model and billing services are being connected.',
                )
              : t(
                  '登录后管理模型、额度、API Key 与账户信息。',
                  'Log in to manage models, credits, API keys and account information.',
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
            {t('进入控制台', 'Open console')}
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}
