'use client';

import * as React from 'react';

import {
  defaultLocale,
  isLocale,
  siteDictionaries,
  type Locale,
  type SiteContent,
} from '@/content/i18n';

const STORAGE_KEY = 'aurinova-locale';

type I18nContextValue = {
  locale: Locale;
  content: SiteContent;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
};

const I18nContext = React.createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = React.useState<Locale>(defaultLocale);

  React.useEffect(() => {
    let savedLocale: string | null = null;
    try {
      savedLocale = window.localStorage.getItem(STORAGE_KEY);
    } catch {
      // Browser storage can be unavailable in strict privacy contexts.
    }
    const preferredLocale = isLocale(savedLocale)
      ? savedLocale
      : window.navigator.language.toLowerCase().startsWith('en')
        ? 'en-US'
        : defaultLocale;
    const timer = window.setTimeout(() => setLocale(preferredLocale), 0);
    return () => window.clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    const pathname = window.location.pathname;
    const documentLocale = pathname.startsWith('/dev/design-system')
      ? 'zh-CN'
      : locale;
    document.documentElement.lang = documentLocale;

    if (pathname === '/') {
      document.title = siteDictionaries[locale].ui.pageTitle;
      document
        .querySelector('meta[name="description"]')
        ?.setAttribute('content', siteDictionaries[locale].ui.pageDescription);
    }

    try {
      window.localStorage.setItem(STORAGE_KEY, locale);
    } catch {
      // The switch still works for the current session without persistence.
    }
  }, [locale]);

  const value = React.useMemo<I18nContextValue>(
    () => ({
      locale,
      content: siteDictionaries[locale],
      setLocale,
      toggleLocale: () =>
        setLocale((current) => (current === 'zh-CN' ? 'en-US' : 'zh-CN')),
    }),
    [locale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = React.useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return context;
}
