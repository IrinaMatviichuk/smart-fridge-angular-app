import { ProductCardModel } from '../../../shared/ui/product-card/product-card.model';
import { StatusChipTone } from '../../../shared/ui/status-chip/status-chip.types';
import { Product } from '../domain/product.model';
import { ProductStatus } from '../domain/product-status.type';

const STATUS_TONE_MAP: Readonly<Record<ProductStatus, StatusChipTone>> = {
  fresh: 'success',
  'expiring-soon': 'warning',
  expired: 'error',
};

const STATUS_LABEL_MAP: Readonly<Record<ProductStatus, string>> = {
  fresh: 'Fresh',
  'expiring-soon': 'Expiring soon',
  expired: 'Expired',
};

const resolveExpiryLabel = (product: Product): string => {
  if (product.daysUntilExpiry < 0) {
    const daysExpired = Math.abs(product.daysUntilExpiry);

    return daysExpired === 1 ? 'Expired 1 day ago' : `Expired ${daysExpired} days ago`;
  }

  if (product.daysUntilExpiry === 0) {
    return 'Expires today';
  }

  if (product.daysUntilExpiry === 1) {
    return 'Expires in 1 day';
  }

  return `Expires in ${product.daysUntilExpiry} days`;
};

export const mapProductToCardModel = (product: Product): ProductCardModel => ({
  id: product.id,
  title: product.name,
  quantity: product.quantity,
  expiryLabel: resolveExpiryLabel(product),
  statusLabel: STATUS_LABEL_MAP[product.status],
  statusTone: STATUS_TONE_MAP[product.status],
});
