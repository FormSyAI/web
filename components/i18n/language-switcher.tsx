'use client';

import { Languages } from 'lucide-react';

import { useI18n } from './i18n-provider';

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { content, toggleLocale } = useI18n();

  return (
    <button
      className={`language-switcher${compact ? ' language-switcher-compact' : ''}`}
      type="button"
      aria-label={content.ui.switchLanguage}
      title={content.ui.switchLanguage}
      onClick={toggleLocale}
    >
      <Languages size={16} strokeWidth={1.7} aria-hidden="true" />
      <span>{content.ui.alternateLocaleName}</span>
    </button>
  );
}
