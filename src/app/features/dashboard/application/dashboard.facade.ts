import { Injectable, computed, inject } from '@angular/core';
import { catchError, finalize, Observable, of, tap } from 'rxjs';

import { resolveApiErrorMessage } from '../../../core/api';
import { HeaderFacade } from '../../../layouts/main-header/header.facade';
import { ProductApiService } from '../data-access/products/product-api.service';
import {
  CreateProductRequestDto,
  PatchProductRequestDto,
  UpdateProductRequestDto,
} from '../data-access/products/product-request.dto';
import { DashboardSummary } from '../domain/dashboard-summary.model';
import { Product } from '../domain/product.model';
import { ProductStatusFilter } from '../domain/product-status-filter.type';
import { ProductStorage } from '../domain/product-storage.type';
import { DASHBOARD_PRODUCT_ERROR_MESSAGES } from './dashboard-errors.constants';
import { DashboardStore } from './dashboard.store';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class DashboardFacade {
  private readonly store = inject(DashboardStore);

  private readonly productApi = inject(ProductApiService);

  private readonly header = inject(HeaderFacade);

  readonly products = this.store.products;

  readonly loading = this.store.loading;

  readonly error = this.store.error;

  readonly activeStorage = this.store.activeStorage;

  readonly statusFilter = this.store.statusFilter;

  readonly searchQuery = this.header.searchQuery;

  readonly filteredProducts = computed<readonly Product[]>(() => {
    const query = this.searchQuery().trim().toLocaleLowerCase();

    const status = this.statusFilter();

    return this.products().filter((product) => {
      const matchesStatus = status === 'all' || product.status === status;

      if (!matchesStatus) {
        return false;
      }

      if (!query) {
        return true;
      }

      return (
        product.name.toLocaleLowerCase().includes(query) ||
        product.categoryDisplay.toLocaleLowerCase().includes(query)
      );
    });
  });

  readonly summary = computed<DashboardSummary>(() => {
    const products = this.products();

    return products.reduce<DashboardSummary>(
      (summary, product) => {
        switch (product.status) {
          case 'fresh':
            return {
              ...summary,
              fresh: summary.fresh + 1,
            };

          case 'expiring-soon':
            return {
              ...summary,
              expiringSoon: summary.expiringSoon + 1,
            };

          case 'expired':
            return {
              ...summary,
              expired: summary.expired + 1,
            };
        }
      },
      {
        total: products.length,
        expiringSoon: 0,
        expired: 0,
        fresh: 0,
      },
    );
  });

  loadStorage(storage: ProductStorage): void {
    this.store.setActiveStorage(storage);
    this.store.resetFilters();

    this.header.clearSearchQuery();

    this.loadProducts(storage);
  }

  selectStatus(status: ProductStatusFilter): void {
    this.store.setStatusFilter(status);
  }

  createProduct(request: CreateProductRequestDto): Observable<Product> {
    return this.productApi.createProduct(request).pipe(
      tap((product) => {
        if (product.storage === this.activeStorage()) {
          this.store.addProduct(product);
        }
      }),
    );
  }

  updateProduct(id: number, request: UpdateProductRequestDto): Observable<Product> {
    return this.productApi.updateProduct(id, request).pipe(
      tap((product) => {
        this.syncUpdatedProduct(product);
      }),
    );
  }

  patchProduct(id: number, request: PatchProductRequestDto): Observable<Product> {
    return this.productApi.patchProduct(id, request).pipe(
      tap((product) => {
        this.syncUpdatedProduct(product);
      }),
    );
  }

  deleteProduct(id: number): Observable<void> {
    return this.productApi.deleteProduct(id).pipe(
      tap(() => {
        this.store.removeProduct(id);
      }),
    );
  }

  clearError(): void {
    this.store.setError(null);
  }

  reset(): void {
    this.store.reset();
    this.header.clearSearchQuery();
  }

  private loadProducts(storage: ProductStorage): void {
    this.store.setLoading(true);
    this.store.setError(null);

    this.productApi
      .getProducts({
        storage,
      })
      .pipe(
        catchError((error: unknown) => {
          if (error instanceof HttpErrorResponse && error.status === 404) {
            return of([]);
          }

          this.store.clearProducts();

          this.store.setError(resolveApiErrorMessage(error, DASHBOARD_PRODUCT_ERROR_MESSAGES.load));

          return of([]);
        }),
        finalize(() => {
          this.store.setLoading(false);
        }),
      )
      .subscribe((products) => {
        this.store.setProducts(products);
      });
  }

  private syncUpdatedProduct(product: Product): void {
    if (product.storage === this.activeStorage()) {
      this.store.replaceProduct(product);

      return;
    }

    this.store.removeProduct(product.id);
  }
}
