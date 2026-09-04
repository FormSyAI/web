import type { Metadata } from 'next';

import './aurinova-reference.css';

export const metadata: Metadata = {
  title: 'AURINOVA · Specialized AI Infrastructure',
  description:
    'Training, inference, and model infrastructure for specialized enterprise intelligence.',
};

export default function AurinovaReferenceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
