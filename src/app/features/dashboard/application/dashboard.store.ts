import { Injectable, computed, signal } from '@angular/core';

import { Product } from '../domain/product.model';
import { ProductCategoryFilter } from '../domain/product-category-filter.type';
import { PRODUCT_SORT, ProductSort } from '../domain/product-sort.type';
import { ProductStatusFilter } from '../domain/product-status-filter.type';
import { PRODUCT_STORAGE, ProductStorage } from '../domain/product-storage.type';

@Injectable()
export class DashboardStore {
  private readonly productsState = signal<readonly Product[]>([]);

  private readonly loadingState = signal(false);

  private readonly errorState = signal<string | null>(null);

  private readonly activeStorageState = signal<ProductStorage>(PRODUCT_STORAGE.fridge);

  private readonly statusFilterState = signal<ProductStatusFilter>('all');

  private readonly categoryFilterState = signal<ProductCategoryFilter>('all');

  private readonly productSortState = signal<ProductSort>(PRODUCT_SORT.expiryDateAsc);

  readonly products = this.productsState.asReadonly();

  readonly loading = this.loadingState.asReadonly();

  readonly error = this.errorState.asReadonly();

  readonly activeStorage = this.activeStorageState.asReadonly();

  readonly statusFilter = this.statusFilterState.asReadonly();

  readonly categoryFilter = this.categoryFilterState.asReadonly();

  readonly productSort = this.productSortState.asReadonly();

  readonly hasProducts = computed(() => this.productsState().length > 0);

  readonly isEmpty = computed(() => !this.loadingState() && this.productsState().length === 0);

  setProducts(products: readonly Product[]): void {
    this.productsState.set(products);
  }

  setLoading(loading: boolean): void {
    this.loadingState.set(loading);
  }

  setError(error: string | null): void {
    this.errorState.set(error);
  }

  setActiveStorage(storage: ProductStorage): void {
    this.activeStorageState.set(storage);
  }

  setStatusFilter(status: ProductStatusFilter): void {
    this.statusFilterState.set(status);
  }

  setCategoryFilter(category: ProductCategoryFilter): void {
    this.categoryFilterState.set(category);
  }

  setProductSort(sort: ProductSort): void {
    this.productSortState.set(sort);
  }

  addProduct(product: Product): void {
    this.productsState.update((products) => [...products, product]);
  }

  replaceProduct(product: Product): void {
    this.productsState.update((products) =>
      products.map((item) => (item.id === product.id ? product : item)),
    );
  }

  removeProduct(productId: number): void {
    this.productsState.update((products) => products.filter((product) => product.id !== productId));
  }

  clearProducts(): void {
    this.productsState.set([]);
  }

  resetFilters(): void {
    this.statusFilterState.set('all');
    this.categoryFilterState.set('all');
    this.productSortState.set(PRODUCT_SORT.expiryDateAsc);
  }

  reset(): void {
    this.productsState.set([]);
    this.loadingState.set(false);
    this.errorState.set(null);

    this.activeStorageState.set(PRODUCT_STORAGE.fridge);

    this.resetFilters();
  }
}
