import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { BaseApiService } from '../../../core/api';
import { RecipeDetail } from '../domain/recipe-detail.model';
import { SavedRecipe } from '../domain/saved-recipe.model';
import { RecipeSuggestionTaskStatus } from '../domain/recipe-suggestion-task-status.model';
import { RecipeSuggestionTask } from '../domain/recipe-suggestion-task.model';
import { RECIPE_SUGGESTION_SUCCESS_MOCK } from './mocks/recipe-suggestion-success.mock';
import { SAVED_RECIPES_MOCK } from './mocks/saved-recipes.mock';
import { RECIPE_DETAIL_MOCK } from './mocks/recipe-detail.mock';
import { RecipeDetailDto } from './recipe-detail.dto';
import { mapRecipeDetailDto } from './recipe-detail.mapper';
import { RecipeSuggestionQueuedDto } from './recipe-suggestion-queued.dto';
import {
  mapRecipeSuggestionQueuedDto,
  mapRecipeSuggestionTaskStatusDto,
} from './recipe-suggestion.mapper';
import { RecipeSuggestionTaskStatusDto } from './recipe-suggestion-task-status.dto';
import { SaveRecipeRequestDto } from './save-recipe-request.dto';
import { SaveRecipeResponseDto } from './save-recipe-response.dto';
import { SavedRecipeDto } from './saved-recipe.dto';
import { mapSavedRecipeDto } from './saved-recipe.mapper';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RecipeApiService extends BaseApiService {
  private readonly basePath = '/recipes/';

  createSuggestionTask(): Observable<RecipeSuggestionTask> {
    return this.postMapped<Record<string, never>, RecipeSuggestionQueuedDto, RecipeSuggestionTask>(
      `${this.basePath}suggestions/`,
      {},
      mapRecipeSuggestionQueuedDto,
    );
  }

  getSuggestionTaskStatus(taskId: string): Observable<RecipeSuggestionTaskStatus> {
    if (environment.mocks.recipeSuggestionSuccess) {
      return of(
        mapRecipeSuggestionTaskStatusDto({
          ...RECIPE_SUGGESTION_SUCCESS_MOCK,
          task_id: taskId,
        }),
      );
    }

    return this.getMappedRequired<RecipeSuggestionTaskStatusDto, RecipeSuggestionTaskStatus>(
      `${this.basePath}suggestions/${taskId}/`,
      mapRecipeSuggestionTaskStatusDto,
    );
  }

  getRecipe(id: number): Observable<RecipeDetail> {
    if (environment.mocks.recipeDetail && id === RECIPE_DETAIL_MOCK.id) {
      return of(RECIPE_DETAIL_MOCK);
    }

    return this.getMappedRequired<RecipeDetailDto, RecipeDetail>(
      `${this.basePath}${id}/`,
      mapRecipeDetailDto,
    );
  }

  getSavedRecipes(): Observable<SavedRecipe[]> {
    if (environment.mocks.savedRecipes) {
      return of(SAVED_RECIPES_MOCK.map(mapSavedRecipeDto));
    }

    return this.getMappedList<SavedRecipeDto, SavedRecipe>(
      `${this.basePath}saved/`,
      mapSavedRecipeDto,
    );
  }

  saveRecipe(recipeId: number): Observable<SaveRecipeResponseDto> {
    const request: SaveRecipeRequestDto = {
      recipe_id: recipeId,
    };

    return this.post<SaveRecipeRequestDto, SaveRecipeResponseDto>(`${this.basePath}save/`, request);
  }

  deleteSavedRecipe(recipeId: number): Observable<void> {
    return this.delete<void>(`${this.basePath}saved/${recipeId}/`);
  }
}
