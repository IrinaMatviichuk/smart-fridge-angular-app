import { ProductCategory } from '../../../entities/product/domain/product-category.type';
import { ProductStorage } from '../../../entities/product/domain/product-storage.type';

export interface ProductWriteModel {
  readonly name: string;
  readonly category: ProductCategory;
  readonly storage: ProductStorage;
  readonly quantity: string;
  readonly expiryDate: string;
}
