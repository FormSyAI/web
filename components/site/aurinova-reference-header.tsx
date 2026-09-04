'use client';

import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';

import { useI18n } from '@/components/i18n/i18n-provider';
import { LanguageSwitcher } from '@/components/i18n/language-switcher';
import { AurinovaArtworkImage } from '@/components/site/aurinova-artwork-image';
import {
  aurinovaReferenceDictionaries,
  type AurinovaMenuKey,
  type AurinovaReferenceContent,
} from '@/content/aurinova-reference.i18n';

const modelLogos = {
  deepseek:
    'https://cdn.sanity.io/images/pv37i0yn/production/cc90788a38550199abccf713bc06d799a4e667a7-40x40.svg',
  glm: 'https://cdn.sanity.io/images/pv37i0yn/production/71e5ae43c4d8d32c711ba8f04d52f0dd70f39982-200x200.png?auto=format',
  kimi: 'https://cdn.sanity.io/images/pv37i0yn/production/eadd3c2ed50ecd13ad2917cd46ac4ee71824d786-1024x1024.png?auto=format',
  minimax:
    'https://cdn.sanity.io/images/pv37i0yn/production/b6629409bd0b02c391af354e9251b5493ec1f0af-400x400.jpg?auto=format',
  qwen: 'https://cdn.sanity.io/images/pv37i0yn/production/e83bb902c91d9a285108cc53efd4b19389b7fa4d-228x232.svg',
  google:
    'https://cdn.sanity.io/images/pv37i0yn/production/bb8d628c4ad0b774525ad765138a7b85c4fa4c0f-40x40.svg',
  openai:
    'https://cdn.sanity.io/images/pv37i0yn/production/f549e0e24c286535bc06df0b0310d270183469e8-40x40.svg',
  flux: 'https://cdn.sanity.io/images/pv37i0yn/production/ac4f278bca97db5305dc57517631971c55d20c47-40x40.svg',
  nvidia:
    'https://cdn.sanity.io/images/pv37i0yn/production/024c5d9c1e834937377c6d297ae4c1d4e044a590-1290x726.png?auto=format',
} as const;

export function aurinovaModelLogo(name: string) {
  const normalized = name.toLowerCase();
  if (normalized.includes('deepseek')) return modelLogos.deepseek;
  if (normalized.includes('glm')) return modelLogos.glm;
  if (normalized.includes('kimi')) return modelLogos.kimi;
  if (normalized.includes('minimax')) return modelLogos.minimax;
  if (normalized.includes('qwen')) return modelLogos.qwen;
  if (normalized.includes('gemma'))
    return normalized.includes('31b') ? modelLogos.nvidia : modelLogos.google;
  if (normalized.includes('flux')) return modelLogos.flux;
  return modelLogos.openai;
}

function MenuLink({
  href,
  children,
  className,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick: () => void;
}) {
  return (
    <a className={className} href={href} onClick={onClick}>
      {children}
    </a>
  );
}

