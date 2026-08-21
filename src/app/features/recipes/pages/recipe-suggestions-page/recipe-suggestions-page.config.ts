import { IconName } from '../../../../core/icons/icon-name';
import { EmptyStateModel } from '../../../../shared/ui/empty-state/empty-state.model';
import { TipFrameModel } from '../../../../shared/ui/tip-frame/tip-frame.model';

export const RECIPE_SUGGESTIONS_EMPTY_STATE: EmptyStateModel = {
  imageUrl: '/images/empty-states/empty_recipes_suggestions.png',
  imageAlt: 'No ingredients available',
  title: 'No ingredients found',
  description:
    'Go to your Dashboard and add some ingredients to get personalized recipe suggestions.',
  actionLabel: 'Go to Dashboard',
};

export const RECIPE_PRIORITY_TIP: TipFrameModel = {
  variant: 'info',
  icon: IconName.Info,
  title: 'AI will prioritize ingredients that are expiring soon',
  description: "We'll help reduce food waste and save you time.",
};

export const RECIPE_COLLAPSED_PRODUCTS_COUNT = 4;
