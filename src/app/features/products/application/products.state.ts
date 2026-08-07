import { computed, Injectable, signal } from '@angular/core';

import { mapProductsToCardModels } from './mappers/product-card.mapper';
import { Product } from '../domain/product.model';
import { ProductsQueryParams } from '../domain/products-query-params.interface';
import { ProductsSummary } from '../domain/products-summary.model';
import { calculateProductExpiryStatus } from '../utils/product-expiry.util';

const INITIAL_QUERY: ProductsQueryParams = {};

@Injectable({
  providedIn: 'root',
})
export class ProductsState {
  private readonly productsState = signal<readonly Product[]>([]);

  private readonly queryState = signal<ProductsQueryParams>(INITIAL_QUERY);

  private readonly searchQueryState = signal('');

  private readonly pendingRequestsState = signal(0);

  private readonly errorState = signal<string | null>(null);

  readonly products = this.productsState.asReadonly();

  readonly query = this.queryState.asReadonly();

  readonly searchQuery = this.searchQueryState.asReadonly();

  readonly error = this.errorState.asReadonly();

  readonly loading = computed(() => this.pendingRequestsState() > 0);

  readonly filteredProducts = computed<readonly Product[]>(() => {
    const normalizedSearchQuery = this.searchQuery().trim().toLocaleLowerCase();

    if (!normalizedSearchQuery) {
      return this.products();
    }

    return this.products().filter(
      (product) =>
        product.name.toLocaleLowerCase().includes(normalizedSearchQuery) ||
        product.categoryDisplay.toLocaleLowerCase().includes(normalizedSearchQuery) ||
        product.quantity.toLocaleLowerCase().includes(normalizedSearchQuery),
    );
  });

  readonly productCards = computed(() => mapProductsToCardModels(this.filteredProducts()));

  readonly summary = computed<ProductsSummary>(() => {
    const products = this.products();

    return products.reduce<ProductsSummary>(
      (summary, product) => {
        const status = calculateProductExpiryStatus(product.expiryDate);

        return {
          total: summary.total + 1,
          fresh: summary.fresh + Number(status === 'fresh'),
          expiringSoon: summary.expiringSoon + Number(status === 'expiring-soon'),
          expired: summary.expired + Number(status === 'expired'),
        };
      },
      {
        total: 0,
        fresh: 0,
        expiringSoon: 0,
        expired: 0,
      },
    );
  });

  readonly totalCount = computed(() => this.summary().total);

  setProducts(products: readonly Product[]): void {
    this.productsState.set(products);
  }

  addProduct(product: Product): void {
    this.productsState.update((products) => [product, ...products]);
  }

  replaceProduct(updatedProduct: Product): void {
    this.productsState.update((products) =>
      products.map((product) => (product.id === updatedProduct.id ? updatedProduct : product)),
    );
  }

  removeProduct(productId: number): void {
    this.productsState.update((products) => products.filter((product) => product.id !== productId));
  }

  setQuery(query: ProductsQueryParams): void {
    this.queryState.set(query);
  }

  patchQuery(queryPatch: Partial<ProductsQueryParams>): void {
    this.queryState.update((query) => ({
      ...query,
      ...queryPatch,
    }));
  }

  setSearchQuery(query: string): void {
    this.searchQueryState.set(query);
  }

  clearSearchQuery(): void {
    this.searchQueryState.set('');
  }

  setError(error: string | null): void {
    this.errorState.set(error);
  }

  startRequest(): void {
    this.pendingRequestsState.update((count) => count + 1);
  }

  finishRequest(): void {
    this.pendingRequestsState.update((count) => Math.max(0, count - 1));
  }

  clearProducts(): void {
    this.productsState.set([]);
  }

  reset(): void {
    this.productsState.set([]);
    this.queryState.set(INITIAL_QUERY);
    this.searchQueryState.set('');
    this.pendingRequestsState.set(0);
    this.errorState.set(null);
  }
}
