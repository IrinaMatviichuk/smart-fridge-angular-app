import { Injectable, computed, signal } from '@angular/core';

import { Product } from '../../../entities/product/domain/product.model';
import { RecipeGenerationError } from '../domain/recipe-generation-error.type';
import { Recipe } from '../domain/recipe.model';

@Injectable()
export class RecipesStore {
  private readonly availableProductsState = signal<readonly Product[]>([]);

  private readonly productsLoadingState = signal(false);

  private readonly productsErrorState = signal<string | null>(null);

  private readonly ingredientsExpandedState = signal(false);

  private readonly generatedRecipesState = signal<readonly Recipe[]>([]);

  private readonly generatingState = signal(false);

  private readonly generationErrorState = signal<RecipeGenerationError | null>(null);

  private readonly generationErrorMessageState = signal<string | null>(null);

  private readonly savedRecipesState = signal<readonly Recipe[]>([]);

  private readonly savedLoadingState = signal(false);

  private readonly savedErrorState = signal<string | null>(null);

  readonly availableProducts = this.availableProductsState.asReadonly();

  readonly productsLoading = this.productsLoadingState.asReadonly();

  readonly productsError = this.productsErrorState.asReadonly();

  readonly ingredientsExpanded = this.ingredientsExpandedState.asReadonly();

  readonly generatedRecipes = this.generatedRecipesState.asReadonly();

  readonly generating = this.generatingState.asReadonly();

  readonly generationError = this.generationErrorState.asReadonly();

  readonly generationErrorMessage = this.generationErrorMessageState.asReadonly();

  readonly savedRecipes = this.savedRecipesState.asReadonly();

  readonly savedLoading = this.savedLoadingState.asReadonly();

  readonly savedError = this.savedErrorState.asReadonly();

  readonly hasAvailableProducts = computed(() => this.availableProductsState().length > 0);

  readonly hasGeneratedRecipes = computed(() => this.generatedRecipesState().length > 0);

  readonly hasSavedRecipes = computed(() => this.savedRecipesState().length > 0);

  setAvailableProducts(products: readonly Product[]): void {
    this.availableProductsState.set(products);
  }

  setProductsLoading(loading: boolean): void {
    this.productsLoadingState.set(loading);
  }

  setProductsError(error: string | null): void {
    this.productsErrorState.set(error);
  }

  toggleIngredientsExpanded(): void {
    this.ingredientsExpandedState.update((expanded) => !expanded);
  }

  setGeneratedRecipes(recipes: readonly Recipe[]): void {
    this.generatedRecipesState.set(recipes);
  }

  setGenerating(generating: boolean): void {
    this.generatingState.set(generating);
  }

  setGenerationError(error: RecipeGenerationError | null, message: string | null = null): void {
    this.generationErrorState.set(error);

    this.generationErrorMessageState.set(message);
  }

  clearGenerationError(): void {
    this.generationErrorState.set(null);

    this.generationErrorMessageState.set(null);
  }

  setSavedRecipes(recipes: readonly Recipe[]): void {
    this.savedRecipesState.set(recipes);
  }

  setSavedLoading(loading: boolean): void {
    this.savedLoadingState.set(loading);
  }

  setSavedError(error: string | null): void {
    this.savedErrorState.set(error);
  }

  addSavedRecipe(recipe: Recipe): void {
    this.savedRecipesState.update((recipes) => {
      const alreadySaved = recipes.some((item) => item.id === recipe.id);

      if (alreadySaved) {
        return recipes;
      }

      return [...recipes, recipe];
    });
  }

  removeSavedRecipeByRecipeId(recipeId: number): void {
    this.savedRecipesState.update((recipes) => recipes.filter((recipe) => recipe.id !== recipeId));
  }

  reset(): void {
    this.availableProductsState.set([]);
    this.productsLoadingState.set(false);
    this.productsErrorState.set(null);

    this.ingredientsExpandedState.set(false);

    this.generatedRecipesState.set([]);
    this.generatingState.set(false);

    this.generationErrorState.set(null);
    this.generationErrorMessageState.set(null);

    this.savedRecipesState.set([]);
    this.savedLoadingState.set(false);
    this.savedErrorState.set(null);
  }
}
