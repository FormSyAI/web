export const DEFAULT_AUTH_RETURN_TO = '/aurinova-reference';

const validationOrigin = 'https://aurinova.invalid';

function hasUnsafeCharacters(value: string) {
  return (
    value.includes('\\') ||
    Array.from(value).some((character) => {
      const codePoint = character.codePointAt(0) ?? 0;
      return codePoint < 32 || codePoint === 127;
    })
  );
}

export function normalizeAuthReturnTo(
  value: unknown,
  fallback = DEFAULT_AUTH_RETURN_TO,
) {
  if (
    typeof value !== 'string' ||
    !value.startsWith('/') ||
    value.startsWith('//') ||
    hasUnsafeCharacters(value)
  ) {
    return fallback;
  }

  try {
    const base = new URL(validationOrigin);
    const resolved = new URL(value, base);
    if (resolved.origin !== base.origin) return fallback;
    return `${resolved.pathname}${resolved.search}${resolved.hash}`;
  } catch {
    return fallback;
  }
}

export function isSafeAuthReturnTo(value: unknown): value is string {
  return normalizeAuthReturnTo(value, '') !== '';
}
