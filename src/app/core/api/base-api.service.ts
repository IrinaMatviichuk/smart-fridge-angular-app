import { HttpClient, HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject } from '@angular/core';
import { map, Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { ApiRequestOptions } from './api-request-options.interface';
import { toHttpParams } from './query-params.util';

type NullableDto<T> = T | null;
type NullableDtoList<T> = readonly T[] | null;

interface HttpRequestOptions {
  readonly params?: HttpParams;
  readonly context?: HttpContext;
  readonly headers?: HttpHeaders;
}

export abstract class BaseApiService {
  protected readonly http = inject(HttpClient);

  private readonly apiUrl = environment.apiUrl;

  protected get<TResponse>(path: string, options: ApiRequestOptions = {}): Observable<TResponse> {
    return this.http.get<TResponse>(this.buildUrl(path), this.createRequestOptions(options));
  }

  protected getMapped<TDto, TModel>(
    path: string,
    mapper: (dto: TDto) => TModel,
    options: ApiRequestOptions = {},
  ): Observable<TModel | null> {
    return this.http
      .get<NullableDto<TDto>>(this.buildUrl(path), this.createRequestOptions(options))
      .pipe(map((dto) => (dto === null ? null : mapper(dto))));
  }

  protected getMappedRequired<TDto, TModel>(
    path: string,
    mapper: (dto: TDto) => TModel,
    options: ApiRequestOptions = {},
  ): Observable<TModel> {
    return this.http
      .get<TDto>(this.buildUrl(path), this.createRequestOptions(options))
      .pipe(map(mapper));
  }

  protected getMappedList<TDto, TModel>(
    path: string,
    mapper: (dto: TDto) => TModel,
    options: ApiRequestOptions = {},
  ): Observable<TModel[]> {
    return this.http
      .get<NullableDtoList<TDto>>(this.buildUrl(path), this.createRequestOptions(options))
      .pipe(map((items) => (items ?? []).map(mapper)));
  }

  protected post<TRequest, TResponse>(
    path: string,
    body: TRequest,
    options: ApiRequestOptions = {},
  ): Observable<TResponse> {
    return this.http.post<TResponse>(this.buildUrl(path), body, this.createRequestOptions(options));
  }

  protected postMapped<TRequest, TDto, TModel>(
    path: string,
    body: TRequest,
    mapper: (dto: TDto) => TModel,
    options: ApiRequestOptions = {},
  ): Observable<TModel> {
    return this.http
      .post<TDto>(this.buildUrl(path), body, this.createRequestOptions(options))
      .pipe(map(mapper));
  }

  protected put<TRequest, TResponse>(
    path: string,
    body: TRequest,
    options: ApiRequestOptions = {},
  ): Observable<TResponse> {
    return this.http.put<TResponse>(this.buildUrl(path), body, this.createRequestOptions(options));
  }

  protected putMapped<TRequest, TDto, TModel>(
    path: string,
    body: TRequest,
    mapper: (dto: TDto) => TModel,
    options: ApiRequestOptions = {},
  ): Observable<TModel> {
    return this.http
      .put<TDto>(this.buildUrl(path), body, this.createRequestOptions(options))
      .pipe(map(mapper));
  }

  protected patch<TRequest, TResponse>(
    path: string,
    body: TRequest,
    options: ApiRequestOptions = {},
  ): Observable<TResponse> {
    return this.http.patch<TResponse>(
      this.buildUrl(path),
      body,
      this.createRequestOptions(options),
    );
  }

  protected patchMapped<TRequest, TDto, TModel>(
    path: string,
    body: TRequest,
    mapper: (dto: TDto) => TModel,
    options: ApiRequestOptions = {},
  ): Observable<TModel> {
    return this.http
      .patch<TDto>(this.buildUrl(path), body, this.createRequestOptions(options))
      .pipe(map(mapper));
  }

  protected delete<TResponse>(
    path: string,
    options: ApiRequestOptions = {},
  ): Observable<TResponse> {
    return this.http.delete<TResponse>(this.buildUrl(path), this.createRequestOptions(options));
  }

  private buildUrl(path: string): string {
    if (/^https?:\/\//i.test(path)) {
      return path;
    }

    const normalizedApiUrl = this.apiUrl.replace(/\/+$/, '');

    const normalizedPath = path.replace(/^\/+/, '');

    return `${normalizedApiUrl}/${normalizedPath}`;
  }

  private createRequestOptions(options: ApiRequestOptions): HttpRequestOptions {
    return {
      params: toHttpParams(options.params),
      context: options.context,
      headers: options.headers,
    };
  }
}
