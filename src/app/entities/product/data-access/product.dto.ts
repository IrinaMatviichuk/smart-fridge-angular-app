import { ProductCategory } from '../domain/product-category.type';
import { ProductStorage } from '../domain/product-storage.type';

export interface ProductDto {
  readonly id: number;

  readonly name: string;

  readonly category: ProductCategory;
  readonly category_display: string;

  readonly storage: ProductStorage;
  readonly storage_display: string;

  readonly quantity: string;

  readonly expiry_date: string;

  readonly created_at: string;
}
