import { ProductCategoryFilter } from '../../domain/product-category-filter.type';
import { DASHBOARD_CATEGORY_OPTIONS } from './dashboard-category-filter.config';
import { DashboardCategoryFilterModel } from './dashboard-category-filter.model';

export const mapDashboardCategoryFilterModel = (
  value: ProductCategoryFilter,
): DashboardCategoryFilterModel => ({
  value,
  options: DASHBOARD_CATEGORY_OPTIONS,
});
