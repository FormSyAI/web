import { ToolLogo } from '@/components/site/tool-logo';
import { Boxes, GitBranch, Layers } from 'lucide-react';
import { useEffect } from 'react';
import { FormsyBannerArt } from '@/components/site/formsy-banner-art';
import { AppLink } from '@/components/runtime/app-link';
import { useI18n } from '@/components/i18n/i18n-provider';
import { AurinovaReferenceFooter } from '@/components/site/aurinova-reference-footer';
import { AurinovaReferenceHeader } from '@/components/site/aurinova-reference-header';
import { aurinovaReferenceDictionaries } from '@/content/aurinova-reference.i18n';

function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'center' | 'left';
}) {
  return (
    <div
      className={`fw-section-heading is-${align === 'center' ? 'centered' : 'left'}`}
    >
      <p>{eyebrow}</p>
      <h2>{title}</h2>
      {description && <span>{description}</span>}
    </div>
  );
}

export default function AurinovaReferencePage() {
  const { locale } = useI18n();
  const content = aurinovaReferenceDictionaries[locale];
  const hero = content.hero;
  useEffect(() => {
    document.title = content.ui.pageTitle;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', content.ui.pageDescription);
  }, [content.ui.pageTitle, content.ui.pageDescription]);
  return (
    <main className="fw-page" id="fw-top">
      <a className="skip-link" href="#fw-main">
        {content.ui.skipToContent}
      </a>
      <AurinovaReferenceHeader />
      <div id="fw-main">
        <section className="fw-hero fw-designed-hero">
          <div className="fw-shell fw-hero-grid">
            <div className="fw-hero-copy fw-hero-motion">
              <p className="fw-eyebrow">{hero.eyebrow}</p>
              <h1>
                {hero.lines.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </h1>
              <p className="fw-lead">{hero.description}</p>
              <div className="fw-actions">
                <AppLink className="fw-primary-button" href={hero.primary.href}>
                  {hero.primary.label}
                </AppLink>
                <AppLink
                  className="fw-secondary-button"
                  href={hero.secondary.href}
                >
                  {hero.secondary.label}
                </AppLink>
              </div>
            </div>
            <div className="fw-hero-visual">
              <div className="fw-hero-motion">
                <FormsyBannerArt
                  locale={locale}
                  variant="verified-work"
                  alt={content.banners.outcomeAlt}
                  label={content.banners.outcome}
                  caption={content.chart.caption}
                />
              </div>
            </div>
          </div>
        </section>
        <section
          className="fw-logo-wall fw-ecosystem"
          aria-label={content.ui.ecosystem}
        >
          <div className="fw-shell">
            <h2>{content.ecosystem.title}</h2>
          </div>
          <div className="fw-logo-track">
            {[0, 1].map((copy) => (
              <div
                className="fw-ecosystem-set"
                key={copy}
                aria-hidden={copy === 1 ? true : undefined}
              >
                {content.ecosystem.items.map((item) => (
                  <span key={item}>
                    <ToolLogo name={item} />
                    {item}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </section>
        <section className="fw-gtc" id="overview">
          <div className="fw-shell fw-gtc-grid">
            <div className="fw-gtc-copy">
              <p className="fw-eyebrow">{content.overview.eyebrow}</p>
              <h2>{content.overview.title}</h2>
              <span>{content.overview.description}</span>
              <ul className="fw-overview-list">
                {content.overview.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ul>
            </div>
            <div className="fw-architecture-panel">
              <span className="fw-eyebrow">SYSTEM ARCHITECTURE</span>
              {content.overview.architecture.map((layer, i) => (
                <div key={layer}>
                  <small>0{i + 1}</small>
                  <strong>{layer}</strong>
                  {i === 1 ? <Layers /> : i === 2 ? <GitBranch /> : <Boxes />}
                </div>
              ))}
              <p>{content.overview.footnote}</p>
            </div>
          </div>
        </section>
        <section className="fw-platform" id="platform">
          <div className="fw-shell fw-bordered-shell">
            <SectionHeading {...content.platform} />
            <div className="fw-pillar-grid">
              {content.platform.pillars.map((pillar) => (
                <article className="fw-pillar" id={pillar.id} key={pillar.id}>
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
                    <AppLink
                      className="fw-primary-button"
                      href={pillar.primary.href}
                    >
                      {pillar.primary.label}
                    </AppLink>
                    <AppLink
                      className={
                        pillar.index === '01'
                          ? 'fw-dark-outline-button'
                          : 'fw-secondary-button'
                      }
                      href={pillar.secondary.href}
                    >
                      {pillar.secondary.label}
                    </AppLink>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="fw-learning fw-shell" id="learning-loop">
          <SectionHeading {...content.learning} />
          <ol className="fw-learning-steps">
            {content.learning.steps.map(([label, detail], i) => (
              <li key={label}>
                <span>0{i + 1}</span>
                <span className="fw-learning-illustration" aria-hidden="true" />
                <h3>{label}</h3>
                <p>{detail}</p>
              </li>
            ))}
          </ol>
        </section>
        <section className="fw-cta" id="engagement">
          <div className="fw-cta-grid" aria-hidden="true" />
          <div className="fw-shell">
            <h2>{content.engagement.title}</h2>
            <p>{content.engagement.description}</p>
            <div className="fw-actions">
              <AppLink
                className="fw-light-button"
                href={content.engagement.primary.href}
              >
                {content.engagement.primary.label}
              </AppLink>
              <AppLink
                className="fw-dark-outline-button"
                href={content.engagement.secondary.href}
              >
                {content.engagement.secondary.label}
              </AppLink>
            </div>
          </div>
        </section>
      </div>
      <AurinovaReferenceFooter />
    </main>
  );
}
