export interface GeneratedRecipeDto {
  readonly title: string;
  readonly ingredients_used: readonly string[];
  readonly missing_ingredients: readonly string[];
  readonly instructions: readonly string[];
  readonly prep_time_minutes: number;
}
