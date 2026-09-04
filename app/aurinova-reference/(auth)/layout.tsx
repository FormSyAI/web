import type { Metadata } from 'next';

import '../auth.css';

export const metadata: Metadata = {
  title: 'Authentication | AURINOVA',
  description: 'Create or access your AURINOVA account.',
};

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
