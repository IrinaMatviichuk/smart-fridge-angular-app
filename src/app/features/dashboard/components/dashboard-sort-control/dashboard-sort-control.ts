import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

import { Select } from '../../../../shared/ui/select/select';
import { ProductSort } from '../../domain/product-sort.type';
import { DashboardSortControlModel } from './dashboard-sort-control.model';

@Component({
  selector: 'app-dashboard-sort-control',
  imports: [Select],
  templateUrl: './dashboard-sort-control.html',
  styleUrl: './dashboard-sort-control.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardSortControl {
  readonly model = input.required<DashboardSortControlModel>();

  readonly valueChanged = output<ProductSort>();

  protected handleValueChange(value: ProductSort | null): void {
    if (value === null) {
      return;
    }

    this.valueChanged.emit(value);
  }
}
