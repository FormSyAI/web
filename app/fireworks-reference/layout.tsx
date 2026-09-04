import type { Metadata } from 'next';

import './fireworks-reference.css';

export const metadata: Metadata = {
  title: 'Fireworks AI · Unofficial Reference Reconstruction',
  description:
    'An independently written reference reconstruction of the public Fireworks AI homepage information architecture.',
};

export default function FireworksReferenceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
