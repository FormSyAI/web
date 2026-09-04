import type { Metadata } from 'next';

import './pricing.css';

export const metadata: Metadata = {
  title: '定价 | AURINOVA',
  description: 'AURINOVA 推理、训练与按需部署的透明定价。',
};

export default function PricingLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
