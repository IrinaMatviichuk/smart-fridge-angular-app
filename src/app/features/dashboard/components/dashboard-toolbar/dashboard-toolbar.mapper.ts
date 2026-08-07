import { ProductStorage } from '../../domain/product-storage.type';
import { DASHBOARD_ADD_PRODUCT_CONFIG, DASHBOARD_STORAGE_TABS } from './dashboard-toolbar.config';
import { DashboardToolbarModel } from './dashboard-toolbar.model';

export const mapDashboardToolbarModel = (storage: ProductStorage): DashboardToolbarModel => ({
  storage,

  storageTabs: DASHBOARD_STORAGE_TABS,

  addProductIcon: DASHBOARD_ADD_PRODUCT_CONFIG.icon,

  addProductLabel: DASHBOARD_ADD_PRODUCT_CONFIG.label,
});
