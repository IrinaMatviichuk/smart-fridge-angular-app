import { ProductSort } from '../../domain/product-sort.type';
import { DASHBOARD_SORT_OPTIONS } from './dashboard-sort-control.config';
import { DashboardSortControlModel } from './dashboard-sort-control.model';

export const mapDashboardSortControlModel = (value: ProductSort): DashboardSortControlModel => ({
  value,
  options: DASHBOARD_SORT_OPTIONS,
});
