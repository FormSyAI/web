import { ToolLogo } from '@/components/site/tool-logo';
import { useEffect } from 'react';
import { CausalEvidenceArt } from '@/components/site/causal-evidence-art';
import { AppLink } from '@/components/runtime/app-link';
import { useI18n } from '@/components/i18n/i18n-provider';
import { AurinovaReferenceFooter } from '@/components/site/aurinova-reference-footer';
import { AurinovaReferenceHeader } from '@/components/site/aurinova-reference-header';
import { BannerShader } from '@/components/site/banner-shader';
import { ContextComputeFeature } from '@/components/site/context-compute-feature';
import { DataDomainOverview } from '@/components/site/data-domain-overview';
import { aurinovaReferenceDictionaries } from '@/content/aurinova-reference.i18n';

function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'center' | 'left';
}) {
  return (
    <div
      className={`fw-section-heading is-${align === 'center' ? 'centered' : 'left'}`}
    >
      {eyebrow && <p>{eyebrow}</p>}
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
      <AurinovaReferenceHeader dark />
      <div className="fw-banner-assembly fw-designed-hero">
        <BannerShader className="fw-banner-shader" />
        <div id="fw-main">
          <section className="fw-hero">
            <div className="fw-shell fw-hero-grid">
              <div className="fw-hero-copy fw-hero-motion">
                <h1>
                  {hero.lines.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </h1>
                <p className="fw-lead">{hero.description}</p>
                <div className="fw-actions">
                  <AppLink
                    className="fw-primary-button"
                    href={hero.primary.href}
                  >
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
                  <CausalEvidenceArt locale={locale} />
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
        </div>
      </div>
      <div>
        <DataDomainOverview content={content.overview.dataDomains} />
        <ContextComputeFeature content={content.platform} />
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
        <section id="engagement" />
      </div>
      <AurinovaReferenceFooter />
    </main>
  );
}
