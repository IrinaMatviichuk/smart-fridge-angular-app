import { Product } from './product.model';

export interface DashboardProductsModel {
  readonly loading: boolean;

  readonly hasActiveFilters: boolean;

  readonly products: readonly Product[];
}
