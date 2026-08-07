import { ProductCategory } from '../../domain/product-category.type';
import { ProductStorage } from '../../domain/product-storage.type';

export interface PatchProductRequestDto {
  readonly name?: string;
  readonly category?: ProductCategory;
  readonly storage?: ProductStorage;
  readonly quantity?: string;
  readonly expiry_date?: string;
}
