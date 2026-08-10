import { SelectOption } from '../../../../shared/ui/select/select-option.interface';
import { PRODUCT_CATEGORY_OPTIONS } from '../../config/product-category-options.config';
import { ProductCategoryFilter } from '../../domain/product-category-filter.type';

export const DASHBOARD_CATEGORY_OPTIONS: readonly SelectOption<ProductCategoryFilter>[] = [
  {
    value: 'all',
    label: 'All categories',
  },
  ...PRODUCT_CATEGORY_OPTIONS,
];
