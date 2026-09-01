import { RecipeImageDto } from './recipe-image.dto';

/** The current GET /recipes/{id}/ response. */
export interface RecipeDetailDto {
  readonly id: number;
  readonly title: string;
  readonly ingredients: readonly string[];
  readonly steps: readonly string[];
  readonly prep_time_minutes: number | null;
  readonly difficulty: 'easy' | 'medium' | 'hard' | null;
  readonly image: RecipeImageDto | null;
  readonly created_at: string;
}
