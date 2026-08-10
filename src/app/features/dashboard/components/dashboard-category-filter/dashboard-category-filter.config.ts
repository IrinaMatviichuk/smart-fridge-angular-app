import { SelectOption } from '../../../../shared/ui/select/select-option.interface';
import { ProductCategoryFilter } from '../../domain/product-category-filter.type';

export const DASHBOARD_CATEGORY_OPTIONS: readonly SelectOption<ProductCategoryFilter>[] = [
  {
    value: 'all',
    label: 'All categories',
  },
  {
    value: 'dairy',
    label: 'Dairy',
  },
  {
    value: 'meat',
    label: 'Meat',
  },
  {
    value: 'veggies',
    label: 'Veggies',
  },
  {
    value: 'other',
    label: 'Other',
  },
];
