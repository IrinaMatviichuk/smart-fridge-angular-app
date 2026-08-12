import { ProductCategory } from '../domain/product-category.type';
import { ProductStorage } from '../domain/product-storage.type';

export interface CreateProductRequestDto {
  readonly name: string;
  readonly category: ProductCategory;
  readonly storage: ProductStorage;
  readonly quantity: string;
  readonly expiry_date: string;
}

export type UpdateProductRequestDto = CreateProductRequestDto;

export type PatchProductRequestDto = Partial<CreateProductRequestDto>;
