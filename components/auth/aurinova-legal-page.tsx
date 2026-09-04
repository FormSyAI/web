'use client';

import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { LanguageSwitcher } from '@/components/i18n/language-switcher';
import { useI18n } from '@/components/i18n/i18n-provider';
import { authDictionaries } from '@/content/auth.i18n';

export function AurinovaLegalPage({
  document,
}: {
  document: 'data-agreement' | 'terms';
}) {
  const { locale } = useI18n();
  const copy = authDictionaries[locale];
  const title =
    document === 'terms'
      ? copy.legal.termsTitle
      : copy.legal.dataAgreementTitle;

  return (
    <main className="auth-page auth-legal-page">
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
      <article className="auth-legal-content">
        <Link className="auth-back" href="/aurinova-reference/signup">
          <ArrowLeft aria-hidden="true" />
          {copy.legal.backToSignup}
        </Link>
        <p className="auth-legal-status">{copy.legal.status}</p>
        <h1>{title}</h1>
        <p>{copy.legal.description}</p>
        <p>{copy.legal.assurance}</p>
      </article>
    </main>
  );
}
