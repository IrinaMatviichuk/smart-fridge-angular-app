import { SelectOption } from '../../../../shared/ui/select/select-option.interface';
import { ProductSort } from '../../domain/product-sort.type';

export interface DashboardSortControlModel {
  readonly value: ProductSort;

  readonly options: readonly SelectOption<ProductSort>[];
}
