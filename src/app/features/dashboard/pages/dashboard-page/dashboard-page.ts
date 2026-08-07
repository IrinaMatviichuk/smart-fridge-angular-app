import { ChangeDetectionStrategy, Component, computed, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { distinctUntilChanged, filter, map } from 'rxjs';

import { HeaderFacade } from '../../../../layouts/main-header/header.facade';
import { DashboardFacade } from '../../application/dashboard.facade';
import { DashboardStore } from '../../application/dashboard.store';
import { DashboardSummary } from '../../components/dashboard-summary/dashboard-summary';
import { DashboardToolbar } from '../../components/dashboard-toolbar/dashboard-toolbar';
import { mapDashboardToolbarModel } from '../../components/dashboard-toolbar/dashboard-toolbar.mapper';
import { isProductStorage, ProductStorage } from '../../domain/product-storage.type';

@Component({
  selector: 'app-dashboard-page',
  imports: [DashboardToolbar, DashboardSummary],
  providers: [DashboardStore, DashboardFacade],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPage {
  private readonly route = inject(ActivatedRoute);

  private readonly router = inject(Router);

  private readonly header = inject(HeaderFacade);

  protected readonly facade = inject(DashboardFacade);

  private readonly storage = toSignal(
    this.route.paramMap.pipe(
      map((params) => params.get('storage')),
      filter(isProductStorage),
      distinctUntilChanged(),
    ),
    {
      initialValue: 'fridge' satisfies ProductStorage,
    },
  );

  private readonly loadStorageEffect = effect(() => {
    this.facade.loadStorage(this.storage());
  });

  protected readonly toolbarModel = computed(() => mapDashboardToolbarModel(this.storage()));

  constructor() {
    this.header.configureSearch({
      key: 'search',
      placeholder: 'Search products...',
      ariaLabel: 'Search products',
    });
  }

  protected handleStorageChanged(storage: ProductStorage): void {
    if (storage === this.storage()) {
      return;
    }

    void this.router.navigate(['/dashboard', storage]);
  }

  protected handleAddProduct(): void {
    // Dialog will be connected in the Add Product step.
  }
}
