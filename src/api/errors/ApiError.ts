import { ApiClientError } from '../client';

export type ApiFieldErrors = Record<string, string[]>;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const toStringArray = (value: unknown): string[] => {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter((item): item is string => typeof item === 'string')
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
};

const extractFieldErrors = (details: unknown): ApiFieldErrors | undefined => {
  if (!isRecord(details) || !isRecord(details.errors)) {
    return undefined;
  }

  const mapped = Object.entries(details.errors).reduce<ApiFieldErrors>((acc, [field, value]) => {
    const errors = toStringArray(value);
    if (errors.length > 0) {
      acc[field] = errors;
    }
    return acc;
  }, {});

  return Object.keys(mapped).length > 0 ? mapped : undefined;
};

const extractMessage = (error: unknown): string => {
  if (error instanceof ApiClientError) {
    return error.message;
  }

  if (error instanceof Error && error.message.trim().length > 0) {
    return error.message;
  }

  if (isRecord(error) && typeof error.message === 'string' && error.message.trim().length > 0) {
    return error.message;
  }

  return 'Request failed';
};

export class ApiError extends Error {
  readonly status?: number;
  readonly code?: string;
  readonly fieldErrors?: ApiFieldErrors;
  readonly raw?: unknown;

  constructor(message: string, options?: { status?: number; code?: string; fieldErrors?: ApiFieldErrors; raw?: unknown }) {
    super(message);
    this.name = 'ApiError';
    this.status = options?.status;
    this.code = options?.code;
    this.fieldErrors = options?.fieldErrors;
    this.raw = options?.raw;
  }
}

export const toApiError = (error: unknown): ApiError => {
  if (error instanceof ApiError) {
    return error;
  }

  if (error instanceof ApiClientError) {
    return new ApiError(extractMessage(error), {
      status: error.status,
      code: error.code,
      fieldErrors: extractFieldErrors(error.details),
      raw: error.details,
    });
  }

  return new ApiError(extractMessage(error), { raw: error });
};
