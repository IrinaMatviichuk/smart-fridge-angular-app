export const PRODUCT_CATEGORIES = ['dairy', 'meat', 'veggies', 'other'] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];
