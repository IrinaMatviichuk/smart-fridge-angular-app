import { ProductStatusFilter } from '../../domain/product-status-filter.type';
import { DASHBOARD_STATUS_OPTIONS } from './dashboard-status-filter.config';
import { DashboardStatusFilterModel } from './dashboard-status-filter.model';

export const mapDashboardStatusFilterModel = (
  value: ProductStatusFilter,
): DashboardStatusFilterModel => ({
  value,
  options: DASHBOARD_STATUS_OPTIONS,
});
