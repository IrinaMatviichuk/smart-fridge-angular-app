import { RecipeImage } from './recipe-image.model';

export interface RecipeDetail {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly image: RecipeImage | null;
  readonly prepTimeMinutes: number | null;
  readonly difficulty: 'easy' | 'medium' | 'hard' | null;
  readonly servings: number | null;
  readonly ingredients: readonly string[];
  readonly steps: readonly string[];
  readonly createdAt: string;
}
