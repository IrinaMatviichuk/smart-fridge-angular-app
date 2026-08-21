import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith } from 'rxjs';

import { IconName } from '../../../../core/icons/icon-name';
import { TabsItem } from '../../../../shared/ui/tabs/tabs-item.interface';
import { Tabs } from '../../../../shared/ui/tabs/tabs';

export type RecipesNavigationTab = 'suggestions' | 'saved';

const RECIPES_NAVIGATION_ITEMS: readonly TabsItem<RecipesNavigationTab>[] = [
  {
    value: 'suggestions',
    label: 'Suggestions',
    icon: IconName.Reminder,
  },
  {
    value: 'saved',
    label: 'Liked Recipes',
    icon: IconName.FavoriteFilled,
  },
];

@Component({
  selector: 'app-recipes-navigation',
  imports: [Tabs],
  templateUrl: './recipes-navigation.html',
  styleUrl: './recipes-navigation.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipesNavigation {
  private readonly router = inject(Router);

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

  protected readonly items = RECIPES_NAVIGATION_ITEMS;

  protected readonly active = computed<RecipesNavigationTab>(() =>
    this.currentUrl().startsWith('/recipes/saved') ? 'saved' : 'suggestions',
  );

  protected handleChange(tab: RecipesNavigationTab): void {
    if (tab === this.active()) {
      return;
    }

    void this.router.navigate(['/recipes', tab]);
  }
}
