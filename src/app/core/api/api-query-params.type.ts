export type ApiQueryParamPrimitive = string | number | boolean | Date;

export type ApiQueryParamValue =
  ApiQueryParamPrimitive | readonly ApiQueryParamPrimitive[] | null | undefined;

export type ApiQueryParams = Readonly<Record<string, ApiQueryParamValue>>;
