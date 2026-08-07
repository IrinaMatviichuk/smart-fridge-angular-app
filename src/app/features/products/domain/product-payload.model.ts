import { ProductCategory } from './product-category.type';
import { ProductStorage } from './product-storage.type';

export interface ProductPayload {
  readonly name: string;
  readonly category: ProductCategory;
  readonly storage: ProductStorage;
  readonly quantity: string;
  readonly expiryDate: string;
}
