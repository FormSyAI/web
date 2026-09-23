import { Button } from '@/components/ui/button';
import { ChevronDown, Menu, X } from 'lucide-react';
import Image from '@/components/runtime/app-image';
import { AppLink as Link } from '@/components/runtime/app-link';
import { useState } from 'react';

import { useSession } from '@/components/auth/session-provider';
import { useI18n } from '@/components/i18n/i18n-provider';
import { LanguageSwitcher } from '@/components/i18n/language-switcher';
import { aurinovaReferenceDictionaries } from '@/content/aurinova-reference.i18n';

export function AurinovaReferenceHeader({
  current,
}: {
  current?: 'pricing' | 'careers';
  dark?: boolean;
}) {
  const { locale } = useI18n();
  const { status: sessionStatus } = useSession();
  const content = aurinovaReferenceDictionaries[locale];
  const [mobileOpen, setMobileOpen] = useState(false);
  const isCurrent = (href: string) =>
    (current === 'pricing' && href.includes('pricing')) ||
    (current === 'careers' && href.includes('careers'));

  const headerClassName = ['fw-header', 'fw-header--dark'].join(' ');
  const logoSrc = content.meta.headerLogo;

  return (
    <header className={headerClassName}>
      <div className="fw-header-inner">
        <Link
          className="fw-brand"
          href="/aurinova-reference"
          aria-label={content.ui.homeLabel}
        >
          <Image
            className="fw-site-logo"
            src={logoSrc}
            width={270}
            height={35}
            priority
            unoptimized
            alt="AURINOVA 锦曜新宸"
          />
        </Link>
        <nav aria-label={content.ui.navigationLabel}>
          {content.navigation.map((item) =>
            'children' in item && item.children ? (
              <div className="fw-nav-item fw-nav-dropdown" key={item.href}>
                <Link
                  className="fw-nav-parent"
                  href={item.href}
                  aria-haspopup="menu"
                  aria-current={current === 'careers' ? 'page' : undefined}
                >
                  {item.label}
                  <ChevronDown size={15} />
                </Link>
                <div className="fw-dropdown-menu fw-contact-menu">
                  {item.children.map((child) => (
                    <Link
                      href={child.href}
                      key={child.href}
                      aria-current={isCurrent(child.href) ? 'page' : undefined}
                    >
                      <strong>{child.label}</strong>
                      <span>{child.description}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                href={item.href}
                key={item.href}
                aria-current={isCurrent(item.href) ? 'page' : undefined}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>
        <div className="fw-header-actions">
          <LanguageSwitcher labels={content.ui} />
          {sessionStatus === 'authenticated' && (
            <Link className="fw-primary-button" href="/console/usage">
              {locale === 'zh-CN' ? '进入控制台' : 'Console'}
            </Link>
          )}
          <Button
            variant="brand"
            className="fw-mobile-trigger"
            type="button"
            aria-label={
              mobileOpen
                ? content.ui.closeNavigation
                : content.ui.openNavigation
            }
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
      {mobileOpen && (
        <div className="fw-mobile-menu">
          <LanguageSwitcher compact labels={content.ui} />
          {content.navigation.flatMap((item) => {
            const children =
              'children' in item && item.children ? item.children : [];
            return [
              { label: item.label, href: item.href },
              ...children.map((child) => ({
                label: child.label,
                href: child.href,
              })),
            ];
          }).map((item) => (
            <Link
              href={item.href}
              key={item.href}
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
