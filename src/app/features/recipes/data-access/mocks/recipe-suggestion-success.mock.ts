import { RecipeSuggestionTaskStatusDto } from '../recipe-suggestion-task-status.dto';

export const RECIPE_SUGGESTION_SUCCESS_MOCK: RecipeSuggestionTaskStatusDto = {
  task_id: '81ac2ff7-43ec-4c20-bc43-32bdf0a9a014',
  status: 'SUCCESS',
  result: {
    recipes: [
      {
        id: 42,
        title: 'Cheesy Potato Scramble',
        ingredients: ['eggs', 'potatoes', 'cheese', 'salt', 'pepper', 'cooking oil'],
        prep_time_minutes: 30,
        difficulty: 'Easy',
        image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8',
      },
      {
        id: 43,
        title: 'Potato & Cheese Frittata',
        ingredients: ['eggs', 'potatoes', 'cheese', 'salt', 'pepper', 'cooking oil'],
        prep_time_minutes: 40,
        difficulty: 'Medium',
        image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828',
      },
      {
        id: 44,
        title: 'Crispy Cheesy Potatoes',
        ingredients: ['potatoes', 'cheese', 'salt', 'pepper', 'cooking oil'],
        prep_time_minutes: 35,
        difficulty: 'Easy',
        image: 'https://images.unsplash.com/photo-1518013431117-eb1465fa5752',
      },
    ],
  },
};
