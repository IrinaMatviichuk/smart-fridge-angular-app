import { ProductCategory } from './product-category.type';
import { ProductStorage } from './product-storage.type';

export interface Product {
  readonly id: number;
  readonly name: string;
  readonly category: ProductCategory;
  readonly categoryDisplay: string;
  readonly storage: ProductStorage;
  readonly storageDisplay: string;
  readonly quantity: string;
  readonly expiryDate: string;
  readonly createdAt: string;
}
