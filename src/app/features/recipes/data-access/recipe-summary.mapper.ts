import { RecipeSummary } from '../domain/recipe-summary.model';
import { RecipeSummaryDto } from './recipe-summary.dto';

export const mapRecipeSummaryDto = (dto: RecipeSummaryDto): RecipeSummary => ({
  id: dto.id,
  title: dto.title,
  ingredients: dto.ingredients,
  prepTimeMinutes: dto.prep_time_minutes,
  difficulty: dto.difficulty,
  image: dto.image,
});
