export const PRODUCT_STORAGES = ['fridge', 'freezer'] as const;

export type ProductStorage = (typeof PRODUCT_STORAGES)[number];
