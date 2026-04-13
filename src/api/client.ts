import { API_CONFIG, AUTH_MODE, STORAGE_KEYS, type ApiRequestConfig } from './config';

type Primitive = string | number | boolean | null | undefined;
type QueryParams = Record<string, Primitive | Primitive[]>;

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface HttpRequestConfig extends ApiRequestConfig {
  headers?: Record<string, string>;
  query?: QueryParams;
  signal?: AbortSignal;
}

export class ApiClientError extends Error {
  status: number;
  code?: string;
  details?: unknown;

  constructor(message: string, status = 0, code?: string, details?: unknown) {
    super(message);
    this.name = 'ApiClientError';
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

type UnauthorizedHandler = () => void;
let unauthorizedHandler: UnauthorizedHandler | null = null;

export const setUnauthorizedHandler = (handler: UnauthorizedHandler | null): void => {
  unauthorizedHandler = handler;
};

const buildUrl = (path: string, query?: QueryParams): string => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const url = new URL(`${API_CONFIG.baseURL}${normalizedPath}`);

  if (!query) {
    return url.toString();
  }

  Object.entries(query).forEach(([key, value]) => {
    if (value === undefined || value === null) {
      return;
    }

    if (Array.isArray(value)) {
      value.forEach((item) => {
        if (item !== undefined && item !== null) {
          url.searchParams.append(key, String(item));
        }
      });
      return;
    }

    url.searchParams.append(key, String(value));
  });

  return url.toString();
};

const getToken = (): string | null => localStorage.getItem(STORAGE_KEYS.accessToken);

const shouldAttachAuth = (authMode?: ApiRequestConfig['authMode']): boolean =>
  authMode === AUTH_MODE.REQUIRED || authMode === AUTH_MODE.OPTIONAL;

const parseResponseBody = async (response: Response): Promise<unknown> => {
  if (response.status === 204) {
    return null;
  }

  const contentType = response.headers.get('content-type') ?? '';
  const isJson = contentType.includes('application/json');

  if (isJson) {
    return response.json();
  }

  const text = await response.text();
  return text.length > 0 ? text : null;
};

const extractStringField = (body: Record<string, unknown>, fields: string[]): string | undefined => {
  for (const field of fields) {
    const value = body[field];
    if (typeof value === 'string' && value.trim().length > 0) {
      return value;
    }
  }

  return undefined;
};

const extractArrayMessage = (body: Record<string, unknown>): string | undefined => {
  const candidates = body.errors;
  if (!Array.isArray(candidates) || candidates.length === 0) {
    return undefined;
  }

  const firstError = candidates[0];
  if (typeof firstError === 'string' && firstError.trim().length > 0) {
    return firstError;
  }

  if (firstError && typeof firstError === 'object') {
    return extractStringField(firstError as Record<string, unknown>, ['message', 'msg', 'detail']);
  }

  return undefined;
};

const parseErrorMessage = (status: number, body: unknown): string => {
  if (body && typeof body === 'object') {
    const normalized = body as Record<string, unknown>;
    const direct = extractStringField(normalized, ['message', 'error', 'detail', 'title']);
    if (direct) {
      return direct;
    }

    const nested = extractArrayMessage(normalized);
    if (nested) {
      return nested;
    }
  }

  if (status === 401) {
    return 'Unauthorized';
  }

  if (status >= 500) {
    return 'Server error. Please try again later.';
  }

  return 'Request failed';
};

const request = async <TResponse>(
  method: HttpMethod,
  path: string,
  body?: unknown,
  config: HttpRequestConfig = {},
): Promise<TResponse> => {
  const headers: Record<string, string> = {
    ...API_CONFIG.defaultHeaders,
    ...(config.headers ?? {}),
  };

  if (shouldAttachAuth(config.authMode)) {
    const token = getToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    } else if (config.authMode === AUTH_MODE.REQUIRED) {
      throw new ApiClientError('Missing authentication token', 401, 'TOKEN_MISSING');
    }
  }

  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), API_CONFIG.timeoutMs);

  try {
    const response = await fetch(buildUrl(path, config.query), {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
      credentials: API_CONFIG.withCredentials ? 'include' : 'omit',
      signal: config.signal ?? controller.signal,
    });

    const responseBody = await parseResponseBody(response);

    if (!response.ok) {
      const status = response.status;
      const code =
        responseBody && typeof responseBody === 'object'
          ? extractStringField(responseBody as Record<string, unknown>, ['code', 'errorCode', 'type'])
          : undefined;
      if (status === 401 && unauthorizedHandler) {
        unauthorizedHandler();
      }
      throw new ApiClientError(parseErrorMessage(status, responseBody), status, code, responseBody);
    }

    return responseBody as TResponse;
  } catch (error) {
    if (error instanceof ApiClientError) {
      throw error;
    }

    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new ApiClientError('Request timed out', 408, 'TIMEOUT');
    }

    throw new ApiClientError('Network error', 0, 'NETWORK_ERROR', error);
  } finally {
    window.clearTimeout(timeoutId);
  }
};

export const apiClient = {
  get: <TResponse>(path: string, config?: HttpRequestConfig) =>
    request<TResponse>('GET', path, undefined, config),
  post: <TResponse, TBody = unknown>(path: string, body?: TBody, config?: HttpRequestConfig) =>
    request<TResponse>('POST', path, body, config),
  put: <TResponse, TBody = unknown>(path: string, body?: TBody, config?: HttpRequestConfig) =>
    request<TResponse>('PUT', path, body, config),
  patch: <TResponse, TBody = unknown>(path: string, body?: TBody, config?: HttpRequestConfig) =>
    request<TResponse>('PATCH', path, body, config),
  delete: <TResponse>(path: string, config?: HttpRequestConfig) =>
    request<TResponse>('DELETE', path, undefined, config),
};
