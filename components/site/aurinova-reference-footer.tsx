'use client';

import Image from '@/components/runtime/app-image';
import { AppLink as Link } from '@/components/runtime/app-link';

import { useI18n } from '@/components/i18n/i18n-provider';
import { aurinovaReferenceDictionaries } from '@/content/aurinova-reference.i18n';

export function AurinovaReferenceFooter() {
  const { locale } = useI18n();
  const content = aurinovaReferenceDictionaries[locale];

  return (
    <footer className="fw-footer">
      <div className="fw-shell fw-about" id="about">
        <h2>{content.about.title}</h2>
        <p>{content.about.description}</p>
        <p className="fw-about-address">
          <span>{content.about.addressLabel}</span>
          {content.about.address}
        </p>
      </div>
      <div className="fw-shell fw-footer-bottom">
        <Image
          className="fw-footer-site-logo"
          src={content.meta.footerLogo}
          width={270}
          height={35}
          unoptimized
          alt="AURINOVA 锦曜新宸"
        />
        <span>{content.ui.copyright}</span>
        <div>
          <Link href="/aurinova-reference#overview">
            {content.ui.currentSite}
          </Link>
          <Link href={content.meta.contactHref}>
            {content.ui.officialSource}
          </Link>
        </div>
      </div>
    </footer>
  );
}
