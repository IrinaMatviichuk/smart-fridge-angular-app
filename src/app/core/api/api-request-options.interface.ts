import { HttpContext, HttpHeaders } from '@angular/common/http';

import { ApiQueryParams } from './api-query-params.type';

export interface ApiRequestOptions {
  readonly params?: ApiQueryParams;
  readonly context?: HttpContext;
  readonly headers?: HttpHeaders;
}
