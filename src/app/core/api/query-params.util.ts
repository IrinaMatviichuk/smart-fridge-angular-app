import { HttpParams } from '@angular/common/http';

import { ApiQueryParamPrimitive, ApiQueryParams } from './api-query-params.type';

const serializeQueryParam = (value: ApiQueryParamPrimitive): string =>
  value instanceof Date ? value.toISOString() : String(value);

export const toHttpParams = (params?: ApiQueryParams): HttpParams | undefined => {
  if (!params) {
    return undefined;
  }

  return Object.entries(params).reduce((httpParams, [key, value]) => {
    if (value === null || value === undefined) {
      return httpParams;
    }

    if (Array.isArray(value)) {
      return value.reduce(
        (result, item) => result.append(key, serializeQueryParam(item)),
        httpParams,
      );
    }

    return httpParams.set(key, serializeQueryParam(value as ApiQueryParamPrimitive));
  }, new HttpParams());
};
