import type { Locale } from './i18n';
import { fireworksReferenceContent } from './fireworks-reference';
import { fireworksReferenceContentZh } from './fireworks-reference.zh';

export const fireworksReferenceDictionaries = {
  'zh-CN': fireworksReferenceContentZh,
  'en-US': fireworksReferenceContent,
} as const satisfies Record<Locale, unknown>;

export type FireworksReferenceContent =
  (typeof fireworksReferenceDictionaries)[Locale];
export type FireworksMenuKey = keyof typeof fireworksReferenceContent.megaMenus;
