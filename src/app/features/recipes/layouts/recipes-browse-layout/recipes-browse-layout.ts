import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, map, startWith } from 'rxjs';

import { HeaderFacade } from '../../../../layouts/main-header/header.facade';
import { RecipesNavigation } from '../../components/recipes-navigation/recipes-navigation';

interface RecipesBrowsePageConfig {
  readonly title: string;
  readonly subtitle: string;
}

const RECIPES_BROWSE_PAGE_CONFIG = {
  suggestions: {
    title: 'Generate Recipes',
    subtitle:
      'Our AI will generate recipe suggestions based on the ingredients available in your inventory.',
  },
  saved: {
    title: 'Recipes Suggestions',
    subtitle:
      'Our AI will generate recipe suggestions based on the ingredients available in your inventory.',
  },
} as const satisfies Record<'suggestions' | 'saved', RecipesBrowsePageConfig>;

@Component({
  selector: 'app-recipes-browse-layout',
  imports: [RecipesNavigation, RouterOutlet],
  templateUrl: './recipes-browse-layout.html',
  styleUrl: './recipes-browse-layout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipesBrowseLayout {
  private readonly router = inject(Router);

  private readonly header = inject(HeaderFacade);

  private readonly currentUrl = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event) => event.urlAfterRedirects),
      startWith(this.router.url),
    ),
    {
      initialValue: this.router.url,
    },
  );

  private readonly pageConfig = computed<RecipesBrowsePageConfig>(() => {
    const url = this.currentUrl();

    return url.startsWith('/recipes/saved')
      ? RECIPES_BROWSE_PAGE_CONFIG.saved
      : RECIPES_BROWSE_PAGE_CONFIG.suggestions;
  });

  protected readonly title = computed(() => this.pageConfig().title);

  protected readonly subtitle = computed(() => this.pageConfig().subtitle);

  constructor() {
    this.header.configureSearch({
      key: 'search',
      placeholder: 'Search recipes...',
      ariaLabel: 'Search recipes',
    });
  }
}
