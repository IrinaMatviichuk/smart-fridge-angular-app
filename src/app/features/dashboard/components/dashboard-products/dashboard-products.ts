import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

import { ProductCard } from '../../../../shared/ui/product-card/product-card';
import { ProductCardModel } from '../../../../shared/ui/product-card/product-card.model';
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

  readonly productSelected = output<ProductCardModel>();

  readonly productMenuRequested = output<ProductCardModel>();
}
