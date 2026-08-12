import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  computed,
  effect,
  inject,
} from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, distinctUntilChanged, filter, map, switchMap } from 'rxjs';

import { HeaderFacade } from '../../../../layouts/main-header/header.facade';
import { ConfirmationDialogService } from '../../../../shared/ui/confirmation-dialog/confirmation-dialog.service';
import { EmptyState } from '../../../../shared/ui/empty-state/empty-state';
import { LoadingSpinnerComponent } from '../../../../shared/ui/loading-spinner/loading-spinner.component';
import { DashboardFacade } from '../../application/dashboard.facade';
import { DashboardStore } from '../../application/dashboard.store';
import {
  mapFilterEmptyState,
  mapStorageEmptyState,
} from '../../components/dashboard-empty-state/dashboard-empty-state.mapper';
import { DashboardProductControls } from '../../components/dashboard-product-controls/dashboard-product-controls';
import { mapDashboardProductControlsModel } from '../../components/dashboard-product-controls/dashboard-product-controls.mapper';
import { DashboardProducts } from '../../components/dashboard-products/dashboard-products';
import { mapDashboardProductsModel } from '../../components/dashboard-products/dashboard-products.mapper';
import { mapProductDeleteConfirmationData } from '../../components/product-delete-confirmation/product-delete-confirmation.mapper';
import { ProductFormDialogService } from '../../components/product-form-dialog/product-form-dialog.service';
import { DashboardSummary } from '../../components/dashboard-summary/dashboard-summary';
import { DashboardToolbar } from '../../components/dashboard-toolbar/dashboard-toolbar';
import { mapDashboardToolbarModel } from '../../components/dashboard-toolbar/dashboard-toolbar.mapper';
import { DASHBOARD_ROUTE_PARAM } from '../../domain/dashboard-route.constants';
import type { Product } from '../../../../entities/product/domain/product.model';
import {
  isProductStorage,
  PRODUCT_STORAGE,
  ProductStorage,
} from '../../../../entities/product/domain/product-storage.type';

@Component({
  selector: 'app-dashboard-page',
  imports: [
    DashboardToolbar,
    DashboardSummary,
    DashboardProductControls,
    DashboardProducts,
    EmptyState,
    LoadingSpinnerComponent,
  ],
  providers: [DashboardStore, DashboardFacade, ProductFormDialogService],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPage {
  private readonly route = inject(ActivatedRoute);

  private readonly router = inject(Router);

  private readonly header = inject(HeaderFacade);

  private readonly productFormDialog = inject(ProductFormDialogService);

  private readonly confirmationDialog = inject(ConfirmationDialogService);

  private readonly destroyRef = inject(DestroyRef);

  protected readonly facade = inject(DashboardFacade);

  private readonly storage = toSignal(
    this.route.paramMap.pipe(
      map((params) => params.get(DASHBOARD_ROUTE_PARAM.storage)),
      filter(isProductStorage),
      distinctUntilChanged(),
    ),
    {
      initialValue: this.resolveInitialStorage(),
    },
  );

  protected readonly toolbarModel = computed(() => mapDashboardToolbarModel(this.storage()));

  protected readonly productControlsModel = computed(() =>
    mapDashboardProductControlsModel(
      this.facade.statusFilter(),
      this.facade.categoryFilter(),
      this.facade.productSort(),
    ),
  );

  protected readonly productsModel = computed(() =>
    mapDashboardProductsModel(this.facade.visibleProducts(), this.facade.loading()),
  );

  protected readonly storageEmptyState = computed(() => mapStorageEmptyState(this.storage()));

  protected readonly filterEmptyState = computed(() => mapFilterEmptyState(this.storage()));

  constructor() {
    this.header.configureSearch({
      key: 'search',
      placeholder: 'Search products...',
      ariaLabel: 'Search products',
    });

    effect(() => {
      this.facade.loadStorage(this.storage());
    });
  }

  protected handleStorageChanged(storage: ProductStorage): void {
    if (storage === this.storage()) {
      return;
    }

    void this.router.navigate(['/dashboard', storage]);
  }

  protected handleAddProduct(): void {
    this.productFormDialog
      .open(this.storage())
      .pipe(
        switchMap((product) => (product ? this.facade.createProduct(product) : EMPTY)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }

  protected handleEditProduct(product: Product): void {
    this.productFormDialog
      .open(this.storage(), product)
      .pipe(
        switchMap((changes) => (changes ? this.facade.updateProduct(product.id, changes) : EMPTY)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }

  protected handleDeleteProduct(product: Product): void {
    this.confirmationDialog
      .open(mapProductDeleteConfirmationData(product))
      .pipe(
        switchMap((confirmed) => (confirmed ? this.facade.deleteProduct(product.id) : EMPTY)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }

  private resolveInitialStorage(): ProductStorage {
    const storage = this.route.snapshot.paramMap.get(DASHBOARD_ROUTE_PARAM.storage);

    return isProductStorage(storage) ? storage : PRODUCT_STORAGE.fridge;
  }
}
