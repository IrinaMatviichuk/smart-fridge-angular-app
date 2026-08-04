import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { environment } from '../../../../../environments/environment';
import { AuthTokenStorage } from '../storage/auth-token.storage';

const AUTHORIZATION_HEADER = 'Authorization';
const BEARER_PREFIX = 'Bearer';

const isBackendRequest = (url: string): boolean => {
  const normalizedApiUrl = environment.apiUrl.replace(/\/+$/, '');

  return url.startsWith(normalizedApiUrl);
};

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const tokenStorage = inject(AuthTokenStorage);
  const accessToken = tokenStorage.readAccessToken();

  if (!accessToken || !isBackendRequest(request.url) || request.headers.has(AUTHORIZATION_HEADER)) {
    return next(request);
  }

  return next(
    request.clone({
      setHeaders: {
        [AUTHORIZATION_HEADER]: `${BEARER_PREFIX} ${accessToken}`,
      },
    }),
  );
};
