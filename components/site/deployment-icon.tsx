import { Blocks, CloudCog, PackageCheck, Cpu, ShieldCheck, Gauge } from 'lucide-react';

const deploymentIcons = {
  'deployment-open': Blocks,
  'deployment-hosted': CloudCog,
  'deployment-byom': PackageCheck,
  'deployment-byoc': Cpu,
  'deployment-private': ShieldCheck,
  'deployment-capacity': Gauge,
};

export function DeploymentIcon({ id }: { id: string }) {
  const Icon = deploymentIcons[id as keyof typeof deploymentIcons] ?? Blocks;
  return (
    <span className="fw-deployment-icon" aria-hidden="true">
      <Icon size={24} strokeWidth={1.75} />
    </span>
  );
}
