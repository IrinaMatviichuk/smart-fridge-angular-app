import { ProductCardModel } from '../../../../shared/ui/product-card/product-card.model';
import { Product } from '../../domain/product.model';

export interface DashboardProductItemModel {
  readonly product: Product;
  readonly card: ProductCardModel;
}
