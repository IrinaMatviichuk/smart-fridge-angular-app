export interface SavedRecipe {
  readonly id: number;
  readonly title: string;
  readonly ingredients: readonly string[];
  readonly steps: readonly string[];
  readonly createdAt: string;
  readonly prepTimeMinutes: number;
  readonly difficulty: string;
  readonly image: string;
}
