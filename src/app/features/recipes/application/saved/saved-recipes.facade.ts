import { DestroyRef, Injectable, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EMPTY, catchError, finalize, map, of, tap } from 'rxjs';

import { resolveApiErrorMessage } from '../../../../core/api';
import { RecipeApiService } from '../../data-access/recipe-api.service';
import { Recipe } from '../../domain/recipe.model';
import { RecipeSummary } from '../../domain/recipe-summary.model';
import { SavedRecipesStore } from './saved-recipes.store';

const SAVED_RECIPES_ERROR_MESSAGES = {
  load: {
    defaultMessage: 'Unable to load saved recipes.',
    connectionErrorMessage: 'Unable to connect to the server.',
  },

  save: {
    defaultMessage: 'Unable to save recipe.',
    connectionErrorMessage: 'Unable to connect to the server.',
  },

  remove: {
    defaultMessage: 'Unable to remove recipe from saved recipes.',
    connectionErrorMessage: 'Unable to connect to the server.',
  },
} as const;

@Injectable()
export class SavedRecipesFacade {
  private readonly store = inject(SavedRecipesStore);

  private readonly recipeApi = inject(RecipeApiService);

  private readonly destroyRef = inject(DestroyRef);

  readonly recipes = this.store.recipes;

  readonly loading = this.store.loading;

  readonly error = this.store.error;

  readonly actionError = this.store.actionError;

  readonly hasRecipes = this.store.hasRecipes;

  load(): void {
    if (this.loading()) {
      return;
    }

    this.store.setLoading(true);
    this.store.setError(null);

    this.recipeApi
      .getSavedRecipes()
      .pipe(
        catchError((error: unknown) => {
          this.store.setError(resolveApiErrorMessage(error, SAVED_RECIPES_ERROR_MESSAGES.load));

          return of([] as readonly Recipe[]);
        }),
        finalize(() => {
          this.store.setLoading(false);
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((recipes) => {
        this.store.setRecipes(recipes);
      });
  }

  isSaved(recipeId: number): boolean {
    return this.store.hasRecipe(recipeId);
  }

  isMutating(recipeId: number): boolean {
    return this.store.isMutating(recipeId);
  }

  toggleSaved(recipe: Recipe | RecipeSummary): void {
    if (this.isMutating(recipe.id)) {
      return;
    }

    this.store.setActionError(null);
    this.store.setMutating(recipe.id, true);

    const saved = this.isSaved(recipe.id);

    const request$ = saved
      ? this.recipeApi.deleteSavedRecipe(recipe.id).pipe(
          tap(() => {
            this.store.removeRecipe(recipe.id);
          }),
        )
      : this.recipeApi.saveRecipe(recipe.id).pipe(
          tap(() => {
            if (this.isRecipe(recipe)) {
              this.store.addRecipe(recipe);
            } else {
              this.store.addSavedRecipeId(recipe.id);
            }
          }),
          map(() => undefined),
        );

    request$
      .pipe(
        catchError((error: unknown) => {
          this.store.setActionError(
            resolveApiErrorMessage(
              error,
              saved ? SAVED_RECIPES_ERROR_MESSAGES.remove : SAVED_RECIPES_ERROR_MESSAGES.save,
            ),
          );

          return EMPTY;
        }),
        finalize(() => {
          this.store.setMutating(recipe.id, false);
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }

  clearActionError(): void {
    this.store.setActionError(null);
  }

  reset(): void {
    this.store.reset();
  }

  private isRecipe(recipe: Recipe | RecipeSummary): recipe is Recipe {
    return 'steps' in recipe;
  }
}
