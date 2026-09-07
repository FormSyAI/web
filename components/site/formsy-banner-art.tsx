import type { Locale } from '@/content/i18n';
import { withBasePath } from '@/components/runtime/app-link';

type BannerArtProps = {
  locale: Locale;
  variant: 'verified-work' | 'enterprise-learning';
  alt: string;
  caption: string;
  label: string;
};

export function FormsyBannerArt({
  variant,
  locale,
  alt,
  caption,
  label,
}: BannerArtProps) {
  const suffix = locale === 'zh-CN' ? '-zh' : '';

  return (
    <figure className={`fw-banner-art fw-banner-art--${variant}`}>
      <picture>
        <source
          media="(max-width: 680px)"
          srcSet={withBasePath(`/banners/${variant}-mobile${suffix}.svg`)}
        />
        <img
          src={withBasePath(`/banners/${variant}${suffix}.svg`)}
          width={800}
          height={520}
          alt={alt}
          fetchPriority="high"
        />
      </picture>
      <figcaption>
        <span>{label}</span>
        <small>{caption}</small>
      </figcaption>
    </figure>
  );
}
