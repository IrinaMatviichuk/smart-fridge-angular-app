import { Recipe } from '../domain/recipe.model';
import { mapRecipeImageDto } from './recipe-image.mapper';
import { RecipeDto } from './recipe.dto';

export const mapRecipeDto = (dto: RecipeDto): Recipe => ({
  id: dto.id,
  title: dto.title,
  ingredients: dto.ingredients,
  steps: dto.steps,
  prepTimeMinutes: dto.prep_time_minutes,
  difficulty: dto.difficulty,
  image: mapRecipeImageDto(dto.image),
  createdAt: dto.created_at,
});
