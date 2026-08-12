import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

import { Button } from '../../../../shared/ui/button/button';
import { Tabs } from '../../../../shared/ui/tabs/tabs';
import { ProductStorage } from '../../../../entities/product/domain/product-storage.type';
import { DashboardToolbarModel } from './dashboard-toolbar.model';

@Component({
  selector: 'app-dashboard-toolbar',
  imports: [Button, Tabs],
  templateUrl: './dashboard-toolbar.html',
  styleUrl: './dashboard-toolbar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardToolbar {
  readonly model = input.required<DashboardToolbarModel>();

  readonly storageChanged = output<ProductStorage>();
  readonly addProductRequested = output<void>();
}
