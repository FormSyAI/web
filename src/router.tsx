import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router';
import { AppLink } from '@/components/runtime/app-link';

const ConsolePage = lazy(() => import('@/app/console/page'));

const routeAliases: Record<string, string> = {
  '/design-system': '/dev/design-system',
  '/console': '/console/usage',
  '/demo/console': '/demo/console/usage',
  '/': '/aurinova-reference',
  '/fireworks-reference': '/aurinova-reference',
  '/login': '/aurinova-reference/login',
  '/pricing': '/aurinova-reference/pricing',
  '/signup': '/aurinova-reference/signup',
};

const routeComponents: Record<string, React.ComponentType> = {
  '/aurinova-reference/coding-plan': lazy(
    () => import('@/app/aurinova-reference/coding-plan/page'),
  ),
  '/aurinova-reference/models': lazy(
    () => import('@/app/aurinova-reference/models/page'),
  ),
  '/original-home': lazy(() => import('@/app/page')),
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

// Mount inside Suspense so a lazy page has committed before its anchor is read.
function ScrollToLocation({ location }: { location: string }) {
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const hash = location.split('#')[1];
      if (hash) {
        let id = hash;
        try {
          id = decodeURIComponent(hash);
        } catch {
          /* Keep malformed fragments literal. */
        }
        const target = document.getElementById(id);
        target?.scrollIntoView({
          block: 'start',
          inline: 'nearest',
          behavior: 'instant',
        });
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, [location]);
  return null;
}

function PageView({ Page }: { Page: React.ComponentType }) {
  const location = useLocation();
  return (
    <Suspense fallback={<output aria-label="Loading page" />}>
      <Page key={`${location.pathname}${location.search}`} />
      <ScrollToLocation
        location={`${location.pathname}${location.search}${location.hash}`}
      />
    </Suspense>
  );
}

export function AppRouter() {
  return (
    <BrowserRouter
      basename={import.meta.env.BASE_URL.replace(/\/$/, '') || '/'}
    >
      <Routes>
        {Object.entries(routeComponents).map(([path, Page]) => (
          <Route key={path} path={path} element={<PageView Page={Page} />} />
        ))}
        {Object.entries(routeAliases).map(([path, target]) => (
          <Route
            key={path}
            path={path}
            element={
              <PageView
                Page={
                  target.startsWith('/console') ||
                  target.startsWith('/demo/console')
                    ? ConsolePage
                    : routeComponents[target]
                }
              />
            }
          />
        ))}
        <Route path="/console/*" element={<PageView Page={ConsolePage} />} />
        <Route
          path="/demo/console/*"
          element={<PageView Page={ConsolePage} />}
        />
        <Route path="*" element={<MissingPage />} />
      </Routes>
    </BrowserRouter>
  );
}
