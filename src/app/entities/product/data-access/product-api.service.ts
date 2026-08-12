import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BaseApiService } from '../../../core/api';
import { Product } from '../domain/product.model';
import { ProductQuery } from '../domain/product-query.model';
import { ProductDto } from './product.dto';
import { mapProductDto } from './product.mapper';
import { mapProductQueryToParams } from './product-query.mapper';
import {
  CreateProductRequestDto,
  PatchProductRequestDto,
  UpdateProductRequestDto,
} from './product-request.dto';

@Injectable({
  providedIn: 'root',
})
export class ProductApiService extends BaseApiService {
  private readonly basePath = '/products/';

  getProducts(query: ProductQuery = {}): Observable<Product[]> {
    return this.getMappedList<ProductDto, Product>(this.basePath, mapProductDto, {
      params: mapProductQueryToParams(query),
    });
  }

  getProduct(id: number): Observable<Product> {
    return this.getMappedRequired<ProductDto, Product>(this.buildProductPath(id), mapProductDto);
  }

  createProduct(request: CreateProductRequestDto): Observable<Product> {
    return this.postMapped<CreateProductRequestDto, ProductDto, Product>(
      this.basePath,
      request,
      mapProductDto,
    );
  }

  updateProduct(id: number, request: UpdateProductRequestDto): Observable<Product> {
    return this.putMapped<UpdateProductRequestDto, ProductDto, Product>(
      this.buildProductPath(id),
      request,
      mapProductDto,
    );
  }

  patchProduct(id: number, request: PatchProductRequestDto): Observable<Product> {
    return this.patchMapped<PatchProductRequestDto, ProductDto, Product>(
      this.buildProductPath(id),
      request,
      mapProductDto,
    );
  }

  deleteProduct(id: number): Observable<void> {
    return this.delete<void>(this.buildProductPath(id));
  }

  private buildProductPath(id: number): string {
    return `${this.basePath}${id}/`;
  }
}
