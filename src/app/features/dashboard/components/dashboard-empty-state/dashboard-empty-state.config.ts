import { EmptyStateModel } from '../../../../shared/ui/empty-state/empty-state.model';
import { ProductStorage } from '../../../../entities/product/domain/product-storage.type';

export const DASHBOARD_STORAGE_EMPTY_STATES: Readonly<Record<ProductStorage, EmptyStateModel>> = {
  fridge: {
    imageUrl: '/images/empty-states/empty_fridge.png',
    imageAlt: 'Empty fridge',
    title: 'Your fridge list is empty',
    description: 'Add products to start managing your inventory',
    actionLabel: 'Add product',
  },

  freezer: {
    imageUrl: '/images/empty-states/empty_freezer.png',
    imageAlt: 'Empty freezer',
    title: 'Your freezer list is empty',
    description: 'Add products to start managing your inventory',
    actionLabel: 'Add product',
  },
};

export const DASHBOARD_FILTER_EMPTY_STATE: EmptyStateModel = {
  imageUrl: '/images/empty-states/empty_fridge.png',
  imageAlt: 'No products found',
  title: 'No products found',
  description: 'Try changing your search or filters',
};
