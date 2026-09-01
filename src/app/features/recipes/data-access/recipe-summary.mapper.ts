import { RecipeSummary } from '../domain/recipe-summary.model';
import { mapRecipeImageDto } from './recipe-image.mapper';
import { RecipeSummaryDto } from './recipe-summary.dto';

export const mapRecipeSummaryDto = (dto: RecipeSummaryDto): RecipeSummary => ({
  id: dto.id,
  title: dto.title,
  ingredients: dto.ingredients,
  prepTimeMinutes: dto.prep_time_minutes,
  difficulty: dto.difficulty,
  image: mapRecipeImageDto(dto.image),
});
