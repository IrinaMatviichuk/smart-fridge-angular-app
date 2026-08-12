import { ProductCategory } from './product-category.type';
import { ProductStorage } from './product-storage.type';

export interface ProductQuery {
  readonly storage?: ProductStorage;
  readonly category?: ProductCategory;
  readonly ordering?: string;
}
