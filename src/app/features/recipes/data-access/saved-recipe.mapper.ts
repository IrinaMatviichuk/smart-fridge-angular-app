import { SavedRecipe } from '../domain/saved-recipe.model';
import { mapRecipeImageDto } from './recipe-image.mapper';
import { SavedRecipeDto } from './saved-recipe.dto';

export const mapSavedRecipeDto = (dto: SavedRecipeDto): SavedRecipe => ({
  id: dto.id,
  title: dto.title,
  ingredients: dto.ingredients,
  steps: dto.steps,
  createdAt: dto.created_at,
  prepTimeMinutes: dto.prep_time_minutes,
  difficulty: dto.difficulty,
  image: mapRecipeImageDto(dto.image),
});
