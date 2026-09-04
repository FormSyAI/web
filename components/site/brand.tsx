import { Sparkles } from 'lucide-react';

import { siteContent } from '@/content/site';

type BrandProps = {
  inverse?: boolean;
};

export function Brand({ inverse = false }: BrandProps) {
  return (
    <a
      className={`brand${inverse ? ' brand-inverse' : ''}`}
      href="#top"
      aria-label="AURINOVA 首页"
    >
      <span className="brand-mark" aria-hidden="true">
        <Sparkles size={22} strokeWidth={1.75} />
      </span>
      <span>{siteContent.brand.name}</span>
    </a>
  );
}
