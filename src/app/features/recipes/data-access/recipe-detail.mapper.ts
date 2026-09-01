import { RecipeDetail } from '../domain/recipe-detail.model';
import { RecipeDetailDto } from './recipe-detail.dto';
import { mapRecipeImageDto } from './recipe-image.mapper';

export const mapRecipeDetailDto = (dto: RecipeDetailDto): RecipeDetail => ({
  id: dto.id,
  title: dto.title,
  // Temporary UI normalization until these fields are added to the backend detail response.
  description: '',
  servings: null,
  ingredients: dto.ingredients,
  steps: dto.steps,
  prepTimeMinutes: dto.prep_time_minutes,
  difficulty: dto.difficulty,
  image: mapRecipeImageDto(dto.image),
  createdAt: dto.created_at,
});
