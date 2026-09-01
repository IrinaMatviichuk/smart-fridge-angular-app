import { RecipeImageDto } from '../recipe-image.dto';
import { SavedRecipeDto } from '../saved-recipe.dto';

const image = (
  photoId: string,
  photographerName: string | null,
  photographerUrl: string | null,
): RecipeImageDto => ({
  url: `https://images.unsplash.com/${photoId}`,
  unsplash_url: `https://unsplash.com/photos/${photoId}`,
  download_location: `https://api.unsplash.com/photos/${photoId}/download`,
  photographer_name: photographerName,
  photographer_url: photographerUrl,
});

export const SAVED_RECIPES_MOCK: readonly SavedRecipeDto[] = [
  {
    id: 42,
    title: 'Cheesy Potato Scramble',
    ingredients: ['eggs', 'potatoes', 'cheese', 'salt', 'pepper', 'cooking oil'],
    steps: ['Cook the potatoes until golden.', 'Add whisked eggs and cheese, then scramble.'],
    created_at: '2026-08-25T10:14:00Z',
    prep_time_minutes: 30,
    difficulty: 'easy',
    image: image(
      'photo-1525351484163-7529414344d8',
      'Joseph Gonzalez',
      'https://unsplash.com/@miracletwentyone',
    ),
  },
  {
    id: 101,
    title: 'Chicken Alfredo',
    ingredients: ['Chicken', 'Milk', 'Butter'],
    steps: ['Cook the chicken and pasta.', 'Prepare the sauce and combine.'],
    created_at: '2026-08-25T10:15:00Z',
    prep_time_minutes: 25,
    difficulty: 'medium',
    image: image(
      'photo-1645112411341-6c4fd023714a',
      'Mock Pasta Studio',
      'https://unsplash.com/@mock-pasta-studio',
    ),
  },
  {
    id: 102,
    title: 'Scrambled Eggs',
    ingredients: ['Eggs', 'Butter', 'Milk'],
    steps: ['Whisk the eggs with milk.', 'Cook gently in butter while stirring.'],
    created_at: '2026-08-26T08:30:00Z',
    prep_time_minutes: 8,
    difficulty: 'easy',
    image: image(
      'photo-1525351484163-7529414344d8',
      'Joseph Gonzalez',
      'https://unsplash.com/@miracletwentyone',
    ),
  },
  {
    id: 103,
    title: 'Tomato Pasta',
    ingredients: ['Tomatoes', 'Pasta', 'Cheese'],
    steps: ['Cook the pasta.', 'Make the tomato sauce and combine with cheese.'],
    created_at: '2026-08-27T18:45:00Z',
    prep_time_minutes: 18,
    difficulty: 'easy',
    image: image('photo-1473093295043-cdd812d0e601', null, null),
  },
  {
    id: 104,
    title: 'Tomato Soup',
    ingredients: ['Tomatoes', 'Milk', 'Butter'],
    steps: ['Simmer the tomatoes.', 'Blend with milk and butter until smooth.'],
    created_at: '2026-08-28T12:00:00Z',
    prep_time_minutes: 20,
    difficulty: 'easy',
    image: null,
  },
  {
    id: 105,
    title: 'Cheese Omelette',
    ingredients: ['Eggs', 'Cheese', 'Butter'],
    steps: ['Whisk the eggs.', 'Cook in butter, add cheese, and fold.'],
    created_at: '2026-08-29T07:50:00Z',
    prep_time_minutes: 10,
    difficulty: 'easy',
    image: image(
      'photo-1510693206972-df098062cb71',
      'Mock Breakfast Studio',
      'https://unsplash.com/@mock-breakfast-studio',
    ),
  },
  {
    id: 106,
    title: 'Creamy Chicken Pasta',
    ingredients: ['Chicken', 'Pasta', 'Milk'],
    steps: ['Cook the chicken and pasta.', 'Combine with a creamy sauce.'],
    created_at: '2026-08-30T17:20:00Z',
    prep_time_minutes: 30,
    difficulty: 'medium',
    image: image(
      'photo-1621996346565-e3dbc646d9a9',
      'Mock Food Photographer',
      'https://unsplash.com/@mock-food-photographer',
    ),
  },
];
