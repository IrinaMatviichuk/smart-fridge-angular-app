import { IconName } from '../../../../core/icons/icon-name';
import { TabsItem } from '../../../../shared/ui/tabs/tabs-item.interface';
import { ProductStorage } from '../../domain/product-storage.type';

export const DASHBOARD_STORAGE_TABS: readonly TabsItem<ProductStorage>[] = [
  {
    value: 'fridge',
    label: 'Fridge',
    icon: IconName.Fridge,
  },
  {
    value: 'freezer',
    label: 'Freezer',
    icon: IconName.Freezer,
  },
];

export const DASHBOARD_ADD_PRODUCT_CONFIG = {
  icon: IconName.Add,
  label: 'Add product',
} as const;
