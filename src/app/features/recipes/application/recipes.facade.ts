import { HttpErrorResponse } from '@angular/common/http';
import { DestroyRef, Injectable, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  Observable,
  Subscription,
  catchError,
  finalize,
  map,
  of,
  tap,
  throwError,
  timer,
} from 'rxjs';

import { resolveApiErrorMessage } from '../../../core/api';
import { ProductApiService } from '../../../entities/product/data-access/product-api.service';
import { Product } from '../../../entities/product/domain/product.model';
import { RecipeApiService } from '../data-access/recipe-api.service';
import { Recipe } from '../domain/recipe.model';
import { RECIPES_GENERATION_ERROR_DURATION_MS } from './recipes.config';
import { RECIPES_ERROR_MESSAGES } from './recipes-errors.constants';
import { RecipesStore } from './recipes.store';

@Injectable()
export class RecipesFacade {
  private readonly store = inject(RecipesStore);

  private readonly recipeApi = inject(RecipeApiService);

  private readonly productApi = inject(ProductApiService);

  private readonly destroyRef = inject(DestroyRef);

  private generationErrorTimer: Subscription | null = null;

  readonly availableProducts = this.store.availableProducts;

  readonly productsLoading = this.store.productsLoading;

  readonly productsError = this.store.productsError;

  readonly ingredientsExpanded = this.store.ingredientsExpanded;

  readonly hasAvailableProducts = this.store.hasAvailableProducts;

  readonly generatedRecipes = this.store.generatedRecipes;

  readonly generating = this.store.generating;

  readonly generationError = this.store.generationError;

  readonly generationErrorMessage = this.store.generationErrorMessage;

  readonly hasGeneratedRecipes = this.store.hasGeneratedRecipes;

  readonly savedRecipes = this.store.savedRecipes;

  readonly savedLoading = this.store.savedLoading;

  readonly savedError = this.store.savedError;

  readonly hasSavedRecipes = this.store.hasSavedRecipes;

  loadAvailableProducts(): void {
    if (this.productsLoading()) {
      return;
    }

    this.store.setProductsLoading(true);
    this.store.setProductsError(null);

    this.productApi
      .getProducts({
        storage: 'fridge',
      })
      .pipe(
        catchError((error: unknown) => {
          if (error instanceof HttpErrorResponse && error.status === 404) {
            return of([] as readonly Product[]);
          }

          this.store.setProductsError(
            resolveApiErrorMessage(error, RECIPES_ERROR_MESSAGES.products),
          );

          return of([] as readonly Product[]);
        }),
        finalize(() => {
          this.store.setProductsLoading(false);
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((products) => {
        this.store.setAvailableProducts(products);
      });
  }

  toggleIngredientsExpanded(): void {
    this.store.toggleIngredientsExpanded();
  }

  generateRecipes(): void {
    if (this.generating()) {
      return;
    }

    this.cancelGenerationErrorTimer();

    this.store.setGenerating(true);
    this.store.clearGenerationError();

    this.recipeApi
      .generateRecipes()
      .pipe(
        catchError((error: unknown) => {
          this.handleGenerationError(error);

          return of([] as readonly Recipe[]);
        }),
        finalize(() => {
          this.store.setGenerating(false);
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((recipes) => {
        if (this.generationError() !== null) {
          return;
        }

        this.store.setGeneratedRecipes(recipes);
      });
  }

  loadSavedRecipes(): void {
    if (this.savedLoading()) {
      return;
    }

    this.store.setSavedLoading(true);
    this.store.setSavedError(null);

    this.recipeApi
      .getSavedRecipes()
      .pipe(
        catchError((error: unknown) => {
          this.store.setSavedRecipes([]);

          this.store.setSavedError(resolveApiErrorMessage(error, RECIPES_ERROR_MESSAGES.saved));

          return of([] as readonly Recipe[]);
        }),
        finalize(() => {
          this.store.setSavedLoading(false);
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((recipes) => {
        this.store.setSavedRecipes(recipes);
      });
  }

  saveRecipe(recipe: Recipe): Observable<void> {
    return this.recipeApi.saveRecipe(recipe.id).pipe(
      tap(() => {
        this.store.addSavedRecipe(recipe);
      }),
      map(() => undefined),
      catchError((error: unknown) => {
        if (error instanceof HttpErrorResponse && error.status === 400) {
          this.store.addSavedRecipe(recipe);

          return of(undefined);
        }

        return throwError(() => error);
      }),
    );
  }

  deleteSavedRecipe(savedRecipeId: number): Observable<void> {
    return this.recipeApi.deleteSavedRecipe(savedRecipeId);
  }

  clearGenerationError(): void {
    this.cancelGenerationErrorTimer();

    this.store.clearGenerationError();
  }

  reset(): void {
    this.cancelGenerationErrorTimer();

    this.store.reset();
  }

  private handleGenerationError(error: unknown): void {
    if (error instanceof HttpErrorResponse) {
      if (error.status === 429) {
        this.store.setGenerationError('daily-limit');

        this.scheduleGenerationErrorDismiss();

        return;
      }

      if (error.status === 503) {
        this.store.setGenerationError('service-unavailable');

        this.scheduleGenerationErrorDismiss();

        return;
      }
    }

    this.store.setGenerationError(
      'unknown',
      resolveApiErrorMessage(error, RECIPES_ERROR_MESSAGES.generate),
    );

    this.scheduleGenerationErrorDismiss();
  }

  private scheduleGenerationErrorDismiss(): void {
    this.cancelGenerationErrorTimer();

    this.generationErrorTimer = timer(RECIPES_GENERATION_ERROR_DURATION_MS)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.store.clearGenerationError();

        this.generationErrorTimer = null;
      });
  }

  private cancelGenerationErrorTimer(): void {
    this.generationErrorTimer?.unsubscribe();

    this.generationErrorTimer = null;
  }
}
