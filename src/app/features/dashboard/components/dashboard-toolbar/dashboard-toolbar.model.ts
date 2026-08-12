import { IconName } from '../../../../core/icons/icon-name';
import { TabsItem } from '../../../../shared/ui/tabs/tabs-item.interface';
import { ProductStorage } from '../../../../entities/product/domain/product-storage.type';

export interface DashboardToolbarModel {
  readonly storage: ProductStorage;

  readonly storageTabs: readonly TabsItem<ProductStorage>[];

  readonly addProductIcon: IconName;
  readonly addProductLabel: string;
}
