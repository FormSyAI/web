import { ToolLogo } from '@/components/site/tool-logo';
import { Button } from '@/components/ui/button';

import {
  ArrowLeft,
  ArrowRight,
  Boxes,
  GitBranch,
  Layers,
  ShieldCheck,
  Pause,
  Play,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { DeploymentIcon } from '@/components/site/deployment-icon';
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
  const [heroSlide, setHeroSlide] = useState(0);
  const [displaySlide, setDisplaySlide] = useState(0);
  const [slidePhase, setSlidePhase] = useState('idle');
  const [slideDirection, setSlideDirection] = useState('forward');
  const displayedSlide = useRef(0);
  useEffect(() => {
    let exit: number;
    let finish: number;
    const frame = requestAnimationFrame(() => {
      if (heroSlide === displayedSlide.current) {
        setSlidePhase('idle');
        return;
      }
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        displayedSlide.current = heroSlide;
        setDisplaySlide(heroSlide);
        setSlidePhase('idle');
        return;
      }
      setSlideDirection(
        heroSlide > displayedSlide.current ? 'forward' : 'backward',
      );
      setSlidePhase('exit');
      exit = window.setTimeout(() => {
        displayedSlide.current = heroSlide;
        setDisplaySlide(heroSlide);
        setSlidePhase('enter');
      }, 220);
      finish = window.setTimeout(() => setSlidePhase('idle'), 660);
    });
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(exit);
      clearTimeout(finish);
    };
  }, [heroSlide]);
  const [rotationPaused, setRotationPaused] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  const [rotationCycle, setRotationCycle] = useState(0);
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    const schedule = () => {
      clearTimeout(timer);
      if (!rotationPaused && !document.hidden) {
        timer = setTimeout(
          () => setHeroSlide((slide) => (slide + 1) % 2),
          6000,
        );
      }
    };
    schedule();
    document.addEventListener('visibilitychange', schedule);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('visibilitychange', schedule);
    };
  }, [rotationPaused, heroSlide, rotationCycle]);
  const modelRail = useRef<HTMLDivElement>(null);
  const scenarioRail = useRef<HTMLDivElement>(null);
  const hero = displaySlide === 0 ? content.hero : content.secondHero;
  useEffect(() => {
    document.title = content.ui.pageTitle;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', content.ui.pageDescription);
  }, [content.ui.pageTitle, content.ui.pageDescription]);
  const scrollRail = (
    ref: React.RefObject<HTMLDivElement | null>,
    direction: number,
  ) => {
    ref.current?.scrollBy({
      left: direction * Math.min(960, ref.current.clientWidth * 0.8),
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'auto'
        : 'smooth',
    });
  };
  const railControls = (ref: React.RefObject<HTMLDivElement | null>) => (
    <div className="fw-shell fw-rail-controls">
      <Button
        variant="brand"
        type="button"
        aria-label={content.ui.previous}
        onClick={() => scrollRail(ref, -1)}
      >
        <ArrowLeft />
      </Button>
      <Button
        variant="brand"
        type="button"
        aria-label={content.ui.next}
        onClick={() => scrollRail(ref, 1)}
      >
        <ArrowRight />
      </Button>
    </div>
  );
  return (
    <main className="fw-page" id="fw-top">
      <a className="skip-link" href="#fw-main">
        {content.ui.skipToContent}
      </a>
      <AurinovaReferenceHeader />
      <div id="fw-main">
        <section
          className="fw-hero fw-designed-hero"
          aria-roledescription="carousel"
          aria-label={content.ui.heroSlides}
        >
          <div
            className="fw-shell fw-hero-grid"
            data-slide-phase={slidePhase}
            data-slide-direction={slideDirection}
          >
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
                  key={displaySlide}
                  locale={locale}
                  variant={
                    displaySlide === 0 ? 'verified-work' : 'enterprise-learning'
                  }
                  alt={
                    displaySlide === 0
                      ? content.banners.outcomeAlt
                      : content.banners.learningAlt
                  }
                  label={
                    displaySlide === 0
                      ? content.banners.outcome
                      : content.banners.learning
                  }
                  caption={content.chart.caption}
                />
              </div>
              <div className="fw-hero-dots" aria-label={content.ui.heroSlides}>
                {[content.ui.showTaskSlide, content.ui.showLearningSlide].map(
                  (label, i) => (
                    <Button
                      variant="brand"
                      key={label}
                      type="button"
                      aria-label={label}
                      aria-pressed={heroSlide === i}
                      onClick={() => {
                        setHeroSlide(i);
                        setRotationCycle((cycle) => cycle + 1);
                      }}
                    />
                  ),
                )}
                <Button
                  variant="brand"
                  type="button"
                  className="fw-rotation-toggle"
                  aria-label={
                    locale === 'zh-CN'
                      ? rotationPaused
                        ? '播放轮播'
                        : '暂停轮播'
                      : rotationPaused
                        ? 'Play slideshow'
                        : 'Pause slideshow'
                  }
                  onClick={() => setRotationPaused((paused) => !paused)}
                >
                  {rotationPaused ? <Play size={14} /> : <Pause size={14} />}
                </Button>
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
                <h3>{label}</h3>
                <p>{detail}</p>
              </li>
            ))}
          </ol>
        </section>
        <section className="fw-models" id="models-deployment">
          <div className="fw-shell fw-bordered-shell">
            <SectionHeading {...content.models} />
            <div className="fw-model-rail" ref={modelRail}>
              {content.models.items.map((item, i) => (
                <article
                  className="fw-model-card fw-deployment-card"
                  id={item.id}
                  key={item.id}
                >
                  <div className="fw-model-top">
                    <DeploymentIcon id={item.id} />
                    <em>0{i + 1}</em>
                  </div>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <span className="fw-deployment-tag">{item.tag}</span>
                </article>
              ))}
            </div>
            {railControls(modelRail)}
          </div>
        </section>
        <section className="fw-customers" id="solutions">
          <div className="fw-shell fw-bordered-shell">
            <SectionHeading {...content.scenarios} />
          </div>
          <div className="fw-customer-rail" ref={scenarioRail}>
            {content.scenarios.items.map((item, i) => (
              <article
                className="fw-customer-card fw-scenario-card"
                id={item.id}
                key={item.id}
              >
                <span className="fw-eyebrow">
                  0{i + 1} / {item.audience}
                </span>
                <h3>{item.title}</h3>
                <p>{item.problem}</p>
                <div>
                  <small>{content.ui.delivery}</small>
                  <p>{item.delivery}</p>
                </div>
                <footer>
                  <ShieldCheck size={24} />
                  <span>
                    <strong>{content.ui.evaluation}</strong>
                    <small>{item.evaluation}</small>
                  </span>
                </footer>
              </article>
            ))}
          </div>
          {railControls(scenarioRail)}
        </section>
        <section className="fw-evaluation fw-shell" id="evaluation">
          <SectionHeading {...content.evaluation} />
          <div className="fw-evaluation-grid">
            {content.evaluation.items.map((item, i) => (
              <article key={item.title}>
                <span>0{i + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
          <AppLink
            className="fw-inline-link"
            href={content.evaluation.link.href}
          >
            {content.evaluation.link.label}
            <ArrowRight size={17} />
          </AppLink>
        </section>
        <section className="fw-updates" id="resources">
          <div className="fw-shell fw-bordered-shell">
            <div className="fw-update-heading">
              <SectionHeading {...content.resources} />
            </div>
            <div className="fw-update-grid">
              {content.resources.items.map((item) => (
                <AppLink
                  className="fw-update-card"
                  href={`#${item.id}`}
                  key={item.id}
                >
                  <div
                    className="fw-update-image fw-resource-diagram"
                    aria-hidden="true"
                  >
                    {item.visual.map((label, i) => (
                      <span key={label}>
                        <small>0{i + 1}</small>
                        {label}
                      </span>
                    ))}
                  </div>
                  <div className="fw-update-meta">
                    <span>{item.type}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <span className="fw-inline-link">
                    {content.ui.readMore}
                    <ArrowRight size={17} />
                  </span>
                </AppLink>
              ))}
            </div>
            <div className="fw-resource-summaries">
              {content.resources.items.map((item) => (
                <article id={item.id} key={item.id}>
                  <p className="fw-eyebrow">{item.type}</p>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="fw-cta" id="engagement">
          <div className="fw-cta-grid" aria-hidden="true" />
          <div className="fw-shell">
            <h2>{content.engagement.title}</h2>
            <p>{content.engagement.description}</p>
            <div className="fw-engagement-options">
              {content.engagement.plans.map((plan) => (
                <AppLink
                  href={`/aurinova-reference/pricing#${plan.id}`}
                  key={plan.id}
                >
                  {plan.title}
                  <ArrowRight size={18} />
                </AppLink>
              ))}
            </div>
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
            <div className="fw-pilot-process" id="pilot-process">
              <h3>{content.engagement.processTitle}</h3>
              <ol>
                {content.engagement.process.map((step, i) => (
                  <li key={step}>
                    <span>0{i + 1}</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>
      </div>
      <AurinovaReferenceFooter />
    </main>
  );
}
