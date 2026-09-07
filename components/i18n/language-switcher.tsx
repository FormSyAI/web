import { Button } from '@/components/ui/button';

import { Languages } from 'lucide-react';

import { useI18n } from './i18n-provider';

export function LanguageSwitcher({
  compact = false,
  labels,
}: {
  compact?: boolean;
  labels?: { switchLanguage: string; alternateLocaleName: string };
}) {
  const { content, toggleLocale } = useI18n();
  const activeLabels = labels ?? content.ui;

  return (
    <Button
      variant="brand"
      className={`language-switcher${compact ? ' language-switcher-compact' : ''}`}
      type="button"
      aria-label={activeLabels.switchLanguage}
      title={activeLabels.switchLanguage}
      onClick={toggleLocale}
    >
      <Languages size={16} strokeWidth={1.7} aria-hidden="true" />
      <span>{activeLabels.alternateLocaleName}</span>
    </Button>
  );
}
