import { RecipeSummary } from './recipe-summary.model';

export interface RecipeSuggestionPendingTaskStatus {
  readonly taskId: string;
  readonly status: 'PENDING' | 'RETRY';
}

export interface RecipeSuggestionSuccessTaskStatus {
  readonly taskId: string;
  readonly status: 'SUCCESS';
  readonly recipes: readonly RecipeSummary[];
}

export interface RecipeSuggestionFailureTaskStatus {
  readonly taskId: string;
  readonly status: 'FAILURE';
  readonly error: string;
}

export type RecipeSuggestionTaskStatus =
  | RecipeSuggestionPendingTaskStatus
  | RecipeSuggestionSuccessTaskStatus
  | RecipeSuggestionFailureTaskStatus;
