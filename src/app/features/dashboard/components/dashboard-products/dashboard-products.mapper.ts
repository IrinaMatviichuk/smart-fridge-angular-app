import { Product } from '../../domain/product.model';
import { mapProductToCardModel } from './product-card.mapper';
import { DashboardProductsModel } from './dashboard-products.model';

export const mapDashboardProductsModel = (
  products: readonly Product[],
  loading: boolean,
): DashboardProductsModel => ({
  products: products.map(mapProductToCardModel),

  loading,
});
