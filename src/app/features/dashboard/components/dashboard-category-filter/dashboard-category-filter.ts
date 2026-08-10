import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

import { Select } from '../../../../shared/ui/select/select';
import { ProductCategoryFilter } from '../../domain/product-category-filter.type';
import { DashboardCategoryFilterModel } from './dashboard-category-filter.model';

@Component({
  selector: 'app-dashboard-category-filter',
  imports: [Select],
  templateUrl: './dashboard-category-filter.html',
  styleUrl: './dashboard-category-filter.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardCategoryFilter {
  readonly model = input.required<DashboardCategoryFilterModel>();

  readonly valueChanged = output<ProductCategoryFilter>();

  protected handleValueChange(value: ProductCategoryFilter | null): void {
    if (value === null) {
      return;
    }

    this.valueChanged.emit(value);
  }
}
