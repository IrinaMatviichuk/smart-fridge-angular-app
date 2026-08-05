import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';

import { HeaderSearchState } from '../../../../layouts/main-header/header-search.state';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPage {
  private readonly headerSearchState = inject(HeaderSearchState);

  private readonly destroyRef = inject(DestroyRef);

  protected readonly searchQuery = this.headerSearchState.query;

  constructor() {
    this.headerSearchState.configure({
      placeholder: 'Search products',
      ariaLabel: 'Search products',
    });

    this.destroyRef.onDestroy(() => {
      this.headerSearchState.reset();
    });
  }
}
