import { Button } from '@/components/console/primitives';
import { ConsoleSidebar } from '@/components/console/sidebar';
import { useI18n } from '@/components/i18n/i18n-provider';
import Image from '@/components/runtime/app-image';
import { AppLink as Link, withBasePath } from '@/components/runtime/app-link';
import { consoleNavigation } from '@/content/console.i18n';
import {
  ArrowUpRight,
  BookOpen,
  ChevronRight,
  ExternalLink,
  House,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';

import {
  Badge,
  demoRoot,
  navIcons,
  type T,
} from '@/components/console/content';

import type { ConsoleState } from '@/lib/console/domain';
import type { ReactNode } from 'react';
export function ConsoleLayout({
  state,
  title,
  path,
  t,
  children,
}: {
  state: ConsoleState;
  title: string;
  path: string;
  t: T;
  children: ReactNode;
}) {
  const { locale, toggleLocale } = useI18n();
  const [mobile, setMobile] = useState(false);
  return (
    <>
      {' '}
      <a className="skip-link" href="#console-main">
        {t('跳转到内容', 'Skip to content')}
      </a>
      <ConsoleSidebar
        open={mobile}
        onOpenChange={setMobile}
        label={t('控制台导航', 'Console navigation')}
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
          <div className="cs-sidebar-account">
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
        </div>
      </ConsoleSidebar>
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
        </header>
        <main id="console-main" className="cs-main">
          <ConsolePageHeader title={title} path={path} t={t} />
          {children}
        </main>
      </div>
    </>
  );
}
function ConsolePageHeader({
  title,
  path,
  t,
}: {
  title: string;
  path: string;
  t: T;
}) {
  return (
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
  );
}
