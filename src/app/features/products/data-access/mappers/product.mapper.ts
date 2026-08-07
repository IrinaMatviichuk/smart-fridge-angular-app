import { Product } from '../../domain/product.model';
import { ProductPayload } from '../../domain/product-payload.model';
import { CreateProductRequestDto } from '../dto/create-product-request.dto';
import { PatchProductRequestDto } from '../dto/patch-product-request.dto';
import { ProductDto } from '../dto/product.dto';
import { UpdateProductRequestDto } from '../dto/update-product-request.dto';

export const mapProductDtoToModel = (dto: ProductDto): Product => ({
  id: dto.id,
  name: dto.name,
  category: dto.category,
  categoryDisplay: dto.category_display,
  storage: dto.storage,
  storageDisplay: dto.storage_display,
  quantity: dto.quantity,
  expiryDate: dto.expiry_date,
  createdAt: dto.created_at,
});

export const mapProductDtosToModels = (dtos: readonly ProductDto[]): readonly Product[] =>
  dtos.map(mapProductDtoToModel);

export const mapProductPayloadToCreateRequest = (
  payload: ProductPayload,
): CreateProductRequestDto => ({
  name: payload.name,
  category: payload.category,
  storage: payload.storage,
  quantity: payload.quantity,
  expiry_date: payload.expiryDate,
});

export const mapProductPayloadToUpdateRequest = (
  payload: ProductPayload,
): UpdateProductRequestDto => ({
  name: payload.name,
  category: payload.category,
  storage: payload.storage,
  quantity: payload.quantity,
  expiry_date: payload.expiryDate,
});

export const mapProductPayloadToPatchRequest = (
  payload: Partial<ProductPayload>,
): PatchProductRequestDto => ({
  ...(payload.name !== undefined && {
    name: payload.name,
  }),
  ...(payload.category !== undefined && {
    category: payload.category,
  }),
  ...(payload.storage !== undefined && {
    storage: payload.storage,
  }),
  ...(payload.quantity !== undefined && {
    quantity: payload.quantity,
  }),
  ...(payload.expiryDate !== undefined && {
    expiry_date: payload.expiryDate,
  }),
});
