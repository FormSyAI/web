import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { cookies } from 'next/headers';

import { I18nProvider } from '@/components/i18n/i18n-provider';
import { defaultLocale, isLocale } from '@/content/i18n';

import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'AURINOVA · FormSy 企业 Agent Context Platform',
  description:
    '把企业知识、工具输出、执行轨迹与验证信号，计算成可行动、可验证、可审计的任务上下文。',
  icons: {
    icon: '/favicon.svg',
  },
};

const localeBootstrapScript = `
  try {
    var savedLocale = window.localStorage.getItem('aurinova-locale');
    var preferredLocale = savedLocale === 'zh-CN' || savedLocale === 'en-US'
      ? savedLocale
      : window.navigator.language.toLowerCase().startsWith('en')
        ? 'en-US'
        : 'zh-CN';
    if (preferredLocale !== document.documentElement.lang) {
      document.documentElement.dataset.localePending = preferredLocale;
      document.documentElement.style.visibility = 'hidden';
      document.cookie = 'aurinova-locale=' + preferredLocale + '; Path=/; Max-Age=31536000; SameSite=Lax';
      var reloadKey = 'aurinova-locale-reload';
      if (window.sessionStorage.getItem(reloadKey) !== preferredLocale) {
        window.sessionStorage.setItem(reloadKey, preferredLocale);
        window.location.reload();
      }
    } else {
      window.sessionStorage.removeItem('aurinova-locale-reload');
    }
  } catch {}
`;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const savedLocale = (await cookies()).get('aurinova-locale')?.value ?? null;
  const initialLocale = isLocale(savedLocale) ? savedLocale : defaultLocale;

  return (
    <html lang={initialLocale} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: localeBootstrapScript }} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <I18nProvider initialLocale={initialLocale}>{children}</I18nProvider>
      </body>
    </html>
  );
}
