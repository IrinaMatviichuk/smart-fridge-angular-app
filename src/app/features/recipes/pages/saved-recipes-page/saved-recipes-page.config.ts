import { IconName } from '../../../../core/icons/icon-name';
import { EmptyStateModel } from '../../../../shared/ui/empty-state/empty-state.model';
import { TipFrameModel } from '../../../../shared/ui/tip-frame/tip-frame.model';

export const SAVED_RECIPES_EMPTY_STATE: EmptyStateModel = {
  imageUrl: '/images/empty-states/empty_liked_recipes_screen.png',
  imageAlt: 'No saved recipes',
  title: 'No recipes yet',
  description:
    'Go to your Dashboard, add some ingredients to get personalized recipe suggestions from our AI helper.',
  actionLabel: 'Go to Dashboard',
};

export const SAVED_RECIPES_INFO_TIP: TipFrameModel = {
  variant: 'info',
  icon: IconName.Info,
  title: 'Tip',
  description: 'Saved recipes are always here for you. You can unsave them anytime.',
};
