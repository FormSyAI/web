import { Dialog as DialogPrimitive } from '@base-ui/react/dialog';
import { Button as SharedButton } from '@/components/ui/button';
import { Input as SharedInput } from '@/components/ui/input';
import type { ComponentProps } from 'react';
export { NativeSelect as Select } from '@/components/ui/native-select';
export { Checkbox } from '@/components/ui/checkbox';
import { useState, type ReactNode } from 'react';
import { X, Copy, Check } from 'lucide-react';
export function Dialog({
  title,
  children,
  onClose,
}: {
  title: string;
  children: ReactNode;
  onClose: () => void;
}) {
  return (
    <DialogPrimitive.Root
      open
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogPrimitive.Portal>
        <div className="cs-app cs-dialog-layer">
          <DialogPrimitive.Backdrop className="cs-dialog-backdrop" />
          <DialogPrimitive.Popup className="cs-dialog">
            <header>
              <DialogPrimitive.Title>{title}</DialogPrimitive.Title>
              <Button
                className="cs-icon-button"
                onClick={onClose}
                aria-label="Close / 关闭"
              >
                <X size={20} />
              </Button>
            </header>
            {children}
          </DialogPrimitive.Popup>
        </div>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
export function Button(props: ComponentProps<typeof SharedButton>) {
  return <SharedButton unstyled {...props} />;
}
export function Input(props: ComponentProps<typeof SharedInput>) {
  return <SharedInput unstyled {...props} />;
}
export function CopyButton({
  value,
  label,
  copiedLabel,
}: {
  value: string;
  label: string;
  copiedLabel: string;
}) {
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);
  return (
    <Button
      className="cs-button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          setFailed(false);
        } catch {
          setFailed(true);
        }
      }}
    >
      {copied ? <Check size={16} /> : <Copy size={16} />}
      {copied ? copiedLabel : label}
      {failed && (
        <span role="alert">
          {' '}
          · {label === '复制' ? '请手动选择复制' : 'Select and copy manually'}
        </span>
      )}
    </Button>
  );
}
export function downloadCsv(name: string, rows: (string | number)[][]) {
  const safe = (value: string | number) => {
    let text = String(value);
    if (/^[=+@\-\t\r]/.test(text) && typeof value === 'string')
      text = `'${text}`;
    return `"${text.replaceAll('"', '""')}"`;
  };
  const blob = new Blob(
    ['\ufeff' + rows.map((row) => row.map(safe).join(',')).join('\r\n')],
    { type: 'text/csv;charset=utf-8' },
  );
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
