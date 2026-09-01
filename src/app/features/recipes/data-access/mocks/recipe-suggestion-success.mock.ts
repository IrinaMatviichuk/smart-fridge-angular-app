import { RecipeSuggestionTaskStatusDto } from '../recipe-suggestion-task-status.dto';

const image = (
  photoId: string,
  photographerName: string | null,
  photographerUrl: string | null,
) => ({
  url: `https://images.unsplash.com/${photoId}`,
  unsplash_url: `https://unsplash.com/photos/${photoId}`,
  download_location: `https://api.unsplash.com/photos/${photoId}/download`,
  photographer_name: photographerName,
  photographer_url: photographerUrl,
});

export const RECIPE_SUGGESTION_SUCCESS_MOCK: RecipeSuggestionTaskStatusDto = {
  task_id: '81ac2ff7-43ec-4c20-bc43-32bdf0a9a014',
  status: 'SUCCESS',
  result: {
    recipes: [
      {
        id: 42,
        title: 'Cheesy Potato Scramble',
        ingredients: ['eggs', 'potatoes', 'cheese', 'salt', 'pepper', 'cooking oil'],
        steps: ['Cook the potatoes until golden.', 'Add whisked eggs and cheese, then scramble.'],
        prep_time_minutes: 30,
        difficulty: 'easy',
        image: image(
          'photo-1525351484163-7529414344d8',
          'Joseph Gonzalez',
          'https://unsplash.com/@miracletwentyone',
        ),
      },
      {
        id: 43,
        title: 'Potato & Cheese Frittata',
        ingredients: ['eggs', 'potatoes', 'cheese', 'salt', 'pepper', 'cooking oil'],
        steps: [
          'Cook the potatoes in an oven-safe pan.',
          'Add eggs and cheese and bake until set.',
        ],
        prep_time_minutes: 40,
        difficulty: 'medium',
        image: image(
          'photo-1565299507177-b0ac66763828',
          'Mock Food Photographer',
          'https://unsplash.com/@mock-food-photographer',
        ),
      },
      {
        id: 44,
        title: 'Crispy Cheesy Potatoes',
        ingredients: ['potatoes', 'cheese', 'salt', 'pepper', 'cooking oil'],
        steps: ['Roast seasoned potatoes until crisp.', 'Top with cheese and bake until melted.'],
        prep_time_minutes: 35,
        difficulty: 'easy',
        image: image('photo-1518013431117-eb1465fa5752', 'Mock Kitchen Studio', null),
      },
      {
        id: 45,
        title: 'Tomato Cheese Omelette',
        ingredients: ['eggs', 'tomatoes', 'cheese', 'butter'],
        steps: ['Cook the tomatoes in butter.', 'Add eggs and cheese, fold, and serve.'],
        prep_time_minutes: 15,
        difficulty: 'easy',
        image: image(
          'photo-1510693206972-df098062cb71',
          'Mock Breakfast Studio',
          'https://unsplash.com/@mock-breakfast-studio',
        ),
      },
      {
        id: 46,
        title: 'Creamy Tomato Pasta',
        ingredients: ['tomatoes', 'pasta', 'milk', 'cheese'],
        steps: ['Cook the pasta.', 'Prepare the tomato sauce and combine with cheese.'],
        prep_time_minutes: 25,
        difficulty: 'medium',
        image: image('photo-1473093295043-cdd812d0e601', null, null),
      },
      {
        id: 47,
        title: 'Golden Potato Omelette',
        ingredients: ['eggs', 'potatoes', 'butter', 'cheese'],
        steps: ['Cook sliced potatoes in butter.', 'Add eggs and cheese and cook until golden.'],
        prep_time_minutes: 20,
        difficulty: 'easy',
        image: null,
      },
    ],
  },
};
