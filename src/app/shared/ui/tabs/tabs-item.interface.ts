import { IconName } from '../../../core/icons/icon-name';

export interface TabsItem<T extends string = string> {
  readonly value: T;
  readonly label: string;
  readonly icon?: IconName;
  readonly disabled?: boolean;
}
