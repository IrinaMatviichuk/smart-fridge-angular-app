import { IconName } from '../../../core/icons/icon-name';
import { TipFrameVariant } from './tip-frame-variant.type';

export interface TipFrameModel {
  readonly variant: TipFrameVariant;
  readonly icon: IconName;
  readonly title: string;
  readonly description: string;
}
