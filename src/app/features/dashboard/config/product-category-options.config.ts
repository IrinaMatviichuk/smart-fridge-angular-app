import { SelectOption } from '../../../shared/ui/select/select-option.interface';
import { ProductCategory } from '../domain/product-category.type';

export const PRODUCT_CATEGORY_OPTIONS: readonly SelectOption<ProductCategory>[] = [
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
