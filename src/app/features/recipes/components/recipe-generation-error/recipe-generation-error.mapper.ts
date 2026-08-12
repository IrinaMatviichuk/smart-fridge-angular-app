import { IconName } from '../../../../core/icons/icon-name';
import { TipFrameModel } from '../../../../shared/ui/tip-frame/tip-frame.model';
import { RecipeGenerationError } from '../../domain/recipe-generation-error.type';

const RECIPE_GENERATION_ERROR_TIPS: Readonly<
  Record<Exclude<RecipeGenerationError, 'unknown'>, TipFrameModel>
> = {
  'daily-limit': {
    variant: 'error',
    icon: IconName.Warning,
    title: 'Daily limit reached',
    description:
      'You’ve used all recipe generations for today. Come back later to get more recipe ideas.',
  },

  'service-unavailable': {
    variant: 'warning',
    icon: IconName.Warning,
    title: 'AI temporarily unavailable',
    description: 'Our AI service is currently unavailable. Please try again in a few minutes.',
  },
};

export const mapRecipeGenerationErrorTip = (
  error: RecipeGenerationError,
  fallbackMessage: string | null,
): TipFrameModel => {
  if (error !== 'unknown') {
    return RECIPE_GENERATION_ERROR_TIPS[error];
  }

  return {
    variant: 'error',
    icon: IconName.Warning,
    title: 'Unable to generate recipes',
    description: fallbackMessage ?? 'An unexpected error occurred. Please try again later.',
  };
};
