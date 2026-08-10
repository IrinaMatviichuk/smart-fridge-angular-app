import { Product } from '../../domain/product.model';
import { DashboardProductsModel } from './dashboard-products.model';
import { mapProductToCardModel } from './product-card.mapper';

export const mapDashboardProductsModel = (
  products: readonly Product[],
  loading: boolean,
): DashboardProductsModel => ({
  products: products.map((product) => ({
    product,
    card: mapProductToCardModel(product),
  })),
  loading,
});
