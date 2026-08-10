import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

import { ProductCategoryFilter } from '../../domain/product-category-filter.type';
import { ProductSort } from '../../domain/product-sort.type';
import { ProductStatusFilter } from '../../domain/product-status-filter.type';
import { DashboardCategoryFilter } from '../dashboard-category-filter/dashboard-category-filter';
import { DashboardSortControl } from '../dashboard-sort-control/dashboard-sort-control';
import { DashboardStatusFilter } from '../dashboard-status-filter/dashboard-status-filter';
import { DashboardProductControlsModel } from './dashboard-product-controls.model';

@Component({
  selector: 'app-dashboard-product-controls',
  imports: [DashboardStatusFilter, DashboardCategoryFilter, DashboardSortControl],
  templateUrl: './dashboard-product-controls.html',
  styleUrl: './dashboard-product-controls.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardProductControls {
  readonly model = input.required<DashboardProductControlsModel>();

  readonly statusChanged = output<ProductStatusFilter>();

  readonly categoryChanged = output<ProductCategoryFilter>();

  readonly sortChanged = output<ProductSort>();
}
