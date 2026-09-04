'use client';

import { useEffect } from 'react';

const destination = '/aurinova-reference';

export default function LegacyReferenceRoute() {
  useEffect(() => {
    window.location.replace(destination);
  }, []);

  return (
    <main>
      <p>正在打开 AURINOVA…</p>
      <a href={destination}>立即进入</a>
    </main>
  );
}
