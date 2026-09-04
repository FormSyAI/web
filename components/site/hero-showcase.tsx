'use client';

import * as React from 'react';

import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { siteContent } from '@/content/site';

function HeroSignal() {
  const bars = [14, 20, 18, 26, 34, 31, 39, 46, 42, 50, 57, 53, 62, 70, 66, 76, 82, 78, 88, 94];

  return (
    <div className="hero-visual hero-signal" aria-label="任务完成率提升与成功任务成本优化示意图">
      <span className="corner corner-tl" />
      <span className="corner corner-tr" />
      <span className="corner corner-bl" />
      <span className="corner corner-br" />
      <div className="signal-legend">
        <span><i className="legend-violet" />任务完成率</span>
        <span><i className="legend-orange" />成功任务成本</span>
      </div>
      <div className="signal-chart" aria-hidden="true">
        {bars.map((value, index) => (
          <span className="signal-column" key={`${value}-${index}`}>
            <i className="signal-blocks" style={{ height: `${value}%` }} />
            <i
              className="signal-cost"
              style={{ height: `${Math.max(9, 52 - index * 2.15)}%` }}
            />
          </span>
        ))}
      </div>
      <span className="axis-label axis-left">COST / SUCCESSFUL TASK</span>
      <span className="axis-label axis-right">TASK SUCCESS</span>
      <span className="signal-wordmark">FORM<span>SY</span></span>
    </div>
  );
}

function ContextFlywheel() {
  const stages = [
    ['01', 'CONTEXT'],
    ['02', 'EVAL'],
    ['03', 'TRACE'],
    ['04', 'POLICY'],
    ['05', 'WEIGHTS'],
  ];

  return (
    <div className="hero-visual flywheel" aria-label="Context to Weights 企业学习闭环">
      <span className="corner corner-tl" />
      <span className="corner corner-tr" />
      <span className="corner corner-bl" />
      <span className="corner corner-br" />
      <div className="flywheel-core">
        <span>FORM</span>
        <strong>SY</strong>
        <small>PRIVATE LEARNING LOOP</small>
      </div>
      <ol className="flywheel-stages">
        {stages.map(([index, label], itemIndex) => (
          <li key={label} style={{ '--stage-index': itemIndex } as React.CSSProperties}>
            <span>{index}</span>
            <strong>{label}</strong>
          </li>
        ))}
      </ol>
      <div className="flywheel-orbit orbit-one" aria-hidden="true" />
      <div className="flywheel-orbit orbit-two" aria-hidden="true" />
    </div>
  );
}

export function HeroShowcase() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [active, setActive] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;
    const update = () => setActive(api.selectedScrollSnap());
    update();
    api.on('select', update);
    return () => {
      api.off('select', update);
    };
  }, [api]);

  React.useEffect(() => {
    if (!api) return;
    const timer = window.setInterval(() => api.scrollNext(), 7500);
    return () => window.clearInterval(timer);
  }, [api]);

  return (
    <section className="hero section-grid" aria-roledescription="carousel" aria-label="FormSy 产品主张">
      <Carousel opts={{ loop: true }} setApi={setApi} className="hero-carousel">
        <CarouselContent className="hero-carousel-content">
          {siteContent.heroSlides.map((slide) => (
            <CarouselItem key={slide.id} className="hero-slide">
              <div className="shell hero-grid">
                <div className="hero-copy">
                  <p className="eyebrow">{slide.eyebrow}</p>
                  <h1>
                    {slide.title.split('\n').map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </h1>
                  <p className="hero-description">{slide.description}</p>
                  <div className="button-row">
                    <a className="button button-primary" href={slide.primaryCta.href}>
                      {slide.primaryCta.label}
                    </a>
                    <a className="button button-secondary" href={slide.secondaryCta.href}>
                      {slide.secondaryCta.label}
                    </a>
                  </div>
                </div>
                {slide.visual === 'signal' ? <HeroSignal /> : <ContextFlywheel />}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="hero-pagination" aria-label="切换主视觉">
          {siteContent.heroSlides.map((slide, index) => (
            <button
              key={slide.id}
              className={active === index ? 'is-active' : ''}
              type="button"
              aria-label={`显示第 ${index + 1} 张`}
              aria-current={active === index ? 'true' : undefined}
              onClick={() => api?.scrollTo(index)}
            />
          ))}
        </div>
      </Carousel>
    </section>
  );
}
