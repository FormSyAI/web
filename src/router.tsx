import { lazy, Suspense, useEffect, useSyncExternalStore } from 'react';
import { AppLink, stripBasePath } from '@/components/runtime/app-link';

const routeAliases: Record<string, string> = {
  '/fireworks-reference': '/aurinova-reference',
  '/login': '/aurinova-reference/login',
  '/pricing': '/aurinova-reference/pricing',
  '/signup': '/aurinova-reference/signup',
};

const routeComponents: Record<string, React.ComponentType> = {
  '/': lazy(() => import('@/app/page')),
  '/aurinova-reference': lazy(() => import('@/app/aurinova-reference/page')),
  '/aurinova-reference/pricing': lazy(
    () => import('@/app/aurinova-reference/pricing/page'),
  ),
  '/aurinova-reference/login': lazy(
    () => import('@/app/aurinova-reference/(auth)/login/page'),
  ),
  '/aurinova-reference/login/email': lazy(
    () => import('@/app/aurinova-reference/(auth)/login/email/page'),
  ),
  '/aurinova-reference/login/sso': lazy(
    () => import('@/app/aurinova-reference/(auth)/login/sso/page'),
  ),
  '/aurinova-reference/signup': lazy(
    () => import('@/app/aurinova-reference/(auth)/signup/page'),
  ),
  '/aurinova-reference/forgot-password': lazy(
    () => import('@/app/aurinova-reference/(auth)/forgot-password/page'),
  ),
  '/aurinova-reference/docs': lazy(
    () => import('@/app/aurinova-reference/(auth)/docs/page'),
  ),
  '/aurinova-reference/terms': lazy(
    () => import('@/app/aurinova-reference/(auth)/terms/page'),
  ),
  '/aurinova-reference/data-processing': lazy(
    () => import('@/app/aurinova-reference/(auth)/data-processing/page'),
  ),
  '/dev/design-system': lazy(() => import('@/app/dev/design-system/page')),
};

function subscribe(listener: () => void) {
  window.addEventListener('popstate', listener);
  return () => window.removeEventListener('popstate', listener);
}

function getPathname() {
  const path = stripBasePath(window.location.pathname).replace(/\/$/, '');
  return path || '/';
}

function MissingPage() {
  return (
    <main
      style={{
        display: 'grid',
        minHeight: '100vh',
        placeContent: 'center',
        padding: '2rem',
        textAlign: 'center',
      }}
    >
      <p style={{ fontFamily: 'ui-monospace, monospace' }}>404</p>
      <h1>页面暂未开放</h1>
      <p>这个地址还没有对应的公开页面。</p>
      <AppLink href="/aurinova-reference">返回 AURINOVA</AppLink>
    </main>
  );
}

export function AppRouter() {
  const pathname = useSyncExternalStore(subscribe, getPathname, () => '/');
  const resolvedPath = routeAliases[pathname] ?? pathname;
  const Page = routeComponents[resolvedPath] ?? MissingPage;

  useEffect(() => {
    window.scrollTo({ top: 0 });
    if (window.location.hash) {
      window.requestAnimationFrame(() => {
        document
          .getElementById(window.location.hash.slice(1))
          ?.scrollIntoView({ block: 'start' });
      });
    }
  }, [resolvedPath]);

  return (
    <Suspense fallback={null}>
      <Page />
    </Suspense>
  );
}
