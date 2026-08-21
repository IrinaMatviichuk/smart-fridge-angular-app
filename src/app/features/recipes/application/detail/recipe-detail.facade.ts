import { DestroyRef, Injectable, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EMPTY, catchError, finalize } from 'rxjs';

import { resolveApiErrorMessage } from '../../../../core/api';
import { RecipeGenerationFacade } from '../generation/recipe-generation.facade';
import { RecipeApiService } from '../../data-access/recipe-api.service';
import { RecipeDetailStore } from './recipe-detail.store';

const RECIPE_DETAIL_ERROR_MESSAGES = {
  defaultMessage: 'Unable to load recipe.',
  connectionErrorMessage: 'Unable to connect to the server.',
} as const;

@Injectable()
export class RecipeDetailFacade {
  private readonly store = inject(RecipeDetailStore);

  private readonly generationFacade = inject(RecipeGenerationFacade);

  private readonly recipeApi = inject(RecipeApiService);

  private readonly destroyRef = inject(DestroyRef);

  readonly recipe = this.store.recipe;

  readonly loading = this.store.loading;

  readonly error = this.store.error;

  load(recipeId: number): void {
    const generatedRecipe = this.generationFacade.findGeneratedRecipe(recipeId);

    if (generatedRecipe) {
      this.store.setError(null);
      this.store.setRecipe(generatedRecipe);

      return;
    }

    if (this.loading()) {
      return;
    }

    this.store.setLoading(true);
    this.store.setError(null);
    this.store.setRecipe(null);

    this.recipeApi
      .getRecipe(recipeId)
      .pipe(
        catchError((error: unknown) => {
          this.store.setError(resolveApiErrorMessage(error, RECIPE_DETAIL_ERROR_MESSAGES));

          return EMPTY;
        }),
        finalize(() => {
          this.store.setLoading(false);
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((recipe) => {
        this.store.setRecipe(recipe);
      });
  }

  reset(): void {
    this.store.reset();
  }
}
