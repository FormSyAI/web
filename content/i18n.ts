import { siteContentEn } from './site.en';
import { siteContentZh } from './site';

export const locales = ['zh-CN', 'en-US'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'zh-CN';

type ContentShape<T> = T extends string
  ? string
  : T extends readonly (infer Item)[]
    ? readonly ContentShape<Item>[]
    : T extends object
      ? { readonly [Key in keyof T]: ContentShape<T[Key]> }
      : T;

export const siteDictionaries = {
  'zh-CN': siteContentZh,
  'en-US': siteContentEn,
} as const satisfies Record<Locale, ContentShape<typeof siteContentZh>>;

export type SiteContent = (typeof siteDictionaries)[Locale];

export function isLocale(value: string | null): value is Locale {
  return locales.includes(value as Locale);
}
