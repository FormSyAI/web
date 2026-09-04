import type { Locale } from './i18n';
import { aurinovaReferenceContent } from './aurinova-reference';
import { aurinovaReferenceContentZh } from './aurinova-reference.zh';

export const aurinovaReferenceDictionaries = {
  'zh-CN': aurinovaReferenceContentZh,
  'en-US': aurinovaReferenceContent,
} as const satisfies Record<Locale, unknown>;

export type AurinovaReferenceContent =
  (typeof aurinovaReferenceDictionaries)[Locale];
export type AurinovaMenuKey = keyof typeof aurinovaReferenceContent.megaMenus;
