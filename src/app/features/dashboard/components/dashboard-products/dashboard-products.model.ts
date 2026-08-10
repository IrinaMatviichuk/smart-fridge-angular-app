import { DashboardProductItemModel } from './dashboard-product-item.model';

export interface DashboardProductsModel {
  readonly products: readonly DashboardProductItemModel[];

  readonly loading: boolean;
}
