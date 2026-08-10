import { ActionMenuItem } from '../../../../shared/ui/action-menu/action-menu-item.model';
import { PRODUCT_ACTION, ProductAction } from './product-actions.types';

export const PRODUCT_ACTIONS: readonly ActionMenuItem<ProductAction>[] = [
  {
    id: PRODUCT_ACTION.edit,
    label: 'Edit',
  },
  {
    id: PRODUCT_ACTION.delete,
    label: 'Delete',
    tone: 'danger',
  },
];
