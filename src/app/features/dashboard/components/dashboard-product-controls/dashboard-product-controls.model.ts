import { DashboardCategoryFilterModel } from '../dashboard-category-filter/dashboard-category-filter.model';
import { DashboardSortControlModel } from '../dashboard-sort-control/dashboard-sort-control.model';
import { DashboardStatusFilterModel } from '../dashboard-status-filter/dashboard-status-filter.model';

export interface DashboardProductControlsModel {
  readonly status: DashboardStatusFilterModel;

  readonly category: DashboardCategoryFilterModel;

  readonly sort: DashboardSortControlModel;
}
