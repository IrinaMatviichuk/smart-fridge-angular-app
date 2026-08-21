import { GeneratedRecipesDto } from './generated-recipes.dto';

export interface RecipeSuggestionTaskStatusDto {
  readonly task_id: string;
  readonly status: string;

  readonly result?: GeneratedRecipesDto;

  readonly error?: string;
}
