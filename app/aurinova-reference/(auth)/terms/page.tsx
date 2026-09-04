import type { Metadata } from 'next';

import { AurinovaLegalPage } from '@/components/auth/aurinova-legal-page';

export const metadata: Metadata = {
  title: 'Terms of service | AURINOVA',
  description: 'AURINOVA terms of service status.',
};

export default function TermsPage() {
  return <AurinovaLegalPage document="terms" />;
}
