'use client';

import {
  Boxes,
  Database,
  GitBranch,
  ScanLine,
  ShieldCheck,
} from 'lucide-react';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { useI18n } from '@/components/i18n/i18n-provider';

const assetIcons = {
  TOCS: ScanLine,
  ACF: Boxes,
  ARCS: GitBranch,
  POLICY: ShieldCheck,
  TRACE: Database,
} as const;

export function AssetCarousel() {
  const { content } = useI18n();

  return (
    <Carousel
      opts={{ align: 'start', dragFree: true }}
      className="asset-carousel"
      aria-label={content.ui.assetCarouselLabel}
    >
      <CarouselContent className="asset-carousel-track">
        {content.assets.items.map((item) => {
          const Icon = assetIcons[item.code];
          return (
            <CarouselItem key={item.code} className="asset-slide">
              <div className="asset-card">
                <div className="asset-card-topline">
                  <Icon size={22} strokeWidth={1.5} aria-hidden="true" />
                  <span>{item.code}</span>
                </div>
                <p className="asset-summary">{item.summary}</p>
                <h3>{item.title}</h3>
                <p className="asset-description">{item.description}</p>
                <div className="asset-tags">
                  {item.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
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
