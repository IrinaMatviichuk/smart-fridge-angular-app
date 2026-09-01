export interface RecipeSummary {
  readonly id: number;
  readonly title: string;
  readonly ingredients: readonly string[];
  readonly prepTimeMinutes: number;
  readonly difficulty: string;
  readonly image: string;
}
