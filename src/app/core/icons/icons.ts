import { IconName } from './icon-name';

const ICON_PATHS = {
  ai: '/icons/ai',
  analytics: '/icons/analytics',
  auth: '/icons/auth',
  common: '/icons/common',
  food: '/icons/food',
  navigation: '/icons/navigation',
} as const;

export interface IconConfig {
  readonly name: IconName;
  readonly url: string;
}

export const ICONS: readonly IconConfig[] = [
  /* =========================================================
   * AI
   * ======================================================= */
  {
    name: IconName.Cloud,
    url: `${ICON_PATHS.ai}/cloud.svg`,
  },
  {
    name: IconName.Reminder,
    url: `${ICON_PATHS.ai}/reminder.svg`,
  },
  {
    name: IconName.Sparkles,
    url: `${ICON_PATHS.ai}/sparkles.svg`,
  },

  /* =========================================================
   * Analytics
   * ======================================================= */
  {
    name: IconName.Chart,
    url: `${ICON_PATHS.analytics}/chart.svg`,
  },

  /* =========================================================
   * Authentication
   * ======================================================= */
  {
    name: IconName.Email,
    url: `${ICON_PATHS.auth}/email.svg`,
  },
  {
    name: IconName.Lock,
    url: `${ICON_PATHS.auth}/lock.svg`,
  },
  {
    name: IconName.Visibility,
    url: `${ICON_PATHS.auth}/visibility.svg`,
  },
  {
    name: IconName.VisibilityOff,
    url: `${ICON_PATHS.auth}/visibility-off.svg`,
  },

  /* =========================================================
   * Common
   * ======================================================= */
  {
    name: IconName.Add,
    url: `${ICON_PATHS.common}/add.svg`,
  },
  {
    name: IconName.Bookmark,
    url: `${ICON_PATHS.common}/bookmark.svg`,
  },
  {
    name: IconName.Calendar,
    url: `${ICON_PATHS.common}/calendar.svg`,
  },
  {
    name: IconName.Check,
    url: `${ICON_PATHS.common}/check.svg`,
  },
  {
    name: IconName.CheckCircle,
    url: `${ICON_PATHS.common}/check-circle.svg`,
  },
  {
    name: IconName.ChevronDown,
    url: `${ICON_PATHS.common}/chevron-down.svg`,
  },
  {
    name: IconName.ChevronLeft,
    url: `${ICON_PATHS.common}/chevron-left.svg`,
  },
  {
    name: IconName.Clock,
    url: `${ICON_PATHS.common}/clock.svg`,
  },
  {
    name: IconName.Close,
    url: `${ICON_PATHS.common}/close.svg`,
  },
  {
    name: IconName.Cube,
    url: `${ICON_PATHS.common}/cube.svg`,
  },
  {
    name: IconName.Favorite,
    url: `${ICON_PATHS.common}/favorite.svg`,
  },
  {
    name: IconName.FavoriteFilled,
    url: `${ICON_PATHS.common}/favorite-filled.svg`,
  },
  {
    name: IconName.Help,
    url: `${ICON_PATHS.common}/help.svg`,
  },
  {
    name: IconName.Info,
    url: `${ICON_PATHS.common}/info.svg`,
  },
  {
    name: IconName.MoreHorizontal,
    url: `${ICON_PATHS.common}/more-horizontal.svg`,
  },
  {
    name: IconName.Notification,
    url: `${ICON_PATHS.common}/notification.svg`,
  },
  {
    name: IconName.Profile,
    url: `${ICON_PATHS.common}/profile.svg`,
  },
  {
    name: IconName.Search,
    url: `${ICON_PATHS.common}/search.svg`,
  },
  {
    name: IconName.SearchOff,
    url: `${ICON_PATHS.common}/search-off.svg`,
  },
  {
    name: IconName.Users,
    url: `${ICON_PATHS.common}/users.svg`,
  },
  {
    name: IconName.Warning,
    url: `${ICON_PATHS.common}/warning.svg`,
  },

  /* =========================================================
   * Food
   * ======================================================= */
  {
    name: IconName.Basket,
    url: `${ICON_PATHS.food}/basket.svg`,
  },
  {
    name: IconName.ChefHat,
    url: `${ICON_PATHS.food}/chef-hat.svg`,
  },
  {
    name: IconName.CookingPot,
    url: `${ICON_PATHS.food}/cooking-pot.svg`,
  },
  {
    name: IconName.Freezer,
    url: `${ICON_PATHS.food}/freezer.svg`,
  },
  {
    name: IconName.Fridge,
    url: `${ICON_PATHS.food}/fridge.svg`,
  },
  {
    name: IconName.Nutrition,
    url: `${ICON_PATHS.food}/nutrition.svg`,
  },
  {
    name: IconName.Recipe,
    url: `${ICON_PATHS.food}/recipe.svg`,
  },
  {
    name: IconName.RecipeBook,
    url: `${ICON_PATHS.food}/recipe-book.svg`,
  },

  /* =========================================================
   * Navigation
   * ======================================================= */
  {
    name: IconName.Dashboard,
    url: `${ICON_PATHS.navigation}/dashboard.svg`,
  },
  {
    name: IconName.Logout,
    url: `${ICON_PATHS.navigation}/logout.svg`,
  },
  {
    name: IconName.ShoppingList,
    url: `${ICON_PATHS.navigation}/shopping-list.svg`,
  },
];
