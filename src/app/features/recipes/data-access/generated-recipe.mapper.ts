import { GeneratedRecipe } from '../domain/generated-recipe.model';
import { GeneratedRecipeDto } from './generated-recipe.dto';

export const mapGeneratedRecipeDto = (dto: GeneratedRecipeDto): GeneratedRecipe => ({
  title: dto.title,
  ingredientsUsed: dto.ingredients_used,
  missingIngredients: dto.missing_ingredients,
  instructions: dto.instructions,
  prepTimeMinutes: dto.prep_time_minutes,
});
