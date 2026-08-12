import { ConfirmationDialogData } from '../../../../shared/ui/confirmation-dialog/confirmation-dialog-data.model';
import { Product } from '../../../../entities/product/domain/product.model';
import { PRODUCT_DELETE_CONFIRMATION_TEXT } from './product-delete-confirmation.constants';

export const mapProductDeleteConfirmationData = (product: Product): ConfirmationDialogData => ({
  title: PRODUCT_DELETE_CONFIRMATION_TEXT.title,

  message: `Are you sure you want to delete "${product.name}"? This action cannot be undone.`,

  confirmLabel: PRODUCT_DELETE_CONFIRMATION_TEXT.confirmLabel,

  cancelLabel: PRODUCT_DELETE_CONFIRMATION_TEXT.cancelLabel,

  variant: 'danger',
});
