import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
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
  const ref = useRef<HTMLDialogElement>(null);
  const id = useId();
  useEffect(() => {
    const element = ref.current;
    element?.showModal();
    return () => element?.close();
  }, []);
  return (
    <dialog
      ref={ref}
      className="cs-dialog"
      aria-labelledby={id}
      onCancel={onClose}
    >
      <header>
        <h2 id={id}>{title}</h2>
        <button
          className="cs-icon-button"
          onClick={onClose}
          aria-label="Close / 关闭"
        >
          <X size={20} />
        </button>
      </header>
      {children}
    </dialog>
  );
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
    <button
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
    </button>
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
