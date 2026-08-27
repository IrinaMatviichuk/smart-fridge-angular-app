import { RecipeSuggestionTaskStatusDto } from '../recipe-suggestion-task-status.dto';

export const RECIPE_SUGGESTION_SUCCESS_MOCK: RecipeSuggestionTaskStatusDto = {
  task_id: '81ac2ff7-43ec-4c20-bc43-32bdf0a9a014',
  status: 'SUCCESS',
  result: {
    recipes: [
      {
        title: 'Cheesy Potato Scramble',
        ingredients_used: ['eggs', 'potatoes', 'cheese'],
        missing_ingredients: ['salt', 'pepper', 'cooking oil'],
        instructions: [
          'Peel and dice potatoes. Boil them until tender, then drain.',
          'Heat cooking oil in a pan. Add the boiled potatoes and fry until lightly browned. Season with salt and pepper.',
          'In a bowl, whisk eggs with a pinch of salt and pepper.',
          'Pour the whisked eggs over the potatoes in the pan. Cook, stirring occasionally, until eggs are nearly set.',
          'Sprinkle cheese over the egg and potato mixture. Cover the pan briefly to melt the cheese.',
          'Serve hot.',
        ],
        prep_time_minutes: 20,
      },
      {
        title: 'Potato & Cheese Frittata',
        ingredients_used: ['eggs', 'potatoes', 'cheese'],
        missing_ingredients: ['salt', 'pepper', 'cooking oil'],
        instructions: [
          'Peel and slice the potatoes.',
          'Cook the potatoes until tender.',
          'Whisk the eggs and season with salt and pepper.',
          'Combine the potatoes with the eggs in a pan.',
          'Add cheese and cook until the eggs are set.',
          'Serve warm.',
        ],
        prep_time_minutes: 25,
      },
      {
        title: 'Crispy Cheesy Potatoes',
        ingredients_used: ['potatoes', 'cheese'],
        missing_ingredients: ['salt', 'pepper', 'cooking oil'],
        instructions: [
          'Peel and cut the potatoes into small pieces.',
          'Heat cooking oil in a pan.',
          'Cook the potatoes until golden and crispy.',
          'Season with salt and pepper.',
          'Add cheese and allow it to melt.',
          'Serve hot.',
        ],
        prep_time_minutes: 30,
      },
    ],
  },
};
