import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';

import { HeaderSearchState } from '../../../../layouts/main-header/header-search.state';

@Component({
  selector: 'app-recipes-page',
  template: `
    <section class="recipes-page">
      <h1>Recipes</h1>
    </section>
  `,
  styles: `
    :host {
      display: block;
      width: 100%;
    }

    .recipes-page {
      padding: var(--sf-space-8);
    }

    h1 {
      margin: 0;
      color: var(--sf-color-text-primary);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipesPage {
  private readonly headerSearchState = inject(HeaderSearchState);

  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    this.headerSearchState.configure({
      placeholder: 'Search recipes',
      ariaLabel: 'Search recipes',
    });

    this.destroyRef.onDestroy(() => {
      this.headerSearchState.reset();
    });
  }
}
