import { RecipeImage } from '../../../features/recipes/domain/recipe-image.model';

export interface RecipeCardModel {
  readonly id: number;
  readonly title: string;
  readonly image: RecipeImage | null;
  readonly ingredients: readonly string[];
  readonly prepTimeMinutes: number | null;
  readonly difficulty: 'easy' | 'medium' | 'hard' | null;
  readonly favorite: boolean;
  readonly favoritePending: boolean;
}
