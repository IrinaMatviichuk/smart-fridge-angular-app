import { ProductWriteModel } from '../../../features/dashboard/domain/product-write.model';
import { CreateProductRequestDto, UpdateProductRequestDto } from './product-request.dto';

export const mapCreateProductRequest = (product: ProductWriteModel): CreateProductRequestDto => {
  return {
    name: product.name,
    category: product.category,
    storage: product.storage,
    quantity: product.quantity,
    expiry_date: product.expiryDate,
  };
};

export const mapUpdateProductRequest = (product: ProductWriteModel): UpdateProductRequestDto => {
  return {
    name: product.name,
    category: product.category,
    storage: product.storage,
    quantity: product.quantity,
    expiry_date: product.expiryDate,
  };
};
