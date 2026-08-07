import { ProductCardModel } from '../../../../shared/ui/product-card/product-card.model';

export interface DashboardProductsModel {
  readonly products: readonly ProductCardModel[];

  readonly loading: boolean;
}
