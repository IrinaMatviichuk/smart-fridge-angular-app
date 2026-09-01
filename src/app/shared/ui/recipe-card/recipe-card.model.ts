export interface RecipeCardModel {
  readonly id: number;
  readonly title: string;
  readonly image: string;
  readonly ingredients: readonly string[];
  readonly prepTimeMinutes: number;
  readonly difficulty: string;
  readonly favorite: boolean;
  readonly favoritePending: boolean;
}
