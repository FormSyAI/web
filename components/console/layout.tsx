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
  UserRound,
  X,
} from 'lucide-react';
import { useState } from 'react';

import { demoRoot, navIcons, type T } from '@/components/console/content';

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
  const { locale } = useI18n();
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
        <Link className="cs-brand" href={`${demoRoot}/usage`}>
          <Image
            src={withBasePath('/aurinova-logo.svg')}
            alt="AURINOVA"
            width={168}
            height={29}
          />
          <span>FORMSY CONSOLE</span>
        </Link>
        <Button
          className="cs-icon-button cs-mobile-only cs-sidebar-close"
          onClick={() => setMobile(false)}
          aria-label={t('关闭菜单', 'Close menu')}
        >
          <X size={18} />
        </Button>
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
          <Link
            className="cs-sidebar-account"
            href={`${demoRoot}/settings`}
            aria-current={path === 'settings' ? 'page' : undefined}
          >
            <span className="cs-sidebar-account-avatar" aria-hidden="true">
              <UserRound />
            </span>
            <span>{state.profile.name}</span>
          </Link>
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
          {path !== 'settings' && <ConsolePageHeader title={title} />}
          {children}
        </main>
      </div>
    </>
  );
}
function ConsolePageHeader({ title }: { title: string }) {
  return (
    <div className="cs-page-heading">
      <h1>{title}</h1>
    </div>
  );
}
