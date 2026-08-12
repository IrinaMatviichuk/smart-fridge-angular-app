import { Product } from '../../../entities/product/domain/product.model';
import { PRODUCT_SORT, ProductSort } from './product-sort.type';

export const sortProducts = (
  products: readonly Product[],
  sort: ProductSort,
): readonly Product[] => {
  const sortedProducts = [...products];

  switch (sort) {
    case PRODUCT_SORT.expiryDateAsc:
      return sortedProducts.sort((a, b) => a.expiryDate.localeCompare(b.expiryDate));

    case PRODUCT_SORT.expiryDateDesc:
      return sortedProducts.sort((a, b) => b.expiryDate.localeCompare(a.expiryDate));

    case PRODUCT_SORT.createdDateDesc:
      return sortedProducts.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));

    case PRODUCT_SORT.createdDateAsc:
      return sortedProducts.sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt));
  }
};
