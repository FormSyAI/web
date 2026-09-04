import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Design System · AURINOVA',
  description: 'AURINOVA / FormSy 设计系统开发预览。',
};

export default function DesignSystemLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
