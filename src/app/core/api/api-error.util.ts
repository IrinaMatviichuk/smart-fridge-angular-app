import { HttpErrorResponse } from '@angular/common/http';

interface ResolveApiErrorMessageOptions {
  readonly defaultMessage: string;
  readonly connectionErrorMessage: string;
  readonly statusMessages?: Readonly<Partial<Record<number, string>>>;
}

const findFirstString = (value: unknown): string | null => {
  if (typeof value === 'string') {
    return value.trim() || null;
  }

  if (Array.isArray(value)) {
    return (
      value.map(findFirstString).find((message): message is string => message !== null) ?? null
    );
  }

  if (typeof value !== 'object' || value === null) {
    return null;
  }

  return (
    Object.values(value)
      .map(findFirstString)
      .find((message): message is string => message !== null) ?? null
  );
};

export const resolveApiErrorMessage = (
  error: unknown,
  options: ResolveApiErrorMessageOptions,
): string => {
  if (!(error instanceof HttpErrorResponse)) {
    return options.defaultMessage;
  }

  if (error.status === 0) {
    return options.connectionErrorMessage;
  }

  const backendMessage = findFirstString(error.error);

  if (backendMessage) {
    return backendMessage;
  }

  return options.statusMessages?.[error.status] ?? options.defaultMessage;
};
