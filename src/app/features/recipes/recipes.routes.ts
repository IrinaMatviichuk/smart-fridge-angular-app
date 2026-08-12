import { Routes } from '@angular/router';

export const RECIPES_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'suggestions',
  },
  {
    path: ':view',
    loadComponent: () =>
      import('./pages/recipes-page/recipes-page').then(({ RecipesPage }) => RecipesPage),
  },
];
