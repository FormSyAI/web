'use client';

import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { LanguageSwitcher } from '@/components/i18n/language-switcher';
import { useI18n } from '@/components/i18n/i18n-provider';
import { authDictionaries } from '@/content/auth.i18n';

export function AurinovaAuthDocsPage() {
  const { locale } = useI18n();
  const copy = authDictionaries[locale];
  const docs = copy.docsPage;

  return (
    <main className="auth-page auth-document-page">
      <header className="auth-header">
        <Link href="/aurinova-reference" aria-label={copy.shell.homeLabel}>
          <Image
            src="/aurinova-logo.svg"
            alt="AURINOVA"
            width={228}
            height={39}
            priority
          />
        </Link>
        <LanguageSwitcher labels={copy.shell} />
      </header>

      <article className="auth-docs-content">
        <Link className="auth-back" href="/aurinova-reference/login">
          <ArrowLeft aria-hidden="true" />
          {docs.backToLogin}
        </Link>
        <h1>{docs.title}</h1>
        <p className="auth-docs-intro">{docs.intro}</p>

        <section aria-labelledby="auth-browser-contract">
          <h2 id="auth-browser-contract">{docs.browserContractTitle}</h2>
          <p>{docs.browserContractDescription}</p>
        </section>

        <section aria-labelledby="auth-endpoints">
          <h2 id="auth-endpoints">{docs.endpointsTitle}</h2>
          <div className="auth-endpoint-list">
            {docs.endpoints.map((endpoint) => (
              <article key={`${endpoint.method}-${endpoint.path}`}>
                <div>
                  <span>{endpoint.method}</span>
                  <code>{endpoint.path}</code>
                </div>
                <p>{endpoint.purpose}</p>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="auth-live-readiness">
          <h2 id="auth-live-readiness">{docs.liveReadinessTitle}</h2>
          <ul>
            {docs.liveReadinessItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="auth-security-boundary">
          <h2 id="auth-security-boundary">{docs.securityTitle}</h2>
          <p>{docs.securityDescription}</p>
        </section>
      </article>
    </main>
  );
}
