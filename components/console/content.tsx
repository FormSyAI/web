import { Button } from '@/components/console/primitives';
import { AppLink as Link } from '@/components/runtime/app-link';
import { Badge as SharedBadge } from '@/components/ui/badge';
import {
  models,
  type Action,
  type ConsoleState,
  type Funding,
  type PlanId,
  type Usage,
} from '@/lib/console/domain';
import {
  Activity,
  ArrowRight,
  Code2,
  Cpu,
  KeyRound,
  ReceiptText,
  Settings,
  Terminal,
  Wallet,
} from 'lucide-react';
import { useEffect, useState, type ReactNode } from 'react';

export type T = (zh: string, en: string) => string;
export const demoRoot = '/demo/console';
export const navIcons = {
  chart: Activity,
  code: Code2,
  models: Cpu,
  key: KeyRound,
  terminal: Terminal,
  wallet: Wallet,
  receipt: ReceiptText,
  settings: Settings,
};
export const money = (cents: number) => `¥${(cents / 100).toFixed(2)}`;
export const number = (n: number) => n.toLocaleString('en-US');
export function date(value: string | null, tz: string) {
  return value
    ? new Intl.DateTimeFormat('sv-SE', {
        dateStyle: 'short',
        timeStyle: 'short',
        timeZone: tz,
      }).format(new Date(value))
    : '—';
}
export const sourceName = (s: Funding, t: T) =>
  s === 'plan' ? 'Coding Plan' : t('API 按量', 'Metered API');
export const modelName = (id: string) =>
  models.find((m) => m.id === id)?.name ?? id;
export const keyName = (s: ConsoleState, id: string) =>
  s.keys.find((k) => k.id === id)?.name ?? '—';
export type Modal =
  | { kind: 'order'; id: string }
  | { kind: 'key' }
  | { kind: 'secret'; secret: string }
  | { kind: 'confirm'; title: string; body: string; run: () => void }
  | { kind: 'request'; item: Usage };
export type PageProps = {
  state: ConsoleState;
  t: T;
  act: (a: Action) => ConsoleState | null;
  setModal: (m: Modal | null) => void;
  notice: (s: string) => void;
};
export function Badge({
  children,
  tone = '',
}: {
  children: ReactNode;
  tone?: string;
}) {
  return (
    <SharedBadge variant="console" className={tone}>
      {children}
    </SharedBadge>
  );
}
export function Empty({
  title,
  detail,
  href,
  label,
}: {
  title: string;
  detail: string;
  href?: string;
  label?: string;
}) {
  return (
    <div className="cs-empty">
      <Activity size={28} />
      <h3>{title}</h3>
      <p>{detail}</p>
      {href && (
        <Link className="cs-button primary" href={href}>
          {label}
          <ArrowRight size={16} />
        </Link>
      )}
    </div>
  );
}
export function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="cs-field">
      <span>{label}</span>
      {children}
    </label>
  );
}
export function Metric({
  label,
  value,
  hint,
}: {
  label: string;
  value: ReactNode;
  hint?: string;
}) {
  return (
    <div className="cs-metric">
      <span>{label}</span>
      <strong>{value}</strong>
      {hint && <small>{hint}</small>}
    </div>
  );
}
export function OrderButton({
  plan,
  kind,
  children,
  act,
  setModal,
}: {
  plan?: PlanId;
  kind: 'subscription' | 'upgrade' | 'renewal';
  children: ReactNode;
} & Pick<PageProps, 'act' | 'setModal'>) {
  return (
    <Button
      className="cs-button primary"
      onClick={() => {
        const next = act({ type: 'order', kind, plan });
        if (next) setModal({ kind: 'order', id: next.orders[0].id });
      }}
    >
      {children}
      <ArrowRight size={16} />
    </Button>
  );
}
export function useClock() {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 30000);
    return () => clearInterval(timer);
  }, []);
  return now;
}
