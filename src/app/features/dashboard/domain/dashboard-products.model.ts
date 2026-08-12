import { Product } from '../../../entities/product/domain/product.model';

export interface DashboardProductsModel {
  readonly loading: boolean;

  readonly hasActiveFilters: boolean;

  readonly products: readonly Product[];
}
