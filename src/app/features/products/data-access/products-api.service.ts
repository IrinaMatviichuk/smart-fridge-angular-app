import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BaseApiService } from '../../../core/api';
import { ProductPayload } from '../domain/product-payload.model';
import { Product } from '../domain/product.model';
import { ProductsQueryParams } from '../domain/products-query-params.interface';
import { PatchProductRequestDto } from './dto/patch-product-request.dto';
import { ProductDto } from './dto/product.dto';
import {
  mapProductDtoToModel,
  mapProductPayloadToCreateRequest,
  mapProductPayloadToPatchRequest,
  mapProductPayloadToUpdateRequest,
} from './mappers/product.mapper';
import { mapProductsQueryParamsToApiParams } from './mappers/products-query-params.mapper';

const PRODUCTS_API_PATH = 'products';

@Injectable({
  providedIn: 'root',
})
export class ProductsApiService extends BaseApiService {
  getProducts(query: ProductsQueryParams = {}): Observable<readonly Product[]> {
    return this.getMappedList<ProductDto, Product>(`${PRODUCTS_API_PATH}/`, mapProductDtoToModel, {
      params: mapProductsQueryParamsToApiParams(query),
    });
  }

  getProduct(productId: number): Observable<Product> {
    return this.getMappedRequired<ProductDto, Product>(
      this.buildProductPath(productId),
      mapProductDtoToModel,
    );
  }

  createProduct(payload: ProductPayload): Observable<Product> {
    return this.postMapped<
      ReturnType<typeof mapProductPayloadToCreateRequest>,
      ProductDto,
      Product
    >(`${PRODUCTS_API_PATH}/`, mapProductPayloadToCreateRequest(payload), mapProductDtoToModel);
  }

  updateProduct(productId: number, payload: ProductPayload): Observable<Product> {
    return this.putMapped<ReturnType<typeof mapProductPayloadToUpdateRequest>, ProductDto, Product>(
      this.buildProductPath(productId),
      mapProductPayloadToUpdateRequest(payload),
      mapProductDtoToModel,
    );
  }

  patchProduct(productId: number, payload: Partial<ProductPayload>): Observable<Product> {
    const request: PatchProductRequestDto = mapProductPayloadToPatchRequest(payload);

    return this.patchMapped<PatchProductRequestDto, ProductDto, Product>(
      this.buildProductPath(productId),
      request,
      mapProductDtoToModel,
    );
  }

  deleteProduct(productId: number): Observable<void> {
    return this.delete<void>(this.buildProductPath(productId));
  }

  private buildProductPath(productId: number): string {
    return `${PRODUCTS_API_PATH}/${productId}/`;
  }
}
