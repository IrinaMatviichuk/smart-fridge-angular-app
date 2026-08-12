import { Product } from '../../../../entities/product/domain/product.model';
import { ProductStorage } from '../../../../entities/product/domain/product-storage.type';

export interface ProductFormDialogData {
  readonly product?: Product;
  readonly storage: ProductStorage;
}
