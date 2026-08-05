import { Routes } from '@angular/router';

import { authGuard } from './features/auth/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.routes').then(({ AUTH_ROUTES }) => AUTH_ROUTES),
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./layouts/main-layout/main-layout').then(({ MainLayout }) => MainLayout),
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./features/dashboard/dashboard.routes').then(
            ({ DASHBOARD_ROUTES }) => DASHBOARD_ROUTES,
          ),
      },
      {
        path: 'shopping-list',
        loadChildren: () =>
          import('./features/shopping-list/shopping-list.routes').then(
            ({ SHOPPING_LIST_ROUTES }) => SHOPPING_LIST_ROUTES,
          ),
      },
      {
        path: 'recipes',
        loadChildren: () =>
          import('./features/recipes/recipes.routes').then(({ RECIPES_ROUTES }) => RECIPES_ROUTES),
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
    ],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth/login',
  },
  {
    path: '**',
    redirectTo: 'auth/login',
  },
];
