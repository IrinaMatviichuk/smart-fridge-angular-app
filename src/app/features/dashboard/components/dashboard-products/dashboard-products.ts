import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

import { ActionMenuItem } from '../../../../shared/ui/action-menu/action-menu-item.model';
import { ProductCard } from '../../../../shared/ui/product-card/product-card';
import { Product } from '../../../../entities/product/domain/product.model';
import { PRODUCT_ACTION, ProductAction } from '../product-actions/product-actions.types';
import { PRODUCT_ACTIONS } from '../product-actions/product-actions.config';
import { DashboardProductsModel } from './dashboard-products.model';

@Component({
  selector: 'app-dashboard-products',
  imports: [ProductCard],
  templateUrl: './dashboard-products.html',
  styleUrl: './dashboard-products.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardProducts {
  readonly model = input.required<DashboardProductsModel>();

  readonly editRequested = output<Product>();

  readonly deleteRequested = output<Product>();

  protected readonly productActions = PRODUCT_ACTIONS;

  protected handleActionSelected(product: Product, action: ActionMenuItem<ProductAction>): void {
    switch (action.id) {
      case PRODUCT_ACTION.edit:
        this.editRequested.emit(product);
        return;

      case PRODUCT_ACTION.delete:
        this.deleteRequested.emit(product);
        return;
    }
  }

  protected trackProduct(_: number, product: Product): number {
    return product.id;
  }
}
