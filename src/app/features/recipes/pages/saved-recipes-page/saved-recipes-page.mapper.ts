import { IconName } from '../../../../core/icons/icon-name';
import { TipFrameModel } from '../../../../shared/ui/tip-frame/tip-frame.model';

export const mapSavedRecipesErrorTip = (message: string): TipFrameModel => ({
  variant: 'error',
  icon: IconName.Warning,
  title: 'Unable to load liked recipes',
  description: message,
});

export const mapSavedRecipeActionErrorTip = (message: string): TipFrameModel => ({
  variant: 'error',
  icon: IconName.Warning,
  title: 'Unable to update recipe',
  description: message,
});
