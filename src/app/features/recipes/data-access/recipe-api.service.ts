import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BaseApiService } from '../../../core/api';
import { Recipe } from '../domain/recipe.model';
import { GeneratedRecipesDto } from './generated-recipes.dto';
import { RecipeDto } from './recipe.dto';
import { mapRecipeDto } from './recipe.mapper';
import { SaveRecipeRequestDto } from './save-recipe-request.dto';
import { SaveRecipeResponseDto } from './save-recipe-response.dto';
import { SavedRecipeDto } from './saved-recipe.dto';

@Injectable({
  providedIn: 'root',
})
export class RecipeApiService extends BaseApiService {
  private readonly basePath = '/recipes/';

  generateRecipes(): Observable<Recipe[]> {
    return this.postMapped<Record<string, never>, GeneratedRecipesDto, Recipe[]>(
      `${this.basePath}generate/`,
      {},
      (dto) => dto.recipes.map(mapRecipeDto),
    );
  }

  saveRecipe(recipeId: number): Observable<SaveRecipeResponseDto> {
    const request: SaveRecipeRequestDto = {
      recipe_id: recipeId,
    };

    return this.post<SaveRecipeRequestDto, SaveRecipeResponseDto>(`${this.basePath}save/`, request);
  }

  getSavedRecipes(): Observable<Recipe[]> {
    return this.getMappedList<SavedRecipeDto, Recipe>(`${this.basePath}saved/`, mapRecipeDto);
  }

  deleteSavedRecipe(savedRecipeId: number): Observable<void> {
    return this.delete<void>(`${this.basePath}saved/${savedRecipeId}/`);
  }

  getRecipe(id: number): Observable<Recipe> {
    return this.getMappedRequired<RecipeDto, Recipe>(`${this.basePath}${id}/`, mapRecipeDto);
  }
}
