import { Injectable, computed, signal } from '@angular/core';

import { Recipe } from '../../domain/recipe.model';

@Injectable()
export class SavedRecipesStore {
  private readonly recipesState = signal<readonly Recipe[]>([]);

  private readonly loadingState = signal(false);

  private readonly errorState = signal<string | null>(null);

  private readonly actionErrorState = signal<string | null>(null);

  private readonly mutatingRecipeIdsState = signal<ReadonlySet<number>>(new Set());

  readonly recipes = this.recipesState.asReadonly();

  readonly loading = this.loadingState.asReadonly();

  readonly error = this.errorState.asReadonly();

  readonly actionError = this.actionErrorState.asReadonly();

  readonly hasRecipes = computed(() => this.recipesState().length > 0);

  setRecipes(recipes: readonly Recipe[]): void {
    this.recipesState.set(recipes);
  }

  setLoading(loading: boolean): void {
    this.loadingState.set(loading);
  }

  setError(error: string | null): void {
    this.errorState.set(error);
  }

  setActionError(error: string | null): void {
    this.actionErrorState.set(error);
  }

  addRecipe(recipe: Recipe): void {
    this.recipesState.update((recipes) => {
      const alreadySaved = recipes.some((item) => item.id === recipe.id);

      if (alreadySaved) {
        return recipes;
      }

      return [...recipes, recipe];
    });
  }

  removeRecipe(recipeId: number): void {
    this.recipesState.update((recipes) => recipes.filter((recipe) => recipe.id !== recipeId));
  }

  hasRecipe(recipeId: number): boolean {
    return this.recipesState().some((recipe) => recipe.id === recipeId);
  }

  isMutating(recipeId: number): boolean {
    return this.mutatingRecipeIdsState().has(recipeId);
  }

  setMutating(recipeId: number, mutating: boolean): void {
    this.mutatingRecipeIdsState.update((recipeIds) => {
      const nextRecipeIds = new Set(recipeIds);

      if (mutating) {
        nextRecipeIds.add(recipeId);
      } else {
        nextRecipeIds.delete(recipeId);
      }

      return nextRecipeIds;
    });
  }

  reset(): void {
    this.recipesState.set([]);
    this.loadingState.set(false);
    this.errorState.set(null);
    this.actionErrorState.set(null);
    this.mutatingRecipeIdsState.set(new Set());
  }
}
