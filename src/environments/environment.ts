export const environment = {
  production: true,
  mocks: {
    recipeSuggestionSuccess: false,
    savedRecipes: false,
    recipeDetail: false,
  },
  apiUrl: 'https://smart-fridge-api-4m5a.onrender.com/api',
} as const;
