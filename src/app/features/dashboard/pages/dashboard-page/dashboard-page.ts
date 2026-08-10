import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { distinctUntilChanged, filter, map } from 'rxjs';

import { HeaderFacade } from '../../../../layouts/main-header/header.facade';
import { EmptyState } from '../../../../shared/ui/empty-state/empty-state';
import { DashboardFacade } from '../../application/dashboard.facade';
import { DashboardStore } from '../../application/dashboard.store';
import {
  mapFilterEmptyState,
  mapStorageEmptyState,
} from '../../components/dashboard-empty-state/dashboard-empty-state.mapper';
import { DashboardProducts } from '../../components/dashboard-products/dashboard-products';
import { mapDashboardProductsModel } from '../../components/dashboard-products/dashboard-products.mapper';
import { DashboardStatusFilter } from '../../components/dashboard-status-filter/dashboard-status-filter';
import { mapDashboardStatusFilterModel } from '../../components/dashboard-status-filter/dashboard-status-filter.mapper';
import { DashboardSummary } from '../../components/dashboard-summary/dashboard-summary';
import { DashboardToolbar } from '../../components/dashboard-toolbar/dashboard-toolbar';
import { mapDashboardToolbarModel } from '../../components/dashboard-toolbar/dashboard-toolbar.mapper';
import { isProductStorage, ProductStorage } from '../../domain/product-storage.type';
import { LoadingSpinnerComponent } from '../../../../shared/ui/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-dashboard-page',
  imports: [
    DashboardToolbar,
    DashboardSummary,
    DashboardStatusFilter,
    DashboardProducts,
    EmptyState,
    LoadingSpinnerComponent,
  ],
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
      initialValue: this.resolveInitialStorage(),
    },
  );

  protected readonly toolbarModel = computed(() => mapDashboardToolbarModel(this.storage()));

  protected readonly statusFilterModel = computed(() =>
    mapDashboardStatusFilterModel(this.facade.statusFilter()),
  );

  protected readonly productsModel = computed(() =>
    mapDashboardProductsModel(this.facade.filteredProducts(), this.facade.loading()),
  );

  protected readonly storageEmptyState = computed(() => mapStorageEmptyState(this.storage()));

  protected readonly filterEmptyState = computed(() => mapFilterEmptyState(this.storage()));

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

  private resolveInitialStorage(): ProductStorage {
    const storage = this.route.snapshot.paramMap.get('storage');

    return isProductStorage(storage) ? storage : 'fridge';
  }
}
