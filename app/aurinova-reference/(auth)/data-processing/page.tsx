import type { Metadata } from 'next';

import { AurinovaLegalPage } from '@/components/auth/aurinova-legal-page';

export const metadata: Metadata = {
  title: 'Data Processing Agreement | AURINOVA',
  description: 'AURINOVA data processing agreement status.',
};

export default function DataProcessingPage() {
  return <AurinovaLegalPage document="data-agreement" />;
}
