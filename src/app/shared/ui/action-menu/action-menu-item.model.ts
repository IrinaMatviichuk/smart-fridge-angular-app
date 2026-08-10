import { IconName } from '../../../core/icons/icon-name';
import { ActionMenuItemTone } from './action-menu.types';

export interface ActionMenuItem<T extends string = string> {
  readonly id: T;
  readonly label: string;

  readonly prefixIcon?: IconName;
  readonly suffixIcon?: IconName;

  readonly tone?: ActionMenuItemTone;
  readonly disabled?: boolean;
}
