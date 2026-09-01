export interface RecipeSummaryDto {
  readonly id: number;
  readonly title: string;
  readonly ingredients: readonly string[];
  readonly prep_time_minutes: number;
  readonly difficulty: string;
  readonly image: string;
}
