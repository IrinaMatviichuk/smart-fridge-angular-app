import { IconName } from '../../core/icons/icon-name';
import { MainSidebarNavigationItem } from './main-sidebar-navigation-item.model';

export const MAIN_SIDEBAR_NAVIGATION_ITEMS: readonly MainSidebarNavigationItem[] = [
  {
    label: 'Dashboard',
    route: '/dashboard',
    icon: IconName.Dashboard,
    exact: false,
  },
  {
    label: 'Shopping List',
    route: '/shopping-list',
    icon: IconName.ShoppingList,
    exact: false,
  },
  {
    label: 'Recipes',
    route: '/recipes',
    icon: IconName.Recipe,
    exact: false,
  },
];
