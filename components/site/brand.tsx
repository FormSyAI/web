'use client';

import Image from '@/components/runtime/app-image';

import { useI18n } from '@/components/i18n/i18n-provider';

type BrandProps = {
  inverse?: boolean;
};

export function Brand({ inverse = false }: BrandProps) {
  const { content } = useI18n();

  return (
    <a
      className={`brand${inverse ? ' brand-inverse' : ''}`}
      href="#top"
      aria-label={content.ui.homeLabel}
    >
      <Image
        className="brand-logo"
        src="/aurinova-logo.svg"
        alt="AURINOVA"
        width={1186}
        height={204}
      />
    </a>
  );
}
