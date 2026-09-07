import { Link } from 'react-router';
import type { AnchorHTMLAttributes } from 'react';

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

/** Keep the existing href API while React Router owns internal navigation. */
export function AppLink({
  href,
  children,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  if (!href.startsWith('/') || href.startsWith('//') || props.download) {
    return (
      <a {...props} href={withBasePath(href)}>
        {children}
      </a>
    );
  }
  return (
    <Link {...props} to={stripBasePath(href)}>
      {children}
    </Link>
  );
}
