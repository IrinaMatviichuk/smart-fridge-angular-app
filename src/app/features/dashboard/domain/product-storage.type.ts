export const PRODUCT_STORAGES = ['fridge', 'freezer'] as const;

export type ProductStorage = (typeof PRODUCT_STORAGES)[number];

export const isProductStorage = (value: string | null): value is ProductStorage =>
  value !== null && PRODUCT_STORAGES.includes(value as ProductStorage);
