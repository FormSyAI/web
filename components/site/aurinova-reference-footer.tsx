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
      <div className="fw-shell fw-footer-grid">
        {content.footer.map((group) => (
          <div className="fw-footer-group" key={group.title}>
            <h3>{group.title}</h3>
            {group.links.map(([label, href]) => (
              <Link href={href} key={label}>
                {label}
              </Link>
            ))}
          </div>
        ))}
      </div>
      <div className="fw-shell fw-footer-bottom">
        <Image
          className="fw-footer-site-logo"
          src={content.meta.footerLogo}
          width={228}
          height={52}
          unoptimized
          alt="AURINOVA"
        />
        <span>{content.ui.copyright}</span>
        <div>
          <Link href="/">{content.ui.currentSite}</Link>
          <Link href={content.meta.contactHref}>
            {content.ui.officialSource}
          </Link>
        </div>
      </div>
    </footer>
  );
}
