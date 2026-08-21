export const RECIPE_SUGGESTION_STATUSES = ['PENDING', 'RETRY', 'SUCCESS', 'FAILURE'] as const;

export type RecipeSuggestionStatus = (typeof RECIPE_SUGGESTION_STATUSES)[number];

export const isRecipeSuggestionStatus = (value: string): value is RecipeSuggestionStatus =>
  RECIPE_SUGGESTION_STATUSES.some((status) => status === value);
