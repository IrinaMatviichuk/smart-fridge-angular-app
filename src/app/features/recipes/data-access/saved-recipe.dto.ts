import { RecipeImageDto } from './recipe-image.dto';

export interface SavedRecipeDto {
  readonly id: number;
  readonly title: string;
  readonly ingredients: readonly string[];
  readonly steps: readonly string[];
  readonly created_at: string;
  readonly prep_time_minutes: number | null;
  readonly difficulty: 'easy' | 'medium' | 'hard' | null;
  readonly image: RecipeImageDto | null;
}
