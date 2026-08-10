import { SelectOption } from '../../../../shared/ui/select/select-option.interface';
import { ProductCategoryFilter } from '../../domain/product-category-filter.type';

export interface DashboardCategoryFilterModel {
  readonly value: ProductCategoryFilter;

  readonly options: readonly SelectOption<ProductCategoryFilter>[];
}
