import { EmptyStateModel } from '../../../../shared/ui/empty-state/empty-state.model';
import { ProductStorage } from '../../../../entities/product/domain/product-storage.type';
import {
  DASHBOARD_FILTER_EMPTY_STATE,
  DASHBOARD_STORAGE_EMPTY_STATES,
} from './dashboard-empty-state.config';

export const mapStorageEmptyState = (storage: ProductStorage): EmptyStateModel =>
  DASHBOARD_STORAGE_EMPTY_STATES[storage];

export const mapFilterEmptyState = (storage: ProductStorage): EmptyStateModel => ({
  ...DASHBOARD_FILTER_EMPTY_STATE,

  imageUrl: DASHBOARD_STORAGE_EMPTY_STATES[storage].imageUrl,
});
