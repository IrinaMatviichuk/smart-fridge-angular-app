import { SelectOption } from '../../../../shared/ui/select/select-option.interface';
import { PRODUCT_SORT, ProductSort } from '../../domain/product-sort.type';

export const DASHBOARD_SORT_OPTIONS: readonly SelectOption<ProductSort>[] = [
  {
    value: PRODUCT_SORT.expiryDateAsc,
    label: 'Expiry: soonest first',
  },
  {
    value: PRODUCT_SORT.expiryDateDesc,
    label: 'Expiry: latest first',
  },
  {
    value: PRODUCT_SORT.createdDateDesc,
    label: 'Created: newest first',
  },
  {
    value: PRODUCT_SORT.createdDateAsc,
    label: 'Created: oldest first',
  },
];
