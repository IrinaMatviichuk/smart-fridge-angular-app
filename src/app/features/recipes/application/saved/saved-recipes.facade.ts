import { DestroyRef, Injectable, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EMPTY, Subscription, catchError, finalize, map, of, tap, timer } from 'rxjs';

import { resolveApiErrorMessage } from '../../../../core/api';
import { RecipeApiService } from '../../data-access/recipe-api.service';
import { RecipeDetail } from '../../domain/recipe-detail.model';
import { RecipeSummary } from '../../domain/recipe-summary.model';
import { SavedRecipe } from '../../domain/saved-recipe.model';
import { SAVED_RECIPE_ACTION_ERROR_DURATION_MS } from './saved-recipes.config';
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

  private actionErrorTimer: Subscription | null = null;

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

          return of([] as readonly SavedRecipe[]);
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

  toggleSaved(recipe: RecipeDetail | RecipeSummary | SavedRecipe): void {
    if (this.isMutating(recipe.id)) {
      return;
    }

    this.clearActionError();
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
            if (this.isSavedRecipe(recipe)) {
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

          this.scheduleActionErrorDismiss();

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
    this.cancelActionErrorTimer();

    this.store.setActionError(null);
  }

  reset(): void {
    this.cancelActionErrorTimer();

    this.store.reset();
  }

  private scheduleActionErrorDismiss(): void {
    this.cancelActionErrorTimer();

    this.actionErrorTimer = timer(SAVED_RECIPE_ACTION_ERROR_DURATION_MS)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.store.setActionError(null);

        this.actionErrorTimer = null;
      });
  }

  private cancelActionErrorTimer(): void {
    this.actionErrorTimer?.unsubscribe();

    this.actionErrorTimer = null;
  }

  private isSavedRecipe(
    recipe: RecipeDetail | RecipeSummary | SavedRecipe,
  ): recipe is RecipeDetail | SavedRecipe {
    return 'prepTimeMinutes' in recipe && 'steps' in recipe;
  }
}
