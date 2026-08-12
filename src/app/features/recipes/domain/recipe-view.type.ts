export const RECIPE_VIEWS = ['suggestions', 'saved'] as const;

export type RecipeView = (typeof RECIPE_VIEWS)[number];

export const isRecipeView = (value: string | null): value is RecipeView =>
  value !== null && RECIPE_VIEWS.some((view) => view === value);
