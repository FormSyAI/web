import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
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
  current?: 'pricing';
  dark?: boolean;
}) {
  const { locale } = useI18n();
  const { status: sessionStatus } = useSession();
  const content = aurinovaReferenceDictionaries[locale];
  const [mobileOpen, setMobileOpen] = useState(false);
  const isCurrent = (href: string) =>
    current === 'pricing' && href.includes('pricing');

  const headerClassName = ['fw-header', 'fw-header--dark'].join(' ');
  const logoSrc = '/aurinova-logo-on-dark.svg';

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
            width={228}
            height={39}
            priority
            unoptimized
            alt="AURINOVA"
          />
        </Link>
        <nav aria-label={content.ui.navigationLabel}>
          {content.navigation.map((item) => (
            <Link
              href={item.href}
              key={item.label}
              aria-current={isCurrent(item.href) ? 'page' : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="fw-header-actions">
          <LanguageSwitcher labels={content.ui} />
          {sessionStatus === 'authenticated' ? (
            <Link className="fw-primary-button" href="/console/usage">
              {locale === 'zh-CN' ? '进入控制台' : 'Console'}
            </Link>
          ) : (
            <Link
              className="fw-primary-button"
              href="/aurinova-reference/signup"
            >
              {content.ui.signup}
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
          {content.navigation.map((item) => (
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
