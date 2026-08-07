import { Injectable, computed, signal } from '@angular/core';

import { Product } from '../domain/product.model';
import { ProductStatusFilter } from '../domain/product-status-filter.type';
import { ProductStorage } from '../domain/product-storage.type';

@Injectable()
export class DashboardStore {
  private readonly productsState = signal<readonly Product[]>([]);

  private readonly loadingState = signal(false);

  private readonly errorState = signal<string | null>(null);

  private readonly activeStorageState = signal<ProductStorage>('fridge');

  private readonly statusFilterState = signal<ProductStatusFilter>('all');

  readonly products = this.productsState.asReadonly();

  readonly loading = this.loadingState.asReadonly();

  readonly error = this.errorState.asReadonly();

  readonly activeStorage = this.activeStorageState.asReadonly();

  readonly statusFilter = this.statusFilterState.asReadonly();

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
  }

  reset(): void {
    this.productsState.set([]);
    this.loadingState.set(false);
    this.errorState.set(null);
    this.activeStorageState.set('fridge');
    this.statusFilterState.set('all');
  }
}
