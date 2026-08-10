import { Product } from '../../domain/product.model';
import { ProductStorage } from '../../domain/product-storage.type';

export interface ProductFormDialogData {
  readonly product?: Product;
  readonly storage: ProductStorage;
}
