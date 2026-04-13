export const STORAGE_KEYS = {
  accessToken: 'taskhub.accessToken',
  authUser: 'taskhub.authUser',
} as const;

type ApiEnvironment = 'development' | 'staging' | 'production';

type LocalEnv = Record<string, string | boolean | undefined>;

const env = ((import.meta as ImportMeta & { env?: LocalEnv }).env ?? {}) as LocalEnv;

const getEnv = (key: string): string | undefined => {
  const value = env[key];
  if (typeof value !== 'string') {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
};

const normalizeBaseUrl = (url: string): string => url.replace(/\/+$/, '');

const fallbackBaseUrl = 'http://localhost:3000/api';

const resolvedBaseUrl = getEnv('VITE_API_BASE_URL');

export const API_CONFIG = {
  env: (getEnv('MODE') ?? 'development') as ApiEnvironment,
  baseURL: normalizeBaseUrl(resolvedBaseUrl ?? fallbackBaseUrl),
  timeoutMs: Number(getEnv('VITE_API_TIMEOUT_MS') ?? '10000'),
  withCredentials: getEnv('VITE_API_WITH_CREDENTIALS') === 'true',
  defaultHeaders: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
} as const;

if (!resolvedBaseUrl && env.DEV === true) {
  // Warn only in dev; production should be configured by env.
  console.warn(
    '[api/config] VITE_API_BASE_URL is missing. Falling back to',
    fallbackBaseUrl,
  );
}

export type RequestAuthMode = 'public' | 'required' | 'optional';

export interface ApiRequestConfig {
  authMode?: RequestAuthMode;
}

export const AUTH_MODE = {
  PUBLIC: 'public' as const,
  REQUIRED: 'required' as const,
  OPTIONAL: 'optional' as const,
};
