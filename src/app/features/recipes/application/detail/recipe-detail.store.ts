import { Injectable, signal } from '@angular/core';

import { RecipeDetail } from '../../domain/recipe-detail.model';

@Injectable()
export class RecipeDetailStore {
  private readonly recipeState = signal<RecipeDetail | null>(null);

  private readonly loadingState = signal(false);

  private readonly errorState = signal<string | null>(null);

  readonly recipe = this.recipeState.asReadonly();

  readonly loading = this.loadingState.asReadonly();

  readonly error = this.errorState.asReadonly();

  setRecipe(recipe: RecipeDetail | null): void {
    this.recipeState.set(recipe);
  }

  setLoading(loading: boolean): void {
    this.loadingState.set(loading);
  }

  setError(error: string | null): void {
    this.errorState.set(error);
  }

  reset(): void {
    this.recipeState.set(null);
    this.loadingState.set(false);
    this.errorState.set(null);
  }
}
