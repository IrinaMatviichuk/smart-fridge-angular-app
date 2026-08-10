export const PRODUCT_ACTION = {
  edit: 'edit',
  delete: 'delete',
} as const;

export type ProductAction = (typeof PRODUCT_ACTION)[keyof typeof PRODUCT_ACTION];
