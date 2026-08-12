import { IconName } from '../../../../core/icons/icon-name';
import { TipFrameModel } from '../../../../shared/ui/tip-frame/tip-frame.model';

export const mapRecipesErrorTip = (title: string, message: string): TipFrameModel => ({
  variant: 'error',
  icon: IconName.Warning,
  title,
  description: message,
});
