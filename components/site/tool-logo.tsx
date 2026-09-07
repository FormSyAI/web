import AppImage from '@/components/runtime/app-image';
import { Cpu, Workflow } from 'lucide-react';

const logos: Record<string, string> = {
  'Claude Code': 'claude',
  Codex: 'codex',
  Cursor: 'cursor',
  TRAE: 'trae',
  OpenCode: 'opencode',
  Git: 'git',
  Jira: 'jira',
  Kubernetes: 'kubernetes',
};

/** Decorative marks accompany visible tool names. */
export function ToolLogo({ name }: { name: string }) {
  const logo = logos[name];
  if (logo) {
    return (
      <AppImage
        src={`/tool-logos/${logo}.svg`}
        alt=""
        width={28}
        height={28}
        loading="lazy"
      />
    );
  }
  const Icon = name === 'CI / CD' ? Workflow : Cpu;
  return <Icon size={28} aria-hidden="true" />;
}
