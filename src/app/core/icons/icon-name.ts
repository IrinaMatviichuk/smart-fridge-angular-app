export const IconName = {
  /* =========================================================
   * AI
   * ======================================================= */
  Cloud: 'cloud',
  Reminder: 'reminder',
  Sparkles: 'sparkles',

  /* =========================================================
   * Analytics
   * ======================================================= */

  Chart: 'chart',

  /* =========================================================
   * Authentication
   * ======================================================= */

  Email: 'email',
  Lock: 'lock',
  Visibility: 'visibility',
  VisibilityOff: 'visibility-off',

  /* =========================================================
   * Common
   * ======================================================= */

  Add: 'add',
  Bookmark: 'bookmark',
  Calendar: 'calendar',
  Check: 'check',
  CheckCircle: 'check-circle',
  ChevronDown: 'chevron-down',
  ChevronLeft: 'chevron-left',
  Clock: 'clock',
  Close: 'close',
  Cube: 'cube',
  Favorite: 'favorite',
  FavoriteFilled: 'favorite-filled',
  Help: 'help',
  Info: 'info',
  MoreHorizontal: 'more-horizontal',
  Notification: 'notification',
  Profile: 'profile',
  Search: 'search',
  SearchOff: 'search-off',
  Users: 'users',
  Warning: 'warning',

  /* =========================================================
   * Food
   * ======================================================= */
  Basket: 'basket',
  ChefHat: 'chef-hat',
  CookingPot: 'cooking-pot',
  Freezer: 'freezer',
  Fridge: 'fridge',
  Nutrition: 'nutrition',
  Recipe: 'recipe',
  RecipeBook: 'recipe-book',

  /* =========================================================
   * Navigation
   * ======================================================= */
  Dashboard: 'dashboard',
  Logout: 'logout',
  ShoppingList: 'shopping-list',
} as const;

export type IconName = (typeof IconName)[keyof typeof IconName];
