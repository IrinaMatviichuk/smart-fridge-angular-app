import { RecipeDetail } from '../../domain/recipe-detail.model';

export const RECIPE_DETAIL_MOCK: RecipeDetail = {
  id: 42,
  title: 'Cheesy Potato Scramble',
  description:
    'A hearty breakfast skillet with golden potatoes, fluffy eggs, and melted cheese. It is quick to prepare and perfect for a relaxed morning.',
  image: {
    url: 'https://images.unsplash.com/photo-1525351484163-7529414344d8',
    unsplashUrl: 'https://unsplash.com/photos/photo-1525351484163-7529414344d8',
    photographerName: 'Joseph Gonzalez',
    photographerUrl: 'https://unsplash.com/@miracletwentyone',
  },
  prepTimeMinutes: 30,
  difficulty: 'easy',
  servings: 2,
  ingredients: [
    '2 medium potatoes, diced',
    '4 eggs',
    '1 cup shredded cheese',
    '1 tablespoon cooking oil',
    'Salt and pepper to taste',
  ],
  steps: [
    'Heat the cooking oil in a large skillet over medium heat.',
    'Add the diced potatoes and cook until tender and golden, stirring occasionally.',
    'Whisk the eggs with salt and pepper, then pour them over the potatoes.',
    'Cook gently, folding the eggs as they set, then sprinkle over the cheese.',
    'Remove from the heat when the cheese has melted and serve immediately.',
  ],
  createdAt: '2026-08-25T10:14:00Z',
};
