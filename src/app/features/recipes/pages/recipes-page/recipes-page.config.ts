import { IconName } from '../../../../core/icons/icon-name';
import { EmptyStateModel } from '../../../../shared/ui/empty-state/empty-state.model';
import { TabsItem } from '../../../../shared/ui/tabs/tabs-item.interface';
import { RecipeView } from '../../domain/recipe-view.type';

export const RECIPES_TABS: readonly TabsItem<RecipeView>[] = [
  {
    value: 'suggestions',
    label: 'Suggestions',
    icon: IconName.Reminder,
  },
  {
    value: 'saved',
    label: 'Liked Recipes',
    icon: IconName.FavoriteFilled,
  },
];

export const RECIPES_EMPTY_INGREDIENTS_STATE: EmptyStateModel = {
  imageUrl: '/images/empty-states/empty_recipes_suggestions.png',
  imageAlt: 'No ingredients available',
  title: 'No ingredients found',
  description:
    'Go to your Dashboard and add some ingredients to get personalized recipe suggestions.',
  actionLabel: 'Go to Dashboard',
};

export const RECIPES_EMPTY_SAVED_STATE: EmptyStateModel = {
  imageUrl: '/images/empty-states/empty_liked_recipes_screen.png',
  imageAlt: 'No saved recipes',
  title: 'No recipes yet',
  description:
    'Go to your Dashboard, add some ingredients to get personalized recipe suggestions from our AI helper.',
  actionLabel: 'Go to Dashboard',
};

export const RECIPES_COLLAPSED_PRODUCTS_COUNT = 4;
