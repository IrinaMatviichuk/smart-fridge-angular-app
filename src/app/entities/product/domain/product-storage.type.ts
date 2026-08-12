export const PRODUCT_STORAGE = {
  fridge: 'fridge',
  freezer: 'freezer',
} as const;

export type ProductStorage = (typeof PRODUCT_STORAGE)[keyof typeof PRODUCT_STORAGE];

export const isProductStorage = (value: unknown): value is ProductStorage => {
  return (
    typeof value === 'string' && Object.values(PRODUCT_STORAGE).includes(value as ProductStorage)
  );
};
