import type { Metadata } from 'next';
import { cookies } from 'next/headers';

import { AurinovaAuthDocsPage } from '@/components/auth/aurinova-auth-docs-page';
import { authDictionaries } from '@/content/auth.i18n';
import { defaultLocale, isLocale } from '@/content/i18n';

export async function generateMetadata(): Promise<Metadata> {
  const savedLocale = (await cookies()).get('aurinova-locale')?.value ?? null;
  const locale = isLocale(savedLocale) ? savedLocale : defaultLocale;
  const copy = authDictionaries[locale].docsPage;

  return {
    title: `${copy.title} | AURINOVA`,
    description: copy.metaDescription,
  };
}

export default function AuthDocsPage() {
  return <AurinovaAuthDocsPage />;
}
