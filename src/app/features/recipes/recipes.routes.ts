import { Routes } from '@angular/router';

export const RECIPES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/recipes-page/recipes-page').then(({ RecipesPage }) => RecipesPage),
  },
];