function MegaMenu({
  content,
  isClosing,
  name,
  onNavigate,
}: {
  content: AurinovaReferenceContent;
  isClosing: boolean;
  name: AurinovaMenuKey;
  onNavigate: () => void;
}) {
  const menu = content.megaMenus[name];
  const menuStateClass = isClosing ? ' is-closing' : '';

  if (menu.kind === 'product') {
    return (
      <div className={`fw-mega-menu fw-product-menu${menuStateClass}`}>
        <div className="fw-mega-list">
          {menu.links.map((item) => (
            <MenuLink href={item.href} onClick={onNavigate} key={item.label}>
              <strong>{item.label}</strong>
              <span>{item.description}</span>
            </MenuLink>
          ))}
        </div>
        <MenuLink
          className="fw-menu-feature"
          href={menu.feature.href}
          onClick={onNavigate}
        >
          <strong>{menu.feature.label}</strong>
          <p>“{menu.feature.quote}”</p>
          <span>{menu.feature.person}</span>
        </MenuLink>
      </div>
    );
  }

  if (menu.kind === 'solutions') {
    return (
      <div className={`fw-mega-menu fw-solutions-menu${menuStateClass}`}>
        <div className="fw-audience-list">
          {menu.audiences.map((item) => (
            <MenuLink href={item.href} onClick={onNavigate} key={item.label}>
              {item.label}
              <ArrowRight size={18} />
            </MenuLink>
          ))}
        </div>
        <div className="fw-usecase-list">
          <p>{content.ui.useCases}</p>
          {menu.cases.map((item) => (
            <MenuLink href={item.href} onClick={onNavigate} key={item.label}>
              {item.label}
              <ArrowRight size={16} />
            </MenuLink>
          ))}
        </div>
      </div>
    );
  }

  if (menu.kind === 'models') {
    return (
      <div className={`fw-mega-menu fw-model-menu${menuStateClass}`}>
        <MenuLink
          className="fw-library-link"
          href={menu.library.href}
          onClick={onNavigate}
        >
          {menu.library.label}
          <ArrowRight size={18} />
        </MenuLink>
        <div>
          {menu.items.map((item) => (
            <MenuLink href={item.href} onClick={onNavigate} key={item.label}>
              <Image
                src={aurinovaModelLogo(item.label)}
                width={28}
                height={28}
                unoptimized
                alt=""
              />
              {item.label}
            </MenuLink>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`fw-mega-menu fw-resource-menu${menuStateClass}`}>
      <div>
        <h3>{content.ui.resources}</h3>
        <p>{menu.intro}</p>
        <div className="fw-menu-link-grid">
          {menu.resources.map((item) => (
            <MenuLink href={item.href} onClick={onNavigate} key={item.label}>
              {item.label}
              <ArrowRight size={15} />
            </MenuLink>
          ))}
        </div>
      </div>
      <div>
        <h3>{content.ui.company}</h3>
        <p>{content.ui.companyDescription}</p>
        <div className="fw-menu-link-grid">
          {menu.company.map((item) => (
            <MenuLink href={item.href} onClick={onNavigate} key={item.label}>
              {item.label}
              <ArrowRight size={15} />
            </MenuLink>
          ))}
        </div>
      </div>
      <div className="fw-featured-resources">
        <h3>{content.ui.featuredResources}</h3>
        {menu.featured.map((item) => (
          <MenuLink href={item.href} onClick={onNavigate} key={item.title}>
            <span className="fw-featured-image">
              <AurinovaArtworkImage
                src={item.image}
                alt=""
                sizes="240px"
              />
            </span>
            <small>{item.type}</small>
            <strong>{item.title}</strong>
          </MenuLink>
        ))}
      </div>
    </div>
  );
}

export function AurinovaReferenceHeader({ current }: { current?: 'pricing' }) {
  const { locale } = useI18n();
  const content = aurinovaReferenceDictionaries[locale];
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<AurinovaMenuKey | null>(null);
  const [isMenuClosing, setIsMenuClosing] = useState(false);
  const desktopNav = useRef<HTMLElement>(null);
  const closeDelayTimer = useRef<number | null>(null);
  const exitTimer = useRef<number | null>(null);

  const clearMenuTimers = useCallback(() => {
    if (closeDelayTimer.current !== null) {
      window.clearTimeout(closeDelayTimer.current);
      closeDelayTimer.current = null;
    }
    if (exitTimer.current !== null) {
      window.clearTimeout(exitTimer.current);
      exitTimer.current = null;
    }
  }, []);

  const openMenuNow = useCallback(
    (menuKey: AurinovaMenuKey) => {
      clearMenuTimers();
      setIsMenuClosing(false);
      setOpenMenu(menuKey);
    },
    [clearMenuTimers],
  );

  const closeMenuNow = useCallback(() => {
    clearMenuTimers();
    setIsMenuClosing(false);
    setOpenMenu(null);
  }, [clearMenuTimers]);

  const cancelMenuClose = useCallback(() => {
    clearMenuTimers();
    setIsMenuClosing(false);
  }, [clearMenuTimers]);

  const closeMenuSoon = useCallback(() => {
    clearMenuTimers();
    closeDelayTimer.current = window.setTimeout(() => {
      setIsMenuClosing(true);
      exitTimer.current = window.setTimeout(() => {
        setOpenMenu(null);
        setIsMenuClosing(false);
        exitTimer.current = null;
      }, 140);
      closeDelayTimer.current = null;
    }, 220);
  }, [clearMenuTimers]);

  useEffect(() => {
    const nav = desktopNav.current;
    if (!nav) return clearMenuTimers;

    const closeAfterFocusLeaves = (event: FocusEvent) => {
      if (!nav.contains(event.relatedTarget as Node | null)) closeMenuNow();
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeMenuNow();
    };

    nav.addEventListener('pointerenter', cancelMenuClose);
    nav.addEventListener('pointerleave', closeMenuSoon);
    nav.addEventListener('focusout', closeAfterFocusLeaves);
    nav.addEventListener('keydown', closeOnEscape);
    return () => {
      nav.removeEventListener('pointerenter', cancelMenuClose);
      nav.removeEventListener('pointerleave', closeMenuSoon);
      nav.removeEventListener('focusout', closeAfterFocusLeaves);
      nav.removeEventListener('keydown', closeOnEscape);
      clearMenuTimers();
    };
  }, [cancelMenuClose, clearMenuTimers, closeMenuNow, closeMenuSoon]);

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
          <nav
            ref={desktopNav}
            aria-label={content.ui.navigationLabel}
          >
            {content.navigation.map((item) =>
              'menuKey' in item ? (
                <div
                  className="fw-nav-item"
                  key={item.label}
                >
                  <button
                    type="button"
                    aria-expanded={openMenu === item.menuKey}
                    aria-haspopup="true"
                    onMouseEnter={() => openMenuNow(item.menuKey)}
                    onClick={() => {
                      if (openMenu === item.menuKey) {
                        closeMenuNow();
                      } else {
                        openMenuNow(item.menuKey);
                      }
                    }}
                    onFocus={() => openMenuNow(item.menuKey)}
                  >
                    {item.label}
                    <ChevronDown size={15} />
                  </button>
                  {openMenu === item.menuKey && (
                    <MegaMenu
                      content={content}
                      isClosing={isMenuClosing}
                      name={item.menuKey}
                      onNavigate={closeMenuNow}
                    />
                  )}
                </div>
              ) : (
                <Link
                  href={item.href}
                  key={item.label}
                  aria-current={isCurrent(item.href) ? 'page' : undefined}
                  onFocus={closeMenuNow}
                >
                  {item.label}
                </Link>
              ),
            )}
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
