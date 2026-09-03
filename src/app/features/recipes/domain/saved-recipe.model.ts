import { RecipeImage } from './recipe-image.model';

export interface SavedRecipe {
  readonly id: number;
  readonly savedId: number;
  readonly title: string;
  readonly ingredients: readonly string[];
  readonly steps: readonly string[];
  readonly createdAt: string;
  readonly prepTimeMinutes: number | null;
  readonly difficulty: 'easy' | 'medium' | 'hard' | null;
  readonly image: RecipeImage | null;
}
