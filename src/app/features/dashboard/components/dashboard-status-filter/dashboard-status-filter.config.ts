import { SelectOption } from '../../../../shared/ui/select/select-option.interface';
import { ProductStatusFilter } from '../../domain/product-status-filter.type';

export const DASHBOARD_STATUS_OPTIONS: readonly SelectOption<ProductStatusFilter>[] = [
  {
    value: 'all',
    label: 'All statuses',
  },
  {
    value: 'fresh',
    label: 'Fresh',
  },
  {
    value: 'expiring-soon',
    label: 'Expiring soon',
  },
  {
    value: 'expired',
    label: 'Expired',
  },
];
