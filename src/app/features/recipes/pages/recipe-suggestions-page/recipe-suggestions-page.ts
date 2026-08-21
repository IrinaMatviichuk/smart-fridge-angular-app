import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { IconName } from '../../../../core/icons/icon-name';
import { mapProductToCardModel } from '../../../../entities/product/presentation/product-card.mapper';
import { Button } from '../../../../shared/ui/button/button';
import { EmptyState } from '../../../../shared/ui/empty-state/empty-state';
import { ProductCard } from '../../../../shared/ui/product-card/product-card';
import { TipFrame } from '../../../../shared/ui/tip-frame/tip-frame';
import { TipFrameModel } from '../../../../shared/ui/tip-frame/tip-frame.model';
import { RecipeGenerationFacade } from '../../application/generation/recipe-generation.facade';
import { mapRecipeGenerationErrorTip } from '../../components/recipe-generation-error/recipe-generation-error.mapper';
import {
  RECIPE_COLLAPSED_PRODUCTS_COUNT,
  RECIPE_PRIORITY_TIP,
  RECIPE_SUGGESTIONS_EMPTY_STATE,
} from './recipe-suggestions-page.config';
import {
  mapProductsToIngredientSections,
  mapRecipeSuggestionsErrorTip,
} from './recipe-suggestions-page.mapper';

@Component({
  selector: 'app-recipe-suggestions-page',
  imports: [Button, EmptyState, ProductCard, TipFrame],
  templateUrl: './recipe-suggestions-page.html',
  styleUrl: './recipe-suggestions-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeSuggestionsPage implements OnInit {
  private readonly router = inject(Router);

  protected readonly facade = inject(RecipeGenerationFacade);

  protected readonly emptyState = RECIPE_SUGGESTIONS_EMPTY_STATE;

  protected readonly priorityTip = RECIPE_PRIORITY_TIP;

  protected readonly icons = {
    sparkles: IconName.Sparkles,
  } as const;

  protected readonly ingredientSections = computed(() =>
    mapProductsToIngredientSections(this.facade.products()),
  );

  protected readonly hasExpandableProducts = computed(
    () => this.facade.products().length > RECIPE_COLLAPSED_PRODUCTS_COUNT,
  );

  protected readonly productsErrorTip = computed<TipFrameModel | null>(() => {
    const error = this.facade.productsError();

    if (!error) {
      return null;
    }

    return mapRecipeSuggestionsErrorTip('Unable to load ingredients', error);
  });

  protected readonly generationErrorTip = computed<TipFrameModel | null>(() => {
    const error = this.facade.generationError();

    if (!error) {
      return null;
    }

    return mapRecipeGenerationErrorTip(error, this.facade.generationErrorMessage());
  });

  protected readonly mapProductCard = mapProductToCardModel;

  ngOnInit(): void {
    this.facade.loadProducts();
  }

  protected handleEmptyAction(): void {
    void this.router.navigate(['/dashboard', 'fridge']);
  }

  protected handleGenerateRecipes(): void {
    this.facade.startGeneration();
  }
}
