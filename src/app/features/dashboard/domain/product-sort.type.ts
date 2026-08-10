export const PRODUCT_SORT = {
  expiryDateAsc: 'expiry-date-asc',
  expiryDateDesc: 'expiry-date-desc',
  createdDateDesc: 'created-date-desc',
  createdDateAsc: 'created-date-asc',
} as const;

export type ProductSort = (typeof PRODUCT_SORT)[keyof typeof PRODUCT_SORT];
