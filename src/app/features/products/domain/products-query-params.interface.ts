import { ProductCategory } from './product-category.type';
import { ProductStorage } from './product-storage.type';

export interface ProductsQueryParams {
  readonly category?: ProductCategory;
  readonly storage?: ProductStorage;
  readonly ordering?: string;
}
