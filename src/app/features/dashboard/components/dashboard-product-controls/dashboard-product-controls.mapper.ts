import { ProductCategoryFilter } from '../../domain/product-category-filter.type';
import { ProductSort } from '../../domain/product-sort.type';
import { ProductStatusFilter } from '../../domain/product-status-filter.type';
import { mapDashboardCategoryFilterModel } from '../dashboard-category-filter/dashboard-category-filter.mapper';
import { mapDashboardSortControlModel } from '../dashboard-sort-control/dashboard-sort-control.mapper';
import { mapDashboardStatusFilterModel } from '../dashboard-status-filter/dashboard-status-filter.mapper';
import { DashboardProductControlsModel } from './dashboard-product-controls.model';

export const mapDashboardProductControlsModel = (
  status: ProductStatusFilter,
  category: ProductCategoryFilter,
  sort: ProductSort,
): DashboardProductControlsModel => ({
  status: mapDashboardStatusFilterModel(status),

  category: mapDashboardCategoryFilterModel(category),

  sort: mapDashboardSortControlModel(sort),
});
