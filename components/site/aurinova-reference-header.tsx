'use client';

import { ArrowRight, Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { useI18n } from '@/components/i18n/i18n-provider';
import { LanguageSwitcher } from '@/components/i18n/language-switcher';
import { aurinovaReferenceDictionaries } from '@/content/aurinova-reference.i18n';

export function AurinovaReferenceHeader({ current }: { current?: 'pricing' }) {
  const { locale } = useI18n();
  const content = aurinovaReferenceDictionaries[locale];
  const [mobileOpen, setMobileOpen] = useState(false);

  const isCurrent = (href: string) =>
    current === 'pricing' && href.includes('pricing');

  return (
    <>
      <section
        className="fw-announcement-wrap"
        aria-label={content.ui.announcementLabel}
      >
        <Link className="fw-announcement" href={content.announcement.href}>
          {content.announcement.label}
          <ArrowRight size={19} />
        </Link>
      </section>
      <header className="fw-header">
        <div className="fw-header-inner">
          <Link
            className="fw-brand"
            href="/aurinova-reference"
            aria-label={content.ui.homeLabel}
          >
            <Image
              className="fw-site-logo"
              src={content.meta.headerLogo}
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
            <Link href="/login">{content.ui.login}</Link>
            <Link className="fw-primary-button" href="/signup">
              {content.ui.getStarted}
            </Link>
            <button
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
            </button>
          </div>
        </div>
        {mobileOpen && (
          <div className="fw-mobile-menu">
            <LanguageSwitcher compact labels={content.ui} />
            {content.ui.mobileLinks.map((item) => (
              <Link
                href={item.href}
                key={item.href}
                onClick={() => setMobileOpen(false)}
                aria-current={isCurrent(item.href) ? 'page' : undefined}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </header>
    </>
  );
}
