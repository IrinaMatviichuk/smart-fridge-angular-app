import { ProductCardModel } from '../../../../shared/ui/product-card/product-card.model';
import { StatusChipTone } from '../../../../shared/ui/status-chip/status-chip.types';
import { ProductExpiryStatus } from '../../domain/product-expiry-status.type';
import { Product } from '../../domain/product.model';
import {
  calculateDaysUntilExpiry,
  calculateProductExpiryStatus,
} from '../../utils/product-expiry.util';

interface ProductStatusPresentation {
  readonly label: string;
  readonly tone: StatusChipTone;
}

const PRODUCT_STATUS_PRESENTATION: Readonly<
  Record<ProductExpiryStatus, ProductStatusPresentation>
> = {
  fresh: {
    label: 'Fresh',
    tone: 'success',
  },
  'expiring-soon': {
    label: 'Expiring Soon',
    tone: 'warning',
  },
  expired: {
    label: 'Expired',
    tone: 'error',
  },
};

const pluralizeDay = (days: number): string => (days === 1 ? 'day' : 'days');

const formatExpiryLabel = (expiryDate: string, now: Date): string => {
  const daysUntilExpiry = calculateDaysUntilExpiry(expiryDate, now);

  if (daysUntilExpiry === null) {
    return `Expiry date: ${expiryDate}`;
  }

  if (daysUntilExpiry < 0) {
    const expiredDays = Math.abs(daysUntilExpiry);

    return `Expired ${expiredDays} ${pluralizeDay(expiredDays)} ago`;
  }

  if (daysUntilExpiry === 0) {
    return 'Expires today';
  }

  return `Expires in ${daysUntilExpiry} ${pluralizeDay(daysUntilExpiry)}`;
};

export const mapProductToCardModel = (
  product: Product,
  now: Date = new Date(),
): ProductCardModel => {
  const status = calculateProductExpiryStatus(product.expiryDate, now);

  const presentation = PRODUCT_STATUS_PRESENTATION[status];

  return {
    id: product.id,
    title: product.name,
    quantity: product.quantity,
    expiryLabel: formatExpiryLabel(product.expiryDate, now),
    statusLabel: presentation.label,
    statusTone: presentation.tone,
  };
};

export const mapProductsToCardModels = (
  products: readonly Product[],
  now: Date = new Date(),
): readonly ProductCardModel[] => products.map((product) => mapProductToCardModel(product, now));
