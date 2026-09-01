import { RecipeSummaryDto } from './recipe-summary.dto';

export interface GeneratedRecipeDto extends RecipeSummaryDto {
  readonly steps: readonly string[];
}
