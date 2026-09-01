export const environment = {
  production: false,
  mocks: {
    recipeSuggestionSuccess: true,
    savedRecipes: true,
  },
  apiUrl: 'http://localhost:8000/api',
} as const;
