import { ApiQueryParams } from '../../../../core/api';
import { ProductQuery } from '../../domain/product-query.model';

export const mapProductQueryToParams = (query: ProductQuery): ApiQueryParams => ({
  storage: query.storage,
  category: query.category,
  ordering: query.ordering,
});
