import { IconName } from './icon-name';

export interface IconConfig {
  readonly name: IconName;
  readonly url: string;
}

export const ICONS: readonly IconConfig[] = [
  {
    name: IconName.Email,
    url: '/icons/auth/email.svg',
  },
  {
    name: IconName.Lock,
    url: '/icons/auth/lock.svg',
  },
  {
    name: IconName.PasswordPlaceholder,
    url: '/icons/auth/password-placeholder.svg',
  },
  {
    name: IconName.Visibility,
    url: '/icons/auth/visibility.svg',
  },
  {
    name: IconName.VisibilityOff,
    url: '/icons/auth/visibility-off.svg',
  },
  {
    name: IconName.Dashboard,
    url: '/icons/navigation/dashboard.svg',
  },
  {
    name: IconName.ShoppingList,
    url: '/icons/navigation/shopping-list.svg',
  },
  {
    name: IconName.Recipes,
    url: '/icons/navigation/recipes.svg',
  },
  {
    name: IconName.Help,
    url: '/icons/common/help.svg',
  },
  {
    name: IconName.Logout,
    url: '/icons/common/logout.svg',
  },
  {
    name: IconName.Menu,
    url: '/icons/common/menu.svg',
  },
  {
    name: IconName.Close,
    url: '/icons/common/close.svg',
  },
  {
    name: IconName.Search,
    url: '/icons/common/search.svg',
  },
  {
    name: IconName.Notification,
    url: '/icons/common/notification.svg',
  },
];
