import { RecipeSummaryDto } from './recipe-summary.dto';

export interface GeneratedRecipesDto {
  readonly recipes: readonly RecipeSummaryDto[];
}
