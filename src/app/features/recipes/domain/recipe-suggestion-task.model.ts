import { RecipeSuggestionStatus } from './recipe-suggestion-status.type';

export interface RecipeSuggestionTask {
  readonly taskId: string;
  readonly status: RecipeSuggestionStatus;
  readonly message: string;
}
