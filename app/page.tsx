'use client';

import { useEffect } from 'react';

import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  CircleCheck,
  Gauge,
  LockKeyhole,
  Network,
  ShieldCheck,
} from 'lucide-react';

import { useI18n } from '@/components/i18n/i18n-provider';
import { AssetCarousel } from '@/components/site/asset-carousel';
import { Brand } from '@/components/site/brand';
import { HeroShowcase } from '@/components/site/hero-showcase';
import { SiteHeader } from '@/components/site/site-header';
import type { SiteContent } from '@/content/i18n';

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  inverse?: boolean;
};

function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  inverse = false,
}: SectionHeadingProps) {
  return (
    <div
      className={`section-heading section-heading-${align}${inverse ? ' section-heading-inverse' : ''}`}
    >
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {description && <p className="section-description">{description}</p>}
    </div>
  );
}

function ArrowLink({
  label,
  href,
  inverse = false,
}: {
  label: string;
  href: string;
  inverse?: boolean;
}) {
  return (
    <a
      className={`arrow-link${inverse ? ' arrow-link-inverse' : ''}`}
      href={href}
    >
      <span>{label}</span>
      <ArrowRight size={18} aria-hidden="true" />
    </a>
  );
}

function EcosystemRail() {
  const { content } = useI18n();

  return (
    <section className="ecosystem" aria-label={content.ui.ecosystemLabel}>
      <div className="shell ecosystem-window">
        <div className="ecosystem-track">
          {[...content.ecosystem, ...content.ecosystem].map((item, index) => (
            <span key={`${item}-${index}`}>{item}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function ControlPanel() {
  const { content } = useI18n();
  const rows = content.ui.controlRows;

  return (
    <div className="control-panel" aria-label={content.ui.controlPanelLabel}>
      <div className="control-panel-header">
        <span>FORMSY / RUN_0274</span>
        <span className="status-dot">{content.ui.live}</span>
      </div>
      <div className="control-panel-body">
        {rows.map(([label, value], index) => (
          <div className="control-row" key={label}>
            <span className="control-index">0{index + 1}</span>
            <span className="control-label">{label}</span>
            <strong>{value}</strong>
            {index === rows.length - 1 ? (
              <CircleCheck size={18} />
            ) : (
              <span className="control-pulse" />
            )}
          </div>
        ))}
      </div>
      <div className="control-panel-footer">
        <span>{content.ui.evidenceComplete}</span>
        <span>{content.ui.validatedResult}</span>
      </div>
    </div>
  );
}

function PlatformCard({ item }: { item: SiteContent['platforms'][number] }) {
  const { content } = useI18n();

  return (
    <article className={`platform-card platform-card-${item.tone}`}>
      <div className="platform-index">{item.index}</div>
      <div className="platform-card-body">
        <p className="eyebrow">{item.eyebrow}</p>
        <h3>{item.title}</h3>
        <p className="platform-description">{item.description}</p>
        <ul>
          {item.bullets.map((bullet) => (
            <li key={bullet}>
              <Check size={17} aria-hidden="true" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
        <ArrowLink
          label={content.ui.viewArchitecture}
          href={item.href}
          inverse={item.tone === 'dark'}
        />
      </div>
      <div className="platform-pixel-field" aria-hidden="true">
        {Array.from({ length: 56 }, (_, index) => (
          <span key={index} />
        ))}
      </div>
    </article>
  );
}

function OperatingLoop() {
  const { content } = useI18n();

  return (
    <section className="operating-loop dark-section" id="solutions">
      <div className="shell framed operating-loop-grid">
        <SectionHeading
          eyebrow={content.operatingLoop.eyebrow}
          title={content.operatingLoop.title}
          description={content.operatingLoop.description}
          inverse
        />
        <ol className="loop-steps">
          {content.operatingLoop.steps.map((step, index) => (
            <li key={step.index}>
              <div className="loop-step-head">
                <span>{step.index}</span>
                {index < content.operatingLoop.steps.length - 1 && (
                  <ChevronRight size={17} />
                )}
              </div>
              <strong>{step.label}</strong>
              <small>{step.detail}</small>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function ArchitectureMap() {
  const { content } = useI18n();

  return (
    <div className="architecture-map">
      {content.architecture.columns.map((column, columnIndex) => (
        <article
          className={`architecture-column architecture-column-${columnIndex + 1}`}
          key={column.index}
        >
          <div className="architecture-number">{column.index}</div>
          <p>{column.label}</p>
          <h3>{column.title}</h3>
          <ul>
            {column.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          {columnIndex < content.architecture.columns.length - 1 && (
            <span className="architecture-connector" aria-hidden="true">
              <ArrowRight size={18} />
            </span>
          )}
        </article>
      ))}
    </div>
  );
}

const solutionIcons = [Gauge, ShieldCheck, LockKeyhole, Network];

export default function Home() {
  const { content } = useI18n();

  useEffect(() => {
    document.title = content.ui.pageTitle;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', content.ui.pageDescription);
  }, [content]);

  return (
    <main id="top">
      <a className="skip-link" href="#main-content">
        {content.ui.skipToContent}
      </a>

      <div className="announcement">
        <a href={content.announcement.href}>
          {content.announcement.label}
          <ArrowRight size={18} aria-hidden="true" />
        </a>
      </div>

      <SiteHeader />

      <div id="main-content">
        <HeroShowcase />
        <EcosystemRail />

        <section className="manifesto dark-section">
          <div className="shell framed manifesto-grid">
            <div className="manifesto-copy reveal">
              <p className="eyebrow">{content.brand.description}</p>
              <h2>{content.ui.manifestoQuote}</h2>
              <p>
                FORM<span>SY</span> · {content.ui.manifestoSignature}
              </p>
            </div>
            <ControlPanel />
          </div>
        </section>

        <section className="platform-section" id="platform">
          <div className="shell framed section-pad">
            <SectionHeading
              eyebrow={content.manifesto.eyebrow}
              title={content.manifesto.title}
              description={content.manifesto.description}
              align="center"
            />
            <div className="platform-grid">
              {content.platforms.map((item) => (
                <PlatformCard item={item} key={item.title} />
              ))}
            </div>
          </div>
        </section>

        <OperatingLoop />

        <section className="architecture-section" id="architecture">
          <div className="shell framed section-pad">
            <SectionHeading
              eyebrow={content.architecture.eyebrow}
              title={content.architecture.title}
              description={content.architecture.description}
            />
            <ArchitectureMap />
            <div className="architecture-footnote">
              {content.ui.architectureFootnotes.map((note) => (
                <span key={note}>{note}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="asset-section" id="assets">
          <div className="shell framed section-pad">
            <div className="asset-heading-row">
              <SectionHeading
                eyebrow={content.assets.eyebrow}
                title={content.assets.title}
                description={content.assets.description}
              />
              <ArrowLink label={content.ui.governancePath} href="#solutions" />
            </div>
            <AssetCarousel />
          </div>
        </section>

        <section className="evidence-section section-grid" id="evidence">
          <div className="shell framed section-pad">
            <SectionHeading
              eyebrow={content.evidence.eyebrow}
              title={content.evidence.title}
              description={content.evidence.description}
            />
            <div className="metric-grid">
              {content.evidence.metrics.map((metric, index) => (
                <article className="metric-card reveal" key={metric.label}>
                  <span className="metric-index">0{index + 1}</span>
                  <strong>{metric.value}</strong>
                  <h3>{metric.label}</h3>
                  <p>{metric.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="solution-section" id="outcomes">
          <div className="shell framed section-pad">
            <SectionHeading
              eyebrow={content.solutions.eyebrow}
              title={content.solutions.title}
              align="center"
            />
            <div className="solution-grid">
              {content.solutions.items.map((item, index) => {
                const Icon = solutionIcons[index];
                return (
                  <article className="solution-card reveal" key={item.index}>
                    <div className="solution-card-head">
                      <span>{item.index}</span>
                      <Icon size={26} strokeWidth={1.4} aria-hidden="true" />
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="resource-section" id="resources">
          <div className="shell framed section-pad">
            <div className="resource-heading-row">
              <SectionHeading
                eyebrow={content.resources.eyebrow}
                title={content.resources.title}
              />
              <ArrowLink
                label={content.ui.exploreCapabilities}
                href="#platform"
              />
            </div>
            <div className="resource-grid">
              {content.resources.items.map((item) => (
                <a className="resource-card" href={item.href} key={item.title}>
                  <div
                    className={`resource-visual resource-visual-${item.accent}`}
                    aria-hidden="true"
                  >
                    <span className="resource-code">FORM / SY</span>
                    <span className="resource-crosshair" />
                    <ArrowUpRight size={26} />
                  </div>
                  <p>{item.meta}</p>
                  <h3>{item.title}</h3>
                  <span>{item.description}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="cta-section" id="contact">
          <div className="shell cta-shell">
            <div className="cta-content">
              <p className="eyebrow">{content.cta.eyebrow}</p>
              <h2>{content.cta.title}</h2>
              <p>{content.cta.description}</p>
              <div className="button-row">
                <a
                  className="button button-light"
                  href={content.cta.primary.href}
                >
                  {content.cta.primary.label}
                  <ArrowRight size={17} />
                </a>
                <a
                  className="button button-dark-outline"
                  href={content.cta.secondary.href}
                >
                  {content.cta.secondary.label}
                </a>
              </div>
            </div>
            <div className="cta-pixels" aria-hidden="true">
              {Array.from({ length: 72 }, (_, index) => (
                <span key={index} />
              ))}
            </div>
          </div>
        </section>
      </div>

      <footer className="site-footer">
        <div className="shell footer-shell">
          <div className="footer-brand">
            <Brand inverse />
            <p>{content.brand.product}</p>
            <span>{content.brand.description}</span>
          </div>
          <div className="footer-groups">
            {content.footer.groups.map((group) => (
              <div className="footer-group" key={group.title}>
                <h3>{group.title}</h3>
                {group.links.map((link) => (
                  <a href={link.href} key={link.label}>
                    {link.label}
                  </a>
                ))}
              </div>
            ))}
          </div>
          <div className="footer-bottom">
            <span>© 2026 {content.brand.company}</span>
            <span>{content.ui.footerTagline}</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
