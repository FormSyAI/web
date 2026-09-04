'use client';

import {
  ArrowLeft,
  ArrowRight,
  MessageSquareText,
  Mic2,
  ScanEye,
} from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { useI18n } from '@/components/i18n/i18n-provider';
import { AurinovaArtworkImage } from '@/components/site/aurinova-artwork-image';
import { AurinovaReferenceFooter } from '@/components/site/aurinova-reference-footer';
import {
  aurinovaModelLogo,
  AurinovaReferenceHeader,
} from '@/components/site/aurinova-reference-header';
import {
  aurinovaReferenceDictionaries,
  type AurinovaReferenceContent,
} from '@/content/aurinova-reference.i18n';

const tokenHeights = [
  7, 11, 16, 21, 17, 12, 7, 4, 9, 17, 15, 19, 22, 27, 32, 37, 34, 31, 38, 43,
  48, 52, 58, 55, 52, 57, 63, 68, 72, 76, 72, 80, 76, 74, 82, 86,
];
const spendHeights = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 5, 9, 16, 14, 11, 20,
  24, 30, 43, 26, 34, 29, 21, 15, 11, 8, 6,
];

function SiteLink({
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
    <a className={className} href={href} onClick={onClick}>
      {children}
    </a>
  );
}

function AurinovaMark() {
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

function SpendChart({ ui }: { ui: AurinovaReferenceContent['ui'] }) {
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
      <div className="fw-brand-pin">
        <AurinovaMark />
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

export default function AurinovaReferencePage() {
  const { locale } = useI18n();
  const content = aurinovaReferenceDictionaries[locale];
  const [heroSlide, setHeroSlide] = useState(0);
  const modelRail = useRef<HTMLDivElement>(null);
  const customerRail = useRef<HTMLDivElement>(null);

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
      <AurinovaReferenceHeader />

      <div id="fw-main">
        <section className="fw-hero">
          {heroSlide === 0 ? (
            <div className="fw-shell fw-hero-grid fw-hero-slide" key="nexus">
              <div className="fw-hero-copy">
                <p className="fw-eyebrow">{content.hero.eyebrow}</p>
                <h1>{content.hero.title}</h1>
                <p className="fw-lead">{content.hero.description}</p>
                <div className="fw-actions">
                  <SiteLink
                    className="fw-primary-button"
                    href={content.hero.primary.href}
                  >
                    {content.hero.primary.label}
                  </SiteLink>
                  <SiteLink
                    className="fw-secondary-button"
                    href={content.hero.secondary.href}
                  >
                    {content.hero.secondary.label}
                  </SiteLink>
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
                  <SiteLink
                    className="fw-primary-button"
                    href={content.secondHero.primary.href}
                  >
                    {content.secondHero.primary.label}
                  </SiteLink>
                  <SiteLink
                    className="fw-secondary-button"
                    href={content.secondHero.secondary.href}
                  >
                    {content.secondHero.secondary.label}
                  </SiteLink>
                </div>
              </div>
              <div className="fw-hero-art">
                <AurinovaArtworkImage
                  src={content.secondHero.image}
                  alt={content.ui.secondHeroImageAlt}
                  priority
                  sizes="(max-width: 960px) 100vw, 663px"
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
            <div className="fw-video">
              <AurinovaArtworkImage
                src={content.gtc.image}
                alt={content.ui.gtcImageAlt}
                sizes="(max-width: 960px) 100vw, 469px"
              />
            </div>
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
                    <SiteLink
                      className="fw-primary-button"
                      href={pillar.primary.href}
                    >
                      {pillar.primary.label}
                    </SiteLink>
                    <SiteLink
                      className={
                        pillar.index === '01'
                          ? 'fw-dark-outline-button'
                          : 'fw-secondary-button'
                      }
                      href={pillar.secondary.href}
                    >
                      {pillar.secondary.label}
                    </SiteLink>
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
            <SiteLink className="fw-inline-link" href={content.models.href}>
              {content.ui.viewAllModels} <ArrowRight size={17} />
            </SiteLink>
            <div className="fw-model-rail" ref={modelRail}>
              {content.models.items.map((model) => (
                <SiteLink
                  className="fw-model-card"
                  href={`/models/${model.href}`}
                  key={model.name}
                >
                  <div className="fw-model-top">
                    <Image
                      src={aurinovaModelLogo(model.name)}
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
                </SiteLink>
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
              <SiteLink className="fw-inline-link" href="/blog">
                {content.ui.seeMore} <ArrowRight size={17} />
              </SiteLink>
            </div>
            <div className="fw-update-grid">
              {content.updates.items.map((item) => (
                <SiteLink
                  className="fw-update-card"
                  href={item.href}
                  key={item.title}
                >
                  <div className="fw-update-image">
                    <AurinovaArtworkImage
                      src={item.image}
                      alt=""
                      sizes="(max-width: 680px) 100vw, 33vw"
                    />
                  </div>
                  <div className="fw-update-meta">
                    <span>{item.type}</span>
                    <time>{item.date}</time>
                  </div>
                  <h3>{item.title}</h3>
                  <ArrowRight size={24} />
                </SiteLink>
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
              <SiteLink className="fw-light-button" href="/signup">
                {content.ui.getStarted}
              </SiteLink>
              <SiteLink className="fw-dark-outline-button" href="/contact">
                {content.ui.talkToExpert}
              </SiteLink>
            </div>
          </div>
        </section>
      </div>

      <AurinovaReferenceFooter />
    </main>
  );
}
