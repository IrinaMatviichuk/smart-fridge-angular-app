import { Injectable, computed, signal } from '@angular/core';

import { Product } from '../../../../entities/product/domain/product.model';
import { RecipeGenerationError } from '../../domain/recipe-generation-error.type';
import { RecipeSuggestionStatus } from '../../domain/recipe-suggestion-status.type';
import { Recipe } from '../../domain/recipe.model';

@Injectable()
export class RecipeGenerationStore {
  private readonly productsState = signal<readonly Product[]>([]);

  private readonly productsLoadingState = signal(false);

  private readonly productsErrorState = signal<string | null>(null);

  private readonly ingredientsExpandedState = signal(false);

  private readonly priorityTipVisibleState = signal(false);

  private readonly taskIdState = signal<string | null>(null);

  private readonly taskStatusState = signal<RecipeSuggestionStatus | null>(null);

  private readonly generatedRecipesState = signal<readonly Recipe[]>([]);

  private readonly generatingState = signal(false);

  private readonly generationErrorState = signal<RecipeGenerationError | null>(null);

  private readonly generationErrorMessageState = signal<string | null>(null);

  readonly products = this.productsState.asReadonly();

  readonly productsLoading = this.productsLoadingState.asReadonly();

  readonly productsError = this.productsErrorState.asReadonly();

  readonly ingredientsExpanded = this.ingredientsExpandedState.asReadonly();

  readonly priorityTipVisible = this.priorityTipVisibleState.asReadonly();

  readonly taskId = this.taskIdState.asReadonly();

  readonly taskStatus = this.taskStatusState.asReadonly();

  readonly generatedRecipes = this.generatedRecipesState.asReadonly();

  readonly generating = this.generatingState.asReadonly();

  readonly generationError = this.generationErrorState.asReadonly();

  readonly generationErrorMessage = this.generationErrorMessageState.asReadonly();

  readonly hasProducts = computed(() => this.productsState().length > 0);

  readonly hasGeneratedRecipes = computed(() => this.generatedRecipesState().length > 0);

  readonly generationPending = computed(() => {
    const status = this.taskStatusState();

    return status === 'PENDING' || status === 'RETRY';
  });

  setProducts(products: readonly Product[]): void {
    this.productsState.set(products);
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

  setPriorityTipVisible(visible: boolean): void {
    this.priorityTipVisibleState.set(visible);
  }

  setTask(taskId: string, status: RecipeSuggestionStatus): void {
    this.taskIdState.set(taskId);
    this.taskStatusState.set(status);
  }

  setTaskStatus(status: RecipeSuggestionStatus): void {
    this.taskStatusState.set(status);
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

  resetGeneration(): void {
    this.taskIdState.set(null);
    this.taskStatusState.set(null);
    this.generatedRecipesState.set([]);
    this.generatingState.set(false);
    this.generationErrorState.set(null);
    this.generationErrorMessageState.set(null);
  }

  reset(): void {
    this.productsState.set([]);
    this.productsLoadingState.set(false);
    this.productsErrorState.set(null);

    this.ingredientsExpandedState.set(false);
    this.priorityTipVisibleState.set(false);

    this.resetGeneration();
  }
}
