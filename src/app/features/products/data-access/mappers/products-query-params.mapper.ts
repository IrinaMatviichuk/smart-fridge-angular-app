import { ApiQueryParams } from '../../../../core/api';
import { ProductsQueryParams } from '../../domain/products-query-params.interface';

export const mapProductsQueryParamsToApiParams = (query: ProductsQueryParams): ApiQueryParams => ({
  ...(query.category !== undefined && {
    category: query.category,
  }),
  ...(query.storage !== undefined && {
    storage: query.storage,
  }),
  ...(query.ordering !== undefined && {
    ordering: query.ordering,
  }),
});
