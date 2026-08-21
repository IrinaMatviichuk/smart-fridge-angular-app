import { IconName } from '../../../../core/icons/icon-name';
import { TipFrameModel } from '../../../../shared/ui/tip-frame/tip-frame.model';

export const mapRecipeDetailErrorTip = (message: string): TipFrameModel => ({
  variant: 'error',
  icon: IconName.Warning,
  title: 'Unable to load recipe',
  description: message,
});

export const mapRecipeDetailActionErrorTip = (message: string): TipFrameModel => ({
  variant: 'error',
  icon: IconName.Warning,
  title: 'Unable to update recipe',
  description: message,
});
