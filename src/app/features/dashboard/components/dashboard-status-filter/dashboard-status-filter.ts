import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

import { Select } from '../../../../shared/ui/select/select';
import { ProductStatusFilter } from '../../domain/product-status-filter.type';
import { DashboardStatusFilterModel } from './dashboard-status-filter.model';

@Component({
  selector: 'app-dashboard-status-filter',
  imports: [Select],
  templateUrl: './dashboard-status-filter.html',
  styleUrl: './dashboard-status-filter.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardStatusFilter {
  readonly model = input.required<DashboardStatusFilterModel>();

  readonly valueChanged = output<ProductStatusFilter>();

  protected handleValueChange(value: ProductStatusFilter | null): void {
    if (value === null) {
      return;
    }

    this.valueChanged.emit(value);
  }
}
