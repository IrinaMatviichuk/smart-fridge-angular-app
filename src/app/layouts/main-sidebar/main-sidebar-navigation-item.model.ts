import { IconName } from '../../core/icons/icon-name';

export interface MainSidebarNavigationItem {
  readonly label: string;
  readonly route: string;
  readonly icon: IconName;
  readonly exact: boolean;
}
