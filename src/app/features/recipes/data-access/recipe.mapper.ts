import { Recipe } from '../domain/recipe.model';
import { RecipeDto } from './recipe.dto';

export const mapRecipeDto = (dto: RecipeDto): Recipe => ({
  id: dto.id,
  title: dto.title,
  ingredients: dto.ingredients,
  steps: dto.steps,
  createdAt: dto.created_at,
});
