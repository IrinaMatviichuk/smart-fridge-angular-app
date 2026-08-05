export const IconName = {
  Email: 'email',
  Lock: 'lock',
  PasswordPlaceholder: 'password-placeholder',
  Visibility: 'visibility',
  VisibilityOff: 'visibility-off',

  Dashboard: 'dashboard',
  ShoppingList: 'shopping-list',
  Recipes: 'recipes',

  Help: 'help',
  Logout: 'logout',
  Menu: 'menu',
  Close: 'close',
  Search: 'search',
  Notification: 'notification',
} as const;

export type IconName = (typeof IconName)[keyof typeof IconName];
