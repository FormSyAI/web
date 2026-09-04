'use client';

import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  Menu,
  MessageSquareText,
  Mic2,
  Play,
  ScanEye,
  X,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import { LanguageSwitcher } from '@/components/i18n/language-switcher';
import { useI18n } from '@/components/i18n/i18n-provider';
import {
  fireworksReferenceDictionaries,
  type FireworksMenuKey,
  type FireworksReferenceContent,
} from '@/content/fireworks-reference.i18n';

const tokenHeights = [
  7, 11, 16, 21, 17, 12, 7, 4, 9, 17, 15, 19, 22, 27, 32, 37, 34, 31, 38, 43,
  48, 52, 58, 55, 52, 57, 63, 68, 72, 76, 72, 80, 76, 74, 82, 86,
];
const spendHeights = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 5, 9, 16, 14, 11, 20,
  24, 30, 43, 26, 34, 29, 21, 15, 11, 8, 6,
];

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

function modelLogo(name: string) {
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

function officialHref(href: string) {
  return href.startsWith('/') ? `https://fireworks.ai${href}` : href;
}

function ExternalLink({
  href,
  children,
  className,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <a
      className={className}
      href={officialHref(href)}
      rel="noreferrer"
      target="_blank"
      onClick={onClick}
    >
      {children}
    </a>
  );
}

function FireworksMark() {
  return (
    <span className="fw-mark" aria-hidden="true">
      <i />
      <i />
      <i />
      <i />
      <i />
    </span>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  centered?: boolean;
}) {
  return (
    <div className={`fw-section-heading${centered ? ' is-centered' : ''}`}>
      <p>{eyebrow}</p>
      <h2>{title}</h2>
      {description && <span>{description}</span>}
    </div>
  );
}

function SpendChart({ ui }: { ui: FireworksReferenceContent['ui'] }) {
  return (
    <figure className="fw-spend-chart" aria-label={ui.chartLabel}>
      <span className="fw-corner fw-corner-tl" />
      <span className="fw-corner fw-corner-tr" />
      <span className="fw-corner fw-corner-bl" />
      <span className="fw-corner fw-corner-br" />
      <div className="fw-chart-legend">
        <span>
          <i className="is-token" />
          {ui.tokensUsed}
        </span>
        <span>
          <i className="is-spend" />
          {ui.aiSpend}
        </span>
      </div>
      <span className="fw-axis fw-axis-left">{ui.aiSpendAxis}</span>
      <span className="fw-axis fw-axis-right">{ui.totalTokensAxis}</span>
      <div className="fw-fireworks-pin">
        <FireworksMark />
        <i />
      </div>
      <div className="fw-bars" aria-hidden="true">
        {tokenHeights.map((height, index) => (
          <div className="fw-bar-column" key={`${height}-${index}`}>
            <span
              className="fw-token-stack"
              style={{ '--bar': height } as React.CSSProperties}
            />
            <span
              className="fw-spend-stack"
              style={{ '--bar': spendHeights[index] } as React.CSSProperties}
            />
          </div>
        ))}
      </div>
    </figure>
  );
}

function MegaMenu({
  content,
  name,
  onNavigate,
}: {
  content: FireworksReferenceContent;
  name: FireworksMenuKey;
  onNavigate: () => void;
}) {
  const menu = content.megaMenus[name];
  if (menu.kind === 'product') {
    return (
      <div className="fw-mega-menu fw-product-menu">
        <div className="fw-mega-list">
          {menu.links.map((item) => (
            <ExternalLink
              href={item.href}
              onClick={onNavigate}
              key={item.label}
            >
              <strong>{item.label}</strong>
              <span>{item.description}</span>
            </ExternalLink>
          ))}
        </div>
        <ExternalLink
          className="fw-menu-feature"
          href={menu.feature.href}
          onClick={onNavigate}
        >
          <strong>{menu.feature.label}</strong>
          <p>“{menu.feature.quote}”</p>
          <span>{menu.feature.person}</span>
        </ExternalLink>
      </div>
    );
  }
  if (menu.kind === 'solutions') {
    return (
      <div className="fw-mega-menu fw-solutions-menu">
        <div className="fw-audience-list">
          {menu.audiences.map((item) => (
            <ExternalLink
              href={item.href}
              onClick={onNavigate}
              key={item.label}
            >
              {item.label}
              <ArrowRight size={18} />
            </ExternalLink>
          ))}
        </div>
        <div className="fw-usecase-list">
          <p>{content.ui.useCases}</p>
          {menu.cases.map((item) => (
            <ExternalLink
              href={item.href}
              onClick={onNavigate}
              key={item.label}
            >
              {item.label}
              <ArrowRight size={16} />
            </ExternalLink>
          ))}
        </div>
      </div>
    );
  }
  if (menu.kind === 'models') {
    return (
      <div className="fw-mega-menu fw-model-menu">
        <ExternalLink
          className="fw-library-link"
          href={menu.library.href}
          onClick={onNavigate}
        >
          {menu.library.label}
          <ArrowRight size={18} />
        </ExternalLink>
        <div>
          {menu.items.map((item) => (
            <ExternalLink
              href={item.href}
              onClick={onNavigate}
              key={item.label}
            >
              <Image
                src={modelLogo(item.label)}
                width={28}
                height={28}
                unoptimized
                alt=""
              />
              {item.label}
            </ExternalLink>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="fw-mega-menu fw-resource-menu">
      <div>
        <h3>{content.ui.resources}</h3>
        <p>{menu.intro}</p>
        <div className="fw-menu-link-grid">
          {menu.resources.map((item) => (
            <ExternalLink
              href={item.href}
              onClick={onNavigate}
              key={item.label}
            >
              {item.label}
              <ArrowRight size={15} />
            </ExternalLink>
          ))}
        </div>
      </div>
      <div>
        <h3>{content.ui.company}</h3>
        <p>{content.ui.companyDescription}</p>
        <div className="fw-menu-link-grid">
          {menu.company.map((item) => (
            <ExternalLink
              href={item.href}
              onClick={onNavigate}
              key={item.label}
            >
              {item.label}
              <ArrowRight size={15} />
            </ExternalLink>
          ))}
        </div>
      </div>
      <div className="fw-featured-resources">
        <h3>{content.ui.featuredResources}</h3>
        {menu.featured.map((item) => (
          <ExternalLink href={item.href} onClick={onNavigate} key={item.title}>
            <span className="fw-featured-image">
              <Image src={item.image} alt="" fill sizes="240px" unoptimized />
            </span>
            <small>{item.type}</small>
            <strong>{item.title}</strong>
          </ExternalLink>
        ))}
      </div>
    </div>
  );
}

export default function FireworksReferencePage() {
  const { locale } = useI18n();
  const content = fireworksReferenceDictionaries[locale];
  const [openMenu, setOpenMenu] = useState<FireworksMenuKey | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [heroSlide, setHeroSlide] = useState(0);
  const modelRail = useRef<HTMLDivElement>(null);
  const customerRail = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (event: KeyboardEvent) =>
      event.key === 'Escape' && (setOpenMenu(null), setMobileOpen(false));
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);

  useEffect(() => {
    document.title = content.ui.pageTitle;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', content.ui.pageDescription);
  }, [content.ui.pageDescription, content.ui.pageTitle]);

  const scrollRail = (
    ref: React.RefObject<HTMLDivElement | null>,
    direction: number,
  ) => {
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)')
      .matches
      ? 'auto'
      : 'smooth';
    ref.current?.scrollBy({
      left: direction * Math.min(960, ref.current.clientWidth * 0.8),
      behavior,
    });
  };

  return (
    <main className="fw-page" id="fw-top">
      <a className="skip-link" href="#fw-main">
        {content.ui.skipToContent}
      </a>
      <section
        className="fw-announcement-wrap"
        aria-label={content.ui.announcementLabel}
      >
        <ExternalLink
          className="fw-announcement"
          href={content.announcement.href}
        >
          {content.announcement.label}
          <ArrowRight size={19} />
        </ExternalLink>
      </section>

      <header className="fw-header" onMouseLeave={() => setOpenMenu(null)}>
        <div className="fw-header-inner">
          <a
            className="fw-brand"
            href="#fw-top"
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
          </a>
          <nav aria-label={content.ui.navigationLabel}>
            {content.navigation.map((item) =>
              'menuKey' in item ? (
                <div
                  className="fw-nav-item"
                  key={item.label}
                  onMouseEnter={() => setOpenMenu(item.menuKey)}
                >
                  <button
                    type="button"
                    aria-expanded={openMenu === item.menuKey}
                    aria-haspopup="true"
                    onClick={() =>
                      setOpenMenu(
                        openMenu === item.menuKey ? null : item.menuKey,
                      )
                    }
                    onFocus={() => setOpenMenu(item.menuKey)}
                  >
                    {item.label}
                    <ChevronDown size={15} />
                  </button>
                  {openMenu === item.menuKey && (
                    <MegaMenu
                      content={content}
                      name={item.menuKey}
                      onNavigate={() => setOpenMenu(null)}
                    />
                  )}
                </div>
              ) : (
                <ExternalLink href={item.href} key={item.label}>
                  {item.label}
                </ExternalLink>
              ),
            )}
          </nav>
          <div className="fw-header-actions">
            <LanguageSwitcher labels={content.ui} />
            <ExternalLink href="https://fireworks.ai/login">
              {content.ui.login}
            </ExternalLink>
            <ExternalLink
              className="fw-primary-button"
              href="https://fireworks.ai/signup"
            >
              {content.ui.getStarted}
            </ExternalLink>
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
              <ExternalLink
                href={item.href}
                key={item.href}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </ExternalLink>
            ))}
          </div>
        )}
      </header>

      <div id="fw-main">
        <section className="fw-hero" onMouseEnter={() => setOpenMenu(null)}>
          {heroSlide === 0 ? (
            <div className="fw-shell fw-hero-grid fw-hero-slide" key="nexus">
              <div className="fw-hero-copy">
                <p className="fw-eyebrow">{content.hero.eyebrow}</p>
                <h1>{content.hero.title}</h1>
                <p className="fw-lead">{content.hero.description}</p>
                <div className="fw-actions">
                  <ExternalLink
                    className="fw-primary-button"
                    href={content.hero.primary.href}
                  >
                    {content.hero.primary.label}
                  </ExternalLink>
                  <ExternalLink
                    className="fw-secondary-button"
                    href={content.hero.secondary.href}
                  >
                    {content.hero.secondary.label}
                  </ExternalLink>
                </div>
              </div>
              <div className="fw-chart-wrap">
                <SpendChart ui={content.ui} />
              </div>
            </div>
          ) : (
            <div className="fw-shell fw-hero-grid fw-hero-slide" key="future">
              <div className="fw-hero-copy">
                <p className="fw-eyebrow">{content.secondHero.eyebrow}</p>
                <h1 className="fw-multiline-title">
                  {content.secondHero.title}
                </h1>
                <p className="fw-lead">{content.secondHero.description}</p>
                <div className="fw-actions">
                  <ExternalLink
                    className="fw-primary-button"
                    href={content.secondHero.primary.href}
                  >
                    {content.secondHero.primary.label}
                  </ExternalLink>
                  <ExternalLink
                    className="fw-secondary-button"
                    href={content.secondHero.secondary.href}
                  >
                    {content.secondHero.secondary.label}
                  </ExternalLink>
                </div>
              </div>
              <div className="fw-hero-art">
                <Image
                  src={content.secondHero.image}
                  alt={content.ui.secondHeroImageAlt}
                  fill
                  priority
                  sizes="(max-width: 960px) 100vw, 663px"
                  unoptimized
                />
              </div>
            </div>
          )}
          <div className="fw-hero-dots" aria-label={content.ui.heroSlides}>
            <button
              type="button"
              aria-label={content.ui.showNexusSlide}
              aria-pressed={heroSlide === 0}
              onClick={() => setHeroSlide(0)}
            />
            <button
              type="button"
              aria-label={content.ui.showSpecializedSlide}
              aria-pressed={heroSlide === 1}
              onClick={() => setHeroSlide(1)}
            />
          </div>
        </section>

        <section
          className="fw-logo-wall"
          aria-label={content.ui.selectedCustomers}
        >
          <div className="fw-logo-track">
            {[...content.logos, ...content.logos].map((logo, index) => (
              <span key={`${logo.alt}-${index}`}>
                <Image
                  src={logo.src}
                  alt={index < content.logos.length ? logo.alt : ''}
                  width={112}
                  height={32}
                  unoptimized
                />
              </span>
            ))}
          </div>
        </section>

        <section className="fw-gtc">
          <div className="fw-shell fw-gtc-grid">
            <div className="fw-gtc-copy">
              <p className="fw-eyebrow">{content.gtc.eyebrow}</p>
              <h2>{content.gtc.title}</h2>
              <span>{content.gtc.description}</span>
            </div>
            <ExternalLink className="fw-video" href="https://fireworks.ai/">
              <Image
                src={content.gtc.image}
                alt={content.ui.gtcImageAlt}
                fill
                sizes="(max-width: 960px) 100vw, 469px"
                unoptimized
              />
              <span>
                <Play fill="currentColor" size={22} />
              </span>
            </ExternalLink>
          </div>
        </section>

        <section className="fw-platform" id="platform">
          <div className="fw-shell fw-bordered-shell">
            <SectionHeading
              eyebrow={content.platform.eyebrow}
              title={content.platform.title}
              description={content.platform.description}
            />
            <div className="fw-pillar-grid">
              {content.platform.pillars.map((pillar) => (
                <article className="fw-pillar" key={pillar.name}>
                  <div className="fw-pillar-title">
                    <span>{pillar.index}</span>
                    <div>
                      <p>{pillar.audience}</p>
                      <h3>{pillar.name}</h3>
                    </div>
                  </div>
                  <p className="fw-pillar-description">{pillar.description}</p>
                  <ul>
                    {pillar.modes.map((mode) => (
                      <li key={mode}>{mode}</li>
                    ))}
                  </ul>
                  <div className="fw-pillar-actions">
                    <ExternalLink
                      className={
                        pillar.index === '01'
                          ? 'fw-light-button'
                          : 'fw-primary-button'
                      }
                      href={pillar.primary.href}
                    >
                      {pillar.primary.label}
                    </ExternalLink>
                    <ExternalLink
                      className="fw-secondary-button"
                      href={pillar.secondary.href}
                    >
                      {pillar.secondary.label}
                    </ExternalLink>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="fw-models" id="models">
          <div className="fw-shell fw-bordered-shell">
            <SectionHeading
              centered
              eyebrow={content.models.eyebrow}
              title={content.models.title}
              description={content.models.description}
            />
            <ExternalLink className="fw-inline-link" href={content.models.href}>
              {content.ui.viewAllModels} <ArrowRight size={17} />
            </ExternalLink>
            <div className="fw-model-rail" ref={modelRail}>
              {content.models.items.map((model) => (
                <ExternalLink
                  className="fw-model-card"
                  href={`https://fireworks.ai/models/fireworks/${model.href}`}
                  key={model.name}
                >
                  <div className="fw-model-top">
                    <Image
                      src={modelLogo(model.name)}
                      width={40}
                      height={40}
                      unoptimized
                      alt=""
                    />
                    {'badge' in model && <em>{model.badge}</em>}
                  </div>
                  <h3>{model.name}</h3>
                  <div className="fw-model-meta">
                    {'price' in model && <span>{model.price}</span>}
                    <span>
                      {model.context} {content.ui.context}
                    </span>
                    <span>
                      {model.kind === 'LLM' ? (
                        <MessageSquareText size={14} />
                      ) : model.kind === 'Vision' ? (
                        <ScanEye size={14} />
                      ) : model.kind === 'Audio' ? (
                        <Mic2 size={14} />
                      ) : null}
                      {model.kind}
                    </span>
                  </div>
                </ExternalLink>
              ))}
            </div>
            <div className="fw-rail-controls">
              <button
                type="button"
                onClick={() => scrollRail(modelRail, -1)}
                aria-label={content.ui.previousModels}
              >
                <ArrowLeft />
              </button>
              <button
                type="button"
                onClick={() => scrollRail(modelRail, 1)}
                aria-label={content.ui.nextModels}
              >
                <ArrowRight />
              </button>
            </div>
          </div>
        </section>

        <section className="fw-customers" id="customers">
          <div className="fw-shell fw-bordered-shell">
            <SectionHeading
              centered
              eyebrow={content.customers.eyebrow}
              title={content.customers.title}
            />
          </div>
          <div className="fw-customer-rail" ref={customerRail}>
            {content.customers.items.map((item) => (
              <article
                className="fw-customer-card"
                key={`${item.company}-${item.person}`}
              >
                <Image
                  className="fw-customer-logo"
                  src={item.logo}
                  width={100}
                  height={32}
                  unoptimized
                  alt={`${item.company} ${content.ui.logo}`}
                />
                <p>“{item.summary}”</p>
                <footer>
                  <Image
                    src={item.avatar}
                    width={40}
                    height={40}
                    unoptimized
                    alt=""
                  />
                  <span>
                    <strong>{item.person.split(' · ')[0]}</strong>
                    <small>
                      {item.person.split(' · ')[1]} {content.ui.at}{' '}
                      {item.company}
                    </small>
                  </span>
                </footer>
              </article>
            ))}
          </div>
          <div className="fw-shell fw-rail-controls">
            <button
              type="button"
              onClick={() => scrollRail(customerRail, -1)}
              aria-label={content.ui.previousTestimonials}
            >
              <ArrowLeft />
            </button>
            <button
              type="button"
              onClick={() => scrollRail(customerRail, 1)}
              aria-label={content.ui.nextTestimonials}
            >
              <ArrowRight />
            </button>
          </div>
        </section>

        <section className="fw-updates" id="updates">
          <div className="fw-shell fw-bordered-shell">
            <div className="fw-update-heading">
              <SectionHeading
                eyebrow={content.updates.eyebrow}
                title={content.updates.title}
              />
              <ExternalLink
                className="fw-inline-link"
                href="https://fireworks.ai/blog"
              >
                {content.ui.seeMore} <ArrowRight size={17} />
              </ExternalLink>
            </div>
            <div className="fw-update-grid">
              {content.updates.items.map((item) => (
                <ExternalLink
                  className="fw-update-card"
                  href={item.href}
                  key={item.title}
                >
                  <div className="fw-update-image">
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      sizes="(max-width: 680px) 100vw, 33vw"
                      unoptimized
                    />
                  </div>
                  <div className="fw-update-meta">
                    <span>{item.type}</span>
                    <time>{item.date}</time>
                  </div>
                  <h3>{item.title}</h3>
                  <ArrowRight size={24} />
                </ExternalLink>
              ))}
            </div>
          </div>
        </section>

        <section className="fw-cta">
          <div className="fw-cta-grid" aria-hidden="true" />
          <div className="fw-shell">
            <h2>{content.ui.ctaTitle}</h2>
            <p>{content.ui.ctaDescription}</p>
            <div className="fw-actions">
              <ExternalLink
                className="fw-light-button"
                href="https://fireworks.ai/signup"
              >
                {content.ui.getStarted}
              </ExternalLink>
              <ExternalLink
                className="fw-dark-outline-button"
                href="https://fireworks.ai/contact"
              >
                {content.ui.talkToExpert}
              </ExternalLink>
            </div>
          </div>
        </section>
      </div>

      <footer className="fw-footer">
        <div className="fw-shell fw-footer-grid">
          {content.footer.map((group) => (
            <div className="fw-footer-group" key={group.title}>
              <h3>{group.title}</h3>
              {group.links.map(([label, href]) => (
                <ExternalLink href={href} key={label}>
                  {label}
                </ExternalLink>
              ))}
            </div>
          ))}
        </div>
        <div className="fw-shell fw-footer-bottom">
          <Image
            className="fw-footer-site-logo"
            src={content.meta.footerLogo}
            width={228}
            height={52}
            unoptimized
            alt="AURINOVA"
          />
          <span>{content.ui.copyright}</span>
          <div>
            <Link href="/">{content.ui.currentSite}</Link>
            <ExternalLink href={content.meta.source}>
              {content.ui.officialSource}
            </ExternalLink>
          </div>
        </div>
      </footer>
    </main>
  );
}
