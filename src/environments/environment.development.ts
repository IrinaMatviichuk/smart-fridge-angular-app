export const environment = {
  production: false,
  mocks: {
    recipeSuggestionSuccess: true,
    savedRecipes: true,
    recipeDetail: true,
  },
  apiUrl: 'http://localhost:8000/api',
} as const;
