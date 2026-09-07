import type { AnchorHTMLAttributes, MouseEvent } from 'react';

const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');

export function withBasePath(value: string) {
  if (!value.startsWith('/') || value.startsWith('//')) return value;
  if (!basePath || basePath === '/') return value;
  if (value === basePath || value.startsWith(`${basePath}/`)) return value;
  return `${basePath}${value}`;
}

export function stripBasePath(pathname: string) {
  if (!basePath || basePath === '/') return pathname;
  if (pathname === basePath) return '/';
  return pathname.startsWith(`${basePath}/`)
    ? pathname.slice(basePath.length)
    : pathname;
}

export function navigate(href: string, replace = false) {
  const destination = withBasePath(href);
  window.history[replace ? 'replaceState' : 'pushState']({}, '', destination);
  window.dispatchEvent(new PopStateEvent('popstate'));
}

export function AppLink({
  children,
  href,
  onClick,
  target,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  const destination = withBasePath(href);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      target === '_blank' ||
      !href.startsWith('/') ||
      href.startsWith('//')
    ) {
      return;
    }
    const url = new URL(destination, window.location.origin);
    if (
      url.pathname === window.location.pathname &&
      url.search === window.location.search &&
      url.hash
    ) {
      // Let the browser also handle repeated clicks on the current anchor.
      return;
    }
    event.preventDefault();
    navigate(href);
  };

  return (
    <a {...props} href={destination} target={target} onClick={handleClick}>
      {children}
    </a>
  );
}
