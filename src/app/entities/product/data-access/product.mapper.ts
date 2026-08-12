import { Product } from '../domain/product.model';
import { ProductStatus } from '../domain/product-status.type';
import { ProductDto } from './product.dto';

const MS_PER_DAY = 24 * 60 * 60 * 1000;

const getStartOfDay = (date: Date): number =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();

const calculateDaysUntilExpiry = (expiryDate: string): number => {
  const today = getStartOfDay(new Date());

  const expiry = getStartOfDay(new Date(`${expiryDate}T00:00:00`));

  return Math.round((expiry - today) / MS_PER_DAY);
};

const resolveProductStatus = (daysUntilExpiry: number): ProductStatus => {
  if (daysUntilExpiry < 0) {
    return 'expired';
  }

  if (daysUntilExpiry <= 3) {
    return 'expiring-soon';
  }

  return 'fresh';
};

export const mapProductDto = (dto: ProductDto): Product => {
  const daysUntilExpiry = calculateDaysUntilExpiry(dto.expiry_date);

  return {
    id: dto.id,

    name: dto.name,

    category: dto.category,
    categoryDisplay: dto.category_display,

    storage: dto.storage,
    storageDisplay: dto.storage_display,

    quantity: dto.quantity,

    expiryDate: dto.expiry_date,

    createdAt: dto.created_at,

    daysUntilExpiry,

    status: resolveProductStatus(daysUntilExpiry),
  };
};
