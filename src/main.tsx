import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { I18nProvider } from '@/components/i18n/i18n-provider';
import { AppRouter } from '@/src/router';

import '@/app/globals.css';
import '@/app/aurinova-reference/aurinova-reference.css';
import '@/app/aurinova-reference/auth.css';
import '@/app/aurinova-reference/pricing/pricing.css';
import '@/app/dev/design-system/design-system.css';

let savedLocale: string | null = null;
try {
  savedLocale = window.localStorage.getItem('aurinova-locale');
} catch {
  // Browser storage can be unavailable in strict privacy contexts.
}
const initialLocale =
  savedLocale === 'zh-CN' || savedLocale === 'en-US'
    ? savedLocale
    : window.navigator.language.toLowerCase().startsWith('en')
      ? 'en-US'
      : 'zh-CN';

document.documentElement.lang = initialLocale;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nProvider initialLocale={initialLocale}>
      <AppRouter />
    </I18nProvider>
  </StrictMode>,
);
