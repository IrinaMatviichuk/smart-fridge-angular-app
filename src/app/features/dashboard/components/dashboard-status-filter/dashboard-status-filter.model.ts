import { SelectOption } from '../../../../shared/ui/select/select-option.interface';
import { ProductStatusFilter } from '../../domain/product-status-filter.type';

export interface DashboardStatusFilterModel {
  readonly value: ProductStatusFilter;

  readonly options: readonly SelectOption<ProductStatusFilter>[];
}
