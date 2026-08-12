import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  untracked,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { distinctUntilChanged, map } from 'rxjs';

import { IconName } from '../../../../core/icons/icon-name';
import { mapProductToCardModel } from '../../../../entities/product/presentation/product-card.mapper';
import { HeaderFacade } from '../../../../layouts/main-header/header.facade';
import { Button } from '../../../../shared/ui/button/button';
import { EmptyState } from '../../../../shared/ui/empty-state/empty-state';
import { ProductCard } from '../../../../shared/ui/product-card/product-card';
import { Tabs } from '../../../../shared/ui/tabs/tabs';
import { TipFrame } from '../../../../shared/ui/tip-frame/tip-frame';
import { TipFrameModel } from '../../../../shared/ui/tip-frame/tip-frame.model';
import { RecipesFacade } from '../../application/recipes.facade';
import { RecipesStore } from '../../application/recipes.store';
import { mapRecipeGenerationErrorTip } from '../../components/recipe-generation-error/recipe-generation-error.mapper';
import { isRecipeView, RecipeView } from '../../domain/recipe-view.type';
import {
  RECIPES_EMPTY_INGREDIENTS_STATE,
  RECIPES_EMPTY_SAVED_STATE,
  RECIPES_TABS,
} from './recipes-page.config';
import { mapRecipesErrorTip } from './recipes-page.mapper';

@Component({
  selector: 'app-recipes-page',
  imports: [Button, EmptyState, ProductCard, Tabs, TipFrame],
  providers: [RecipesStore, RecipesFacade],
  templateUrl: './recipes-page.html',
  styleUrl: './recipes-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipesPage {
  private readonly route = inject(ActivatedRoute);

  private readonly router = inject(Router);

  private readonly header = inject(HeaderFacade);

  protected readonly facade = inject(RecipesFacade);

  protected readonly tabs = RECIPES_TABS;

  protected readonly emptyIngredientsState = RECIPES_EMPTY_INGREDIENTS_STATE;

  protected readonly emptySavedRecipesState = RECIPES_EMPTY_SAVED_STATE;

  protected readonly icons = {
    sparkles: IconName.Sparkles,
  } as const;

  protected readonly activeView = toSignal(
    this.route.paramMap.pipe(
      map((params) => {
        const view = params.get('view');

        return isRecipeView(view) ? view : null;
      }),
      distinctUntilChanged(),
    ),
    {
      initialValue: this.resolveInitialView(),
    },
  );

  protected readonly productCards = computed(() =>
    this.facade.availableProducts().map(mapProductToCardModel),
  );

  protected readonly hasExpandableProducts = computed(() => this.productCards().length > 4);

  protected readonly productsErrorTip = computed<TipFrameModel | null>(() => {
    const error = this.facade.productsError();

    if (!error) {
      return null;
    }

    return mapRecipesErrorTip('Unable to load ingredients', error);
  });

  protected readonly generationErrorTip = computed<TipFrameModel | null>(() => {
    const error = this.facade.generationError();

    if (!error) {
      return null;
    }

    return mapRecipeGenerationErrorTip(error, this.facade.generationErrorMessage());
  });

  protected readonly savedErrorTip = computed<TipFrameModel | null>(() => {
    const error = this.facade.savedError();

    if (!error) {
      return null;
    }

    return mapRecipesErrorTip('Unable to load liked recipes', error);
  });

  private readonly viewEffect = effect(() => {
    const view = this.activeView();

    if (!view) {
      untracked(() => {
        void this.router.navigate(['/recipes', 'suggestions'], {
          replaceUrl: true,
        });
      });

      return;
    }

    untracked(() => {
      if (view === 'suggestions') {
        this.facade.loadAvailableProducts();

        return;
      }

      this.facade.loadSavedRecipes();
    });
  });

  constructor() {
    this.header.configureSearch({
      key: 'search',
      placeholder: 'Search recipes...',
      ariaLabel: 'Search recipes',
    });
  }

  protected handleViewChange(view: RecipeView): void {
    if (view === this.activeView()) {
      return;
    }

    void this.router.navigate(['/recipes', view]);
  }

  protected handleEmptyAction(): void {
    void this.router.navigate(['/dashboard', 'fridge']);
  }

  protected handleGenerateRecipes(): void {
    this.facade.generateRecipes();
  }

  private resolveInitialView(): RecipeView | null {
    const view = this.route.snapshot.paramMap.get('view');

    return isRecipeView(view) ? view : null;
  }
}
