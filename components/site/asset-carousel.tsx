'use client';

import { Boxes, Database, GitBranch, ScanLine, ShieldCheck } from 'lucide-react';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { siteContent } from '@/content/site';

const assetIcons = {
  TOCS: ScanLine,
  ACF: Boxes,
  ARCS: GitBranch,
  POLICY: ShieldCheck,
  TRACE: Database,
} as const;

export function AssetCarousel() {
  return (
    <Carousel
      opts={{ align: 'start', dragFree: true }}
      className="asset-carousel"
      aria-label="企业主权上下文资产"
    >
      <CarouselContent className="asset-carousel-track">
        {siteContent.assets.items.map((item) => {
          const Icon = assetIcons[item.code];
          return (
            <CarouselItem key={item.code} className="asset-slide">
              <article className="asset-card">
                <div className="asset-card-topline">
                  <Icon size={22} strokeWidth={1.5} aria-hidden="true" />
                  <span>{item.code}</span>
                </div>
                <p className="asset-summary">{item.summary}</p>
                <h3>{item.title}</h3>
                <p className="asset-description">{item.description}</p>
                <div className="asset-tags">
                  {item.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
              </article>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <div className="carousel-controls">
        <CarouselPrevious className="carousel-button carousel-previous" />
        <CarouselNext className="carousel-button carousel-next" />
      </div>
    </Carousel>
  );
}
