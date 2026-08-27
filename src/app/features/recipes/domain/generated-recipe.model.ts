export interface GeneratedRecipe {
  readonly title: string;
  readonly ingredientsUsed: readonly string[];
  readonly missingIngredients: readonly string[];
  readonly instructions: readonly string[];
  readonly prepTimeMinutes: number;
}
