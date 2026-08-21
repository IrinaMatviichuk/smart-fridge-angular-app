import { HttpErrorResponse } from '@angular/common/http';
import { DestroyRef, Injectable, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { EMPTY, Subscription, catchError, exhaustMap, finalize, of, takeWhile, timer } from 'rxjs';

import { resolveApiErrorMessage } from '../../../../core/api';
import { ProductApiService } from '../../../../entities/product/data-access/product-api.service';
import { Product } from '../../../../entities/product/domain/product.model';
import { RecipeApiService } from '../../data-access/recipe-api.service';
import { RecipeSuggestionTaskStatus } from '../../domain/recipe-suggestion-task-status.model';
import { RecipeSuggestionTask } from '../../domain/recipe-suggestion-task.model';
import { Recipe } from '../../domain/recipe.model';
import {
  RECIPE_GENERATION_FEEDBACK_DURATION_MS,
  RECIPE_GENERATION_POLL_INTERVAL_MS,
} from './recipe-generation.config';
import { mapRecipeGenerationError } from './recipe-generation-error.mapper';
import { RECIPE_GENERATION_ERROR_MESSAGES } from './recipe-generation-errors.constants';
import { RecipeGenerationStore } from './recipe-generation.store';

@Injectable()
export class RecipeGenerationFacade {
  private readonly store = inject(RecipeGenerationStore);

  private readonly recipeApi = inject(RecipeApiService);

  private readonly productApi = inject(ProductApiService);

  private readonly router = inject(Router);

  private readonly destroyRef = inject(DestroyRef);

  private generationErrorTimer: Subscription | null = null;

  private priorityTipTimer: Subscription | null = null;

  private pollingSubscription: Subscription | null = null;

  readonly products = this.store.products;

  readonly productsLoading = this.store.productsLoading;

  readonly productsError = this.store.productsError;

  readonly hasProducts = this.store.hasProducts;

  readonly ingredientsExpanded = this.store.ingredientsExpanded;

  readonly priorityTipVisible = this.store.priorityTipVisible;

  readonly taskId = this.store.taskId;

  readonly taskStatus = this.store.taskStatus;

  readonly generationPending = this.store.generationPending;

  readonly generatedRecipes = this.store.generatedRecipes;

  readonly hasGeneratedRecipes = this.store.hasGeneratedRecipes;

  readonly generating = this.store.generating;

  readonly generationError = this.store.generationError;

  readonly generationErrorMessage = this.store.generationErrorMessage;

  loadProducts(): void {
    if (this.productsLoading()) {
      return;
    }

    this.store.setProductsLoading(true);
    this.store.setProductsError(null);

    this.productApi
      .getProducts()
      .pipe(
        catchError((error: unknown) => {
          if (error instanceof HttpErrorResponse && error.status === 404) {
            return of([] as readonly Product[]);
          }

          this.store.setProductsError(
            resolveApiErrorMessage(error, RECIPE_GENERATION_ERROR_MESSAGES.products),
          );

          return of([] as readonly Product[]);
        }),
        finalize(() => {
          this.store.setProductsLoading(false);
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((products) => {
        this.store.setProducts(products);
      });
  }

  toggleIngredientsExpanded(): void {
    const willExpand = !this.ingredientsExpanded();

    this.store.toggleIngredientsExpanded();

    if (!willExpand) {
      this.hidePriorityTip();

      return;
    }

    if (this.hasExpiringSoonProducts()) {
      this.showPriorityTip();
    }
  }

  startGeneration(): void {
    if (this.generating() || this.generationPending()) {
      return;
    }

    this.cancelGenerationErrorTimer();
    this.cancelPolling();
    this.hidePriorityTip();

    this.store.resetGeneration();
    this.store.setGenerating(true);

    this.recipeApi
      .createSuggestionTask()
      .pipe(
        catchError((error: unknown) => {
          this.handleGenerationError(error);

          return EMPTY;
        }),
        finalize(() => {
          this.store.setGenerating(false);
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((task: RecipeSuggestionTask) => {
        this.store.setTask(task.taskId, task.status);

        void this.router.navigate(['/recipes', 'pending']);

        this.startPolling(task.taskId);
      });
  }

  findGeneratedRecipe(recipeId: number): Recipe | null {
    return this.generatedRecipes().find((recipe) => recipe.id === recipeId) ?? null;
  }

  clearGeneratedRecipes(): void {
    this.store.setGeneratedRecipes([]);
  }

  clearGenerationError(): void {
    this.cancelGenerationErrorTimer();

    this.store.clearGenerationError();
  }

  reset(): void {
    this.cancelGenerationErrorTimer();
    this.cancelPriorityTipTimer();
    this.cancelPolling();

    this.store.reset();
  }

  private startPolling(taskId: string): void {
    this.cancelPolling();

    this.pollingSubscription = timer(0, RECIPE_GENERATION_POLL_INTERVAL_MS)
      .pipe(
        exhaustMap(() => this.recipeApi.getSuggestionTaskStatus(taskId)),

        catchError((error: unknown) => {
          this.handleGenerationError(error);

          void this.router.navigate(['/recipes', 'suggestions']);

          return EMPTY;
        }),

        takeWhile((response) => response.status === 'PENDING' || response.status === 'RETRY', true),

        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: (response) => {
          this.handlePollingResponse(response);
        },

        complete: () => {
          this.pollingSubscription = null;
        },
      });
  }

  private handlePollingResponse(response: RecipeSuggestionTaskStatus): void {
    this.store.setTaskStatus(response.status);

    switch (response.status) {
      case 'PENDING':
      case 'RETRY':
        return;

      case 'SUCCESS':
        this.handleTaskSuccess(response.recipes);

        return;

      case 'FAILURE':
        this.handleTaskFailure(response.error);

        return;
    }
  }

  private handleTaskSuccess(recipes: readonly Recipe[]): void {
    this.store.setGeneratedRecipes(recipes);

    void this.router.navigate(['/recipes', 'generated']);
  }

  private handleTaskFailure(message: string): void {
    this.store.setGenerationError('unknown', message);

    this.scheduleGenerationErrorDismiss();

    void this.router.navigate(['/recipes', 'suggestions']);
  }

  private hasExpiringSoonProducts(): boolean {
    return this.products().some((product) => product.status === 'expiring-soon');
  }

  private showPriorityTip(): void {
    this.cancelPriorityTipTimer();

    this.store.setPriorityTipVisible(true);

    this.priorityTipTimer = timer(RECIPE_GENERATION_FEEDBACK_DURATION_MS)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.store.setPriorityTipVisible(false);

        this.priorityTipTimer = null;
      });
  }

  private hidePriorityTip(): void {
    this.cancelPriorityTipTimer();

    this.store.setPriorityTipVisible(false);
  }

  private handleGenerationError(error: unknown): void {
    const generationError = mapRecipeGenerationError(error);

    this.store.setGenerationError(generationError.type, generationError.message);

    this.scheduleGenerationErrorDismiss();
  }

  private scheduleGenerationErrorDismiss(): void {
    this.cancelGenerationErrorTimer();

    this.generationErrorTimer = timer(RECIPE_GENERATION_FEEDBACK_DURATION_MS)
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

  private cancelPriorityTipTimer(): void {
    this.priorityTipTimer?.unsubscribe();

    this.priorityTipTimer = null;
  }

  private cancelPolling(): void {
    this.pollingSubscription?.unsubscribe();

    this.pollingSubscription = null;
  }
}
