import { Recipe } from './recipe.model';

export interface SavedRecipe {
  readonly savedRecipeId: number;
  readonly recipe: Recipe;
}
