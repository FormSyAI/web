import type { Metadata } from 'next';
import { cookies } from 'next/headers';

import { AurinovaLegalPage } from '@/components/auth/aurinova-legal-page';
import { authDictionaries } from '@/content/auth.i18n';
import { defaultLocale, isLocale } from '@/content/i18n';

export async function generateMetadata(): Promise<Metadata> {
  const savedLocale = (await cookies()).get('aurinova-locale')?.value ?? null;
  const locale = isLocale(savedLocale) ? savedLocale : defaultLocale;
  const copy = authDictionaries[locale];

  return {
    title: `${copy.legal.termsTitle} | AURINOVA`,
    description: copy.legal.termsMetaDescription,
  };
}

export default function TermsPage() {
  return <AurinovaLegalPage document="terms" />;
}
