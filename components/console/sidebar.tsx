import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { useEffect, useState, type ReactNode } from 'react';

/** Keep desktop navigation in-flow; use the shared modal focus boundary on mobile. */
export function ConsoleSidebar({
  open,
  onOpenChange,
  label,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  label: string;
  children: ReactNode;
}) {
  const [compact, setCompact] = useState(
    () => window.matchMedia('(max-width: 680px)').matches,
  );
  useEffect(() => {
    const media = window.matchMedia('(max-width: 680px)');
    const update = () => {
      setCompact(media.matches);
      if (!media.matches) onOpenChange(false);
    };
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, [onOpenChange]);
  if (!compact)
    return (
      <aside className="cs-sidebar" aria-label={label}>
        {children}
      </aside>
    );
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="left"
        showCloseButton={false}
        className="cs-app cs-sidebar cs-sidebar-sheet open"
        aria-describedby={undefined}
      >
        <SheetTitle className="sr-only">{label}</SheetTitle>
        {children}
      </SheetContent>
    </Sheet>
  );
}
