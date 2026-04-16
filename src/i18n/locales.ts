export const SUPPORTED_LOCALES = ['en', 'ro', 'hu'] as const;

export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: SupportedLocale = 'en';

export const isSupportedLocale = (value: string): value is SupportedLocale =>
  SUPPORTED_LOCALES.includes(value as SupportedLocale);

export const getLocaleFromPathname = (pathname: string): SupportedLocale | null => {
  const firstSegment = pathname.split('/').filter(Boolean)[0];
  if (!firstSegment || !isSupportedLocale(firstSegment)) {
    return null;
  }
  return firstSegment;
};

export const stripLocaleFromPathname = (pathname: string): string => {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length === 0) {
    return '/';
  }
  if (isSupportedLocale(segments[0])) {
    const rest = segments.slice(1);
    return rest.length === 0 ? '/' : `/${rest.join('/')}`;
  }
  return pathname;
};

export const withLocalePath = (locale: SupportedLocale, path: string): string => {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  if (normalized === '/') {
    return `/${locale}`;
  }
  return `/${locale}${normalized}`;
};
