import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';

import { HeaderSearchState } from '../../../../layouts/main-header/header-search.state';

@Component({
  selector: 'app-shopping-list-page',
  template: `
    <section class="shopping-list-page">
      <h1>Shopping List</h1>
    </section>
  `,
  styles: `
    :host {
      display: block;
      width: 100%;
    }

    .shopping-list-page {
      padding: var(--sf-space-8);
    }

    h1 {
      margin: 0;
      color: var(--sf-color-text-primary);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShoppingListPage {
  private readonly headerSearchState = inject(HeaderSearchState);

  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    this.headerSearchState.configure({
      key: 'search',
      placeholder: 'Search shopping list',
      ariaLabel: 'Search shopping list',
    });

    this.destroyRef.onDestroy(() => {
      this.headerSearchState.reset();
    });
  }
}
