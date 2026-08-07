import { inject, Injectable } from '@angular/core';
import { catchError, defer, EMPTY, finalize, Observable, OperatorFunction, tap } from 'rxjs';

import { resolveApiErrorMessage } from '../../../core/api';
import { PRODUCTS_ERROR_MESSAGES } from '../constants/products-error-messages.constants';
import { ProductsApiService } from '../data-access/products-api.service';
import { ProductPayload } from '../domain/product-payload.model';
import { Product } from '../domain/product.model';
import { ProductsQueryParams } from '../domain/products-query-params.interface';
import { ProductsState } from './products.state';

interface ProductsErrorConfig {
  readonly defaultMessage: string;

  readonly statusMessages?: Readonly<Partial<Record<number, string>>>;
}

@Injectable({
  providedIn: 'root',
})
export class ProductsFacade {
  private readonly productsApi = inject(ProductsApiService);

  private readonly productsState = inject(ProductsState);

  readonly products = this.productsState.products;

  readonly filteredProducts = this.productsState.filteredProducts;

  readonly productCards = this.productsState.productCards;

  readonly summary = this.productsState.summary;

  readonly query = this.productsState.query;

  readonly searchQuery = this.productsState.searchQuery;

  readonly totalCount = this.productsState.totalCount;

  readonly loading = this.productsState.loading;

  readonly error = this.productsState.error;

  loadProducts(
    query: ProductsQueryParams = this.productsState.query(),
  ): Observable<readonly Product[]> {
    return defer(() => {
      this.startRequest();
      this.productsState.setQuery(query);

      return this.productsApi.getProducts(query);
    }).pipe(
      tap((products) => {
        this.productsState.setProducts(products);
      }),
      this.handleRequestError({
        defaultMessage: PRODUCTS_ERROR_MESSAGES.load,
      }),
      this.finishRequest(),
    );
  }

  loadProduct(productId: number): Observable<Product> {
    return defer(() => {
      this.startRequest();

      return this.productsApi.getProduct(productId);
    }).pipe(
      this.handleRequestError({
        defaultMessage: PRODUCTS_ERROR_MESSAGES.loadOne,
        statusMessages: {
          404: PRODUCTS_ERROR_MESSAGES.notFound,
        },
      }),
      this.finishRequest(),
    );
  }

  createProduct(payload: ProductPayload): Observable<Product> {
    return defer(() => {
      this.startRequest();

      return this.productsApi.createProduct(payload);
    }).pipe(
      tap((product) => {
        if (this.matchesCurrentQuery(product)) {
          this.productsState.addProduct(product);
        }
      }),
      this.handleRequestError({
        defaultMessage: PRODUCTS_ERROR_MESSAGES.create,
      }),
      this.finishRequest(),
    );
  }

  updateProduct(productId: number, payload: ProductPayload): Observable<Product> {
    return defer(() => {
      this.startRequest();

      return this.productsApi.updateProduct(productId, payload);
    }).pipe(
      tap((product) => {
        this.synchronizeUpdatedProduct(product);
      }),
      this.handleRequestError({
        defaultMessage: PRODUCTS_ERROR_MESSAGES.update,
        statusMessages: {
          404: PRODUCTS_ERROR_MESSAGES.notFound,
        },
      }),
      this.finishRequest(),
    );
  }

  patchProduct(productId: number, payload: Partial<ProductPayload>): Observable<Product> {
    return defer(() => {
      this.startRequest();

      return this.productsApi.patchProduct(productId, payload);
    }).pipe(
      tap((product) => {
        this.synchronizeUpdatedProduct(product);
      }),
      this.handleRequestError({
        defaultMessage: PRODUCTS_ERROR_MESSAGES.update,
        statusMessages: {
          404: PRODUCTS_ERROR_MESSAGES.notFound,
        },
      }),
      this.finishRequest(),
    );
  }

  deleteProduct(productId: number): Observable<void> {
    return defer(() => {
      this.startRequest();

      return this.productsApi.deleteProduct(productId);
    }).pipe(
      tap(() => {
        this.productsState.removeProduct(productId);
      }),
      this.handleRequestError({
        defaultMessage: PRODUCTS_ERROR_MESSAGES.delete,
        statusMessages: {
          404: PRODUCTS_ERROR_MESSAGES.notFound,
        },
      }),
      this.finishRequest(),
    );
  }

  changeQuery(queryPatch: Partial<ProductsQueryParams>): Observable<readonly Product[]> {
    const query: ProductsQueryParams = {
      ...this.productsState.query(),
      ...queryPatch,
    };

    return this.loadProducts(query);
  }

  setSearchQuery(query: string): void {
    this.productsState.setSearchQuery(query);
  }

  clearSearchQuery(): void {
    this.productsState.clearSearchQuery();
  }

  clearError(): void {
    this.productsState.setError(null);
  }

  reset(): void {
    this.productsState.reset();
  }

  private synchronizeUpdatedProduct(product: Product): void {
    if (this.matchesCurrentQuery(product)) {
      this.productsState.replaceProduct(product);

      return;
    }

    this.productsState.removeProduct(product.id);
  }

  private matchesCurrentQuery(product: Product): boolean {
    const query = this.productsState.query();

    const matchesStorage = query.storage === undefined || query.storage === product.storage;

    const matchesCategory = query.category === undefined || query.category === product.category;

    return matchesStorage && matchesCategory;
  }

  private startRequest(): void {
    this.productsState.startRequest();
    this.productsState.setError(null);
  }

  private finishRequest<T>(): OperatorFunction<T, T> {
    return finalize(() => {
      this.productsState.finishRequest();
    });
  }

  private handleRequestError<T>(config: ProductsErrorConfig): OperatorFunction<T, T> {
    return catchError((error: unknown) => {
      this.productsState.setError(
        resolveApiErrorMessage(error, {
          defaultMessage: config.defaultMessage,
          connectionErrorMessage: PRODUCTS_ERROR_MESSAGES.connection,
          statusMessages: config.statusMessages,
        }),
      );

      return EMPTY;
    });
  }
}
