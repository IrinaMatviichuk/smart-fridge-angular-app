import { Recipe } from '../domain/recipe.model';
import { SavedRecipeDto } from './saved-recipe.dto';

export const mapSavedRecipeDto = (dto: SavedRecipeDto): Recipe => ({
  id: dto.id,
  title: dto.title,
  ingredients: dto.ingredients,
  steps: dto.steps,
  createdAt: dto.created_at,
});
