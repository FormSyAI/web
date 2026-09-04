import { ArrowLeft, ArrowRight, ChevronDown, Play } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { fireworksReferenceContent as content } from '@/content/fireworks-reference';

const tokenHeights = [
  7, 11, 16, 21, 17, 12, 7, 4, 9, 17, 15, 19, 22, 27, 32, 37, 34, 31,
  38, 43, 48, 52, 58, 55, 52, 57, 63, 68, 72, 76, 72, 80, 76, 74, 82, 86,
];

const spendHeights = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  2, 5, 9, 16, 14, 11, 20, 24, 30, 43, 26, 34, 29, 21, 15, 11, 8, 6];

function officialHref(href: string) {
  return href.startsWith('/') ? `https://fireworks.ai${href}` : href;
}

function ExternalLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a className={className} href={officialHref(href)} rel="noreferrer" target="_blank">
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

function SpendChart() {
  return (
    <div className="fw-spend-chart" aria-label="Tokens used and AI spend comparison chart">
      <span className="fw-corner fw-corner-tl" />
      <span className="fw-corner fw-corner-tr" />
      <span className="fw-corner fw-corner-bl" />
      <span className="fw-corner fw-corner-br" />
      <div className="fw-chart-legend">
        <span><i className="is-token" />Tokens Used</span>
        <span><i className="is-spend" />AI Spend</span>
      </div>
      <span className="fw-axis fw-axis-left">AI SPEND (USD)</span>
      <span className="fw-axis fw-axis-right">TOTAL TOKENS</span>
      <div className="fw-fireworks-pin"><FireworksMark /><i /></div>
      <div className="fw-bars">
        {tokenHeights.map((height, index) => (
          <div className="fw-bar-column" key={`${height}-${index}`}>
            <span className="fw-token-stack" style={{ '--bar': height } as React.CSSProperties} />
            <span className="fw-spend-stack" style={{ '--bar': spendHeights[index] } as React.CSSProperties} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function FireworksReferencePage() {
  return (
    <main className="fw-page" id="fw-top">
      <a className="skip-link" href="#fw-main">Skip to main content</a>

      <section className="fw-announcement-wrap" aria-label="Announcement">
        <ExternalLink className="fw-announcement" href={content.announcement.href}>
          {content.announcement.label}<ArrowRight size={19} />
        </ExternalLink>
      </section>

      <header className="fw-header">
        <div className="fw-header-inner">
          <a className="fw-brand" href="#fw-top" aria-label="Fireworks reference home">
            <FireworksMark /><strong>Fireworks</strong>
          </a>
          <nav aria-label="Primary navigation">
            {content.navigation.map((item) => (
              item.href.startsWith('#') ? (
                <a href={item.href} key={item.label}>{item.label}{'menu' in item && item.menu && <ChevronDown size={15} />}</a>
              ) : (
                <ExternalLink href={item.href} key={item.label}>{item.label}</ExternalLink>
              )
            ))}
          </nav>
          <div className="fw-header-actions">
            <ExternalLink href="https://fireworks.ai/login">LOG IN</ExternalLink>
            <ExternalLink className="fw-primary-button" href="https://fireworks.ai/signup">GET STARTED</ExternalLink>
          </div>
        </div>
      </header>

      <div id="fw-main">
        <section className="fw-hero">
          <div className="fw-shell fw-hero-grid">
            <div className="fw-hero-copy">
              <p className="fw-eyebrow">{content.hero.eyebrow}</p>
              <h1>{content.hero.title}</h1>
              <p className="fw-lead">{content.hero.description}</p>
              <div className="fw-actions">
                <ExternalLink className="fw-primary-button" href={content.hero.primary.href}>{content.hero.primary.label}</ExternalLink>
                <ExternalLink className="fw-secondary-button" href={content.hero.secondary.href}>{content.hero.secondary.label}</ExternalLink>
              </div>
            </div>
            <div className="fw-chart-wrap">
              <SpendChart />
              <div className="fw-slider-state"><i /><i /></div>
            </div>
          </div>
        </section>

        <section className="fw-logo-wall" aria-label="Selected customers">
          <div className="fw-logo-track">
            {[...content.logos, ...content.logos].map((logo, index) => (
              <span key={`${logo}-${index}`}>{logo}</span>
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
            <a className="fw-video" href="https://fireworks.ai/" target="_blank" rel="noreferrer" aria-label="View the Fireworks GTC feature">
              <Image
                src={content.gtc.image}
                alt="Jensen Huang and Lin Qiao at NVIDIA GTC 2026"
                fill
                sizes="(max-width: 960px) 100vw, 469px"
                unoptimized
              />
              <span><Play fill="currentColor" size={22} /></span>
            </a>
          </div>
        </section>

        <section className="fw-platform" id="platform">
          <div className="fw-shell fw-bordered-shell">
            <SectionHeading eyebrow={content.platform.eyebrow} title={content.platform.title} description={content.platform.description} />
            <div className="fw-pillar-grid">
              {content.platform.pillars.map((pillar) => (
                <article className="fw-pillar" key={pillar.name}>
                  <div className="fw-pillar-title">
                    <span>{pillar.index}</span>
                    <div><p>{pillar.audience}</p><h3>{pillar.name}</h3></div>
                  </div>
                  <p className="fw-pillar-description">{pillar.description}</p>
                  <ul>{pillar.modes.map((mode) => <li key={mode}>{mode}</li>)}</ul>
                  <div className="fw-pillar-actions">
                    <ExternalLink className={pillar.index === '01' ? 'fw-light-button' : 'fw-primary-button'} href={pillar.primary.href}>{pillar.primary.label}</ExternalLink>
                    <ExternalLink className="fw-secondary-button" href={pillar.secondary.href}>{pillar.secondary.label}</ExternalLink>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="fw-models" id="models">
          <div className="fw-shell fw-bordered-shell">
            <SectionHeading centered eyebrow={content.models.eyebrow} title={content.models.title} description={content.models.description} />
            <ExternalLink className="fw-inline-link" href={content.models.href}>VIEW ALL MODELS <ArrowRight size={17} /></ExternalLink>
            <div className="fw-model-rail">
              {content.models.items.map((model) => (
                <ExternalLink className="fw-model-card" href={`https://fireworks.ai/models/fireworks/${model.href}`} key={model.name}>
                  <div className="fw-model-top"><span className="fw-model-glyph">✦</span>{'badge' in model && <em>{model.badge}</em>}</div>
                  <h3>{model.name}</h3>
                  <div className="fw-model-meta">
                    {'price' in model && <span>{model.price}</span>}
                    <span>{model.context} Context</span><span>{model.kind}</span>
                  </div>
                </ExternalLink>
              ))}
            </div>
            <div className="fw-rail-controls"><a href="#models" aria-label="Previous models"><ArrowLeft /></a><a href="#models" aria-label="Next models"><ArrowRight /></a></div>
          </div>
        </section>

        <section className="fw-customers" id="customers">
          <div className="fw-shell fw-bordered-shell">
            <SectionHeading centered eyebrow={content.customers.eyebrow} title={content.customers.title} />
          </div>
          <div className="fw-customer-rail">
            {content.customers.items.map((item) => (
              <article className="fw-customer-card" key={`${item.company}-${item.person}`}>
                <strong>{item.company}</strong>
                <p>“{item.summary}”</p>
                <footer><span>{item.person.split(' · ')[0]}</span><small>{item.person.split(' · ')[1]}</small></footer>
              </article>
            ))}
          </div>
          <div className="fw-shell fw-rail-controls"><a href="#customers" aria-label="Previous testimonials"><ArrowLeft /></a><a href="#customers" aria-label="Next testimonials"><ArrowRight /></a></div>
        </section>

        <section className="fw-updates" id="updates">
          <div className="fw-shell fw-bordered-shell">
            <div className="fw-update-heading"><SectionHeading eyebrow={content.updates.eyebrow} title={content.updates.title} /><ExternalLink className="fw-inline-link" href="https://fireworks.ai/blog">SEE MORE <ArrowRight size={17} /></ExternalLink></div>
            <div className="fw-update-grid">
              {content.updates.items.map((item) => (
                <ExternalLink className="fw-update-card" href={item.href} key={item.title}>
                  <div><span>{item.type}</span><time>{item.date}</time></div>
                  <h3>{item.title}</h3><ArrowRight size={24} />
                </ExternalLink>
              ))}
            </div>
          </div>
        </section>

        <section className="fw-cta">
          <div className="fw-cta-grid" aria-hidden="true" />
          <div className="fw-shell">
            <h2>Start building today</h2>
            <p>Instantly run popular and specialized models.</p>
            <div className="fw-actions">
              <ExternalLink className="fw-light-button" href="https://fireworks.ai/signup">GET STARTED</ExternalLink>
              <ExternalLink className="fw-dark-outline-button" href="https://fireworks.ai/contact">TALK TO AN EXPERT</ExternalLink>
            </div>
          </div>
        </section>
      </div>

      <footer className="fw-footer">
        <div className="fw-shell fw-footer-grid">
          {content.footer.map((group) => (
            <div className="fw-footer-group" key={group.title}>
              <h3>{group.title}</h3>
              {group.links.map(([label, href]) => <ExternalLink href={href} key={label}>{label}</ExternalLink>)}
            </div>
          ))}
        </div>
        <div className="fw-shell fw-footer-bottom">
          <div className="fw-brand fw-brand-dark"><FireworksMark /><strong>Fireworks</strong></div>
          <span>© 2026 Fireworks AI. Independent reference implementation.</span>
          <div><Link href="/">Current site</Link><ExternalLink href={content.meta.source}>Official source ↗</ExternalLink></div>
        </div>
      </footer>
    </main>
  );
}
