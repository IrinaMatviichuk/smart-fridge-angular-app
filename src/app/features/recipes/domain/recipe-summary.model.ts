import { RecipeImage } from './recipe-image.model';

export interface RecipeSummary {
  readonly id: number;
  readonly title: string;
  readonly ingredients: readonly string[];
  readonly prepTimeMinutes: number | null;
  readonly difficulty: 'easy' | 'medium' | 'hard' | null;
  readonly image: RecipeImage | null;
}
