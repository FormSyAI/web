import {
  ArrowRight,
  ArrowUpRight,
  AudioLines,
  Bot,
  Boxes,
  Braces,
  BrainCircuit,
  Eye,
  Gauge,
  Image as ImageIcon,
  Layers3,
  Sparkles,
  Zap,
} from 'lucide-react';
import Link from 'next/link';

import { fireworksReferenceContent as content } from '@/content/fireworks-reference';

const modelIcons = {
  LLM: Braces,
  Vision: Eye,
  Image: ImageIcon,
  Audio: AudioLines,
} as const;

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
    <a className={className} href={href} rel="noreferrer" target="_blank">
      {children}
    </a>
  );
}

function SectionIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="fw-section-intro">
      <p>{eyebrow}</p>
      <h2>{title}</h2>
      {description && <span>{description}</span>}
    </div>
  );
}

export default function FireworksReferencePage() {
  return (
    <main className="fw-page" id="fw-top">
      <a className="skip-link" href="#fw-main">
        Skip to main content
      </a>

      <div className="fw-reference-bar">
        <span>{content.meta.label}</span>
        <div>
          <Link href="/">Current site</Link>
          <ExternalLink href={content.meta.source}>
            Official source <ArrowUpRight size={13} />
          </ExternalLink>
        </div>
      </div>

      <a
        className="fw-announcement"
        href={content.announcement.href}
        target="_blank"
        rel="noreferrer"
      >
        <span>NEW</span>
        {content.announcement.label}
        <ArrowRight size={15} />
      </a>

      <header className="fw-header">
        <a
          className="fw-brand"
          href="#fw-top"
          aria-label="Fireworks reference home"
        >
          <span aria-hidden="true">
            <Sparkles />
          </span>
          <strong>FIREWORKS</strong>
          <small>REFERENCE</small>
        </a>
        <nav aria-label="Reference page navigation">
          {content.navigation.map((item) => (
            <a href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <ExternalLink
          className="fw-nav-action"
          href="https://fireworks.ai/models"
        >
          Explore models <ArrowUpRight size={15} />
        </ExternalLink>
      </header>

      <div id="fw-main">
        <section className="fw-nexus">
          <div className="fw-shell fw-nexus-grid">
            <div className="fw-nexus-copy">
              <p>{content.nexus.eyebrow}</p>
              <h1>{content.nexus.title}</h1>
              <span>{content.nexus.description}</span>
              <div className="fw-actions">
                <ExternalLink
                  className="fw-button fw-button-lime"
                  href={content.nexus.primary.href}
                >
                  {content.nexus.primary.label} <ArrowUpRight size={17} />
                </ExternalLink>
                <ExternalLink
                  className="fw-button fw-button-dark"
                  href={content.nexus.secondary.href}
                >
                  {content.nexus.secondary.label}
                </ExternalLink>
              </div>
            </div>
            <div
              className="fw-router-visual"
              aria-label="Illustration of AI task routing"
            >
              <div className="fw-router-head">
                <span>ROUTER / LIVE</span>
                <i />
              </div>
              <div className="fw-router-core">
                <Bot size={34} />
                <strong>CODE TASK</strong>
                <span>score → cache → route</span>
              </div>
              {['OPEN', 'CLOSED', 'CACHE'].map((label, index) => (
                <div
                  className={`fw-router-node fw-router-node-${index + 1}`}
                  key={label}
                >
                  <span>0{index + 1}</span>
                  <strong>{label}</strong>
                </div>
              ))}
              <div className="fw-router-grid" aria-hidden="true" />
            </div>
          </div>
          <div className="fw-shell fw-stats">
            {content.nexus.stats.map((stat) => (
              <div key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="fw-hero">
          <div className="fw-shell fw-hero-grid">
            <div>
              <p className="fw-eyebrow">{content.hero.eyebrow}</p>
              <h2>
                {content.hero.title.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </h2>
              <p className="fw-lead">{content.hero.description}</p>
              <div className="fw-actions">
                <ExternalLink
                  className="fw-button fw-button-black"
                  href={content.hero.primary.href}
                >
                  {content.hero.primary.label} <ArrowUpRight size={17} />
                </ExternalLink>
                <ExternalLink
                  className="fw-text-link"
                  href={content.hero.secondary.href}
                >
                  {content.hero.secondary.label} <ArrowRight size={17} />
                </ExternalLink>
              </div>
            </div>
            <div
              className="fw-model-graph"
              aria-label="Specialized intelligence learning loop"
            >
              <span className="fw-graph-label">SPECIALIZED INTELLIGENCE</span>
              <div className="fw-graph-orbit fw-graph-orbit-one" />
              <div className="fw-graph-orbit fw-graph-orbit-two" />
              <div className="fw-graph-core">
                <BrainCircuit />
                <strong>MODEL</strong>
              </div>
              <span className="fw-graph-point fw-graph-point-one">DATA</span>
              <span className="fw-graph-point fw-graph-point-two">EVAL</span>
              <span className="fw-graph-point fw-graph-point-three">TRAIN</span>
              <span className="fw-graph-point fw-graph-point-four">SERVE</span>
            </div>
          </div>
        </section>

        <section className="fw-gtc">
          <div className="fw-shell fw-gtc-grid">
            <p>{content.gtc.eyebrow}</p>
            <h2>{content.gtc.title}</h2>
            <span>{content.gtc.description}</span>
            <div className="fw-gtc-mark" aria-hidden="true">
              <Zap />
              <span>AI FACTORY</span>
            </div>
          </div>
        </section>

        <section className="fw-platform" id="platform">
          <div className="fw-shell">
            <SectionIntro
              eyebrow={content.platform.eyebrow}
              title={content.platform.title}
              description={content.platform.description}
            />
            <div className="fw-pillar-grid">
              {content.platform.pillars.map((pillar, index) => {
                const Icon = index === 0 ? Layers3 : Gauge;
                return (
                  <article className="fw-pillar" key={pillar.name}>
                    <div className="fw-pillar-head">
                      <span>{pillar.index}</span>
                      <Icon size={28} strokeWidth={1.4} />
                    </div>
                    <p>{pillar.audience}</p>
                    <h3>{pillar.name}</h3>
                    <div>{pillar.description}</div>
                    <ul>
                      {pillar.modes.map((mode) => (
                        <li key={mode}>{mode}</li>
                      ))}
                    </ul>
                    <ExternalLink href={pillar.href}>
                      Explore {pillar.name.toLowerCase()}{' '}
                      <ArrowUpRight size={16} />
                    </ExternalLink>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="fw-models" id="models">
          <div className="fw-shell">
            <div className="fw-model-heading">
              <SectionIntro
                eyebrow={content.models.eyebrow}
                title={content.models.title}
                description={content.models.description}
              />
              <ExternalLink className="fw-text-link" href={content.models.href}>
                View the live library <ArrowUpRight size={17} />
              </ExternalLink>
            </div>
            <div className="fw-model-grid">
              {content.models.items.map((model, index) => {
                const Icon = modelIcons[model.kind];
                return (
                  <article className="fw-model-card" key={model.name}>
                    <div>
                      <span>MODEL {String(index + 1).padStart(2, '0')}</span>
                      <Icon size={18} />
                    </div>
                    <h3>{model.name}</h3>
                    <dl>
                      <div>
                        <dt>TYPE</dt>
                        <dd>{model.kind}</dd>
                      </div>
                      <div>
                        <dt>CONTEXT</dt>
                        <dd>{model.context}</dd>
                      </div>
                      {'price' in model && (
                        <div>
                          <dt>IN / OUT</dt>
                          <dd>{model.price}</dd>
                        </div>
                      )}
                    </dl>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="fw-customers" id="customers">
          <div className="fw-shell">
            <SectionIntro
              eyebrow={content.customers.eyebrow}
              title={content.customers.title}
            />
            <div className="fw-customer-grid">
              {content.customers.items.map((item, index) => (
                <article
                  className={
                    index === 0
                      ? 'fw-customer fw-customer-featured'
                      : 'fw-customer'
                  }
                  key={`${item.company}-${item.person}`}
                >
                  <span>
                    {String(index + 1).padStart(2, '0')} / {item.company}
                  </span>
                  <p>{item.summary}</p>
                  <footer>{item.person}</footer>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="fw-updates" id="updates">
          <div className="fw-shell">
            <div className="fw-update-heading">
              <SectionIntro
                eyebrow={content.updates.eyebrow}
                title={content.updates.title}
              />
              <ExternalLink
                className="fw-text-link"
                href="https://fireworks.ai/blog"
              >
                All updates <ArrowUpRight size={17} />
              </ExternalLink>
            </div>
            <div className="fw-update-grid">
              {content.updates.items.map((item) => (
                <ExternalLink
                  className="fw-update-card"
                  href={item.href}
                  key={item.title}
                >
                  <div>
                    <span>{item.type}</span>
                    <time>{item.date}</time>
                  </div>
                  <h3>{item.title}</h3>
                  <ArrowUpRight size={22} />
                </ExternalLink>
              ))}
            </div>
          </div>
        </section>

        <section className="fw-cta">
          <div className="fw-shell fw-cta-grid">
            <div>
              <p>START BUILDING</p>
              <h2>Put a leading model into production today.</h2>
            </div>
            <div className="fw-actions">
              <ExternalLink
                className="fw-button fw-button-lime"
                href="https://fireworks.ai/models"
              >
                Explore models <ArrowUpRight size={17} />
              </ExternalLink>
              <ExternalLink
                className="fw-button fw-button-dark"
                href="https://fireworks.ai/contact-reserved"
              >
                Talk to an expert
              </ExternalLink>
            </div>
          </div>
        </section>
      </div>

      <footer className="fw-footer">
        <div className="fw-shell fw-footer-grid">
          <div className="fw-footer-brand">
            <Boxes size={28} />
            <strong>FIREWORKS</strong>
            <span>
              Unofficial reference · researched {content.meta.researchedAt}
            </span>
          </div>
          {content.footer.map((group) => (
            <div className="fw-footer-group" key={group.title}>
              <h3>{group.title}</h3>
              {group.links.map((link) => (
                <ExternalLink href={link.href} key={link.label}>
                  {link.label}
                </ExternalLink>
              ))}
            </div>
          ))}
        </div>
        <div className="fw-shell fw-footer-bottom">
          <span>
            Independent study page. Fireworks AI owns its trademarks and source
            materials.
          </span>
          <ExternalLink href={content.meta.source}>
            Visit fireworks.ai <ArrowUpRight size={14} />
          </ExternalLink>
        </div>
      </footer>
    </main>
  );
}
