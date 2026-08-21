import { Routes } from '@angular/router';

import { RecipeGenerationFacade } from './application/generation/recipe-generation.facade';
import {
  generatedRecipesGuard,
  recipePendingGuard,
} from './application/generation/recipe-generation.guards';
import { RecipeGenerationStore } from './application/generation/recipe-generation.store';
import { SavedRecipesFacade } from './application/saved/saved-recipes.facade';
import { SavedRecipesStore } from './application/saved/saved-recipes.store';

export const RECIPES_ROUTES: Routes = [
  {
    path: '',
    providers: [
      RecipeGenerationStore,
      RecipeGenerationFacade,
      SavedRecipesStore,
      SavedRecipesFacade,
    ],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'suggestions',
      },
      {
        path: '',
        loadComponent: () =>
          import('./layouts/recipes-browse-layout/recipes-browse-layout').then(
            ({ RecipesBrowseLayout }) => RecipesBrowseLayout,
          ),
        children: [
          {
            path: 'suggestions',
            loadComponent: () =>
              import('./pages/recipe-suggestions-page/recipe-suggestions-page').then(
                ({ RecipeSuggestionsPage }) => RecipeSuggestionsPage,
              ),
          },
          {
            path: 'saved',
            loadComponent: () =>
              import('./pages/saved-recipes-page/saved-recipes-page').then(
                ({ SavedRecipesPage }) => SavedRecipesPage,
              ),
          },
        ],
      },
      {
        path: 'pending',
        canActivate: [recipePendingGuard],
        loadComponent: () =>
          import('./pages/recipe-pending-page/recipe-pending-page').then(
            ({ RecipePendingPage }) => RecipePendingPage,
          ),
      },
      {
        path: 'generated',
        canActivate: [generatedRecipesGuard],
        loadComponent: () =>
          import('./pages/generated-recipes-page/generated-recipes-page').then(
            ({ GeneratedRecipesPage }) => GeneratedRecipesPage,
          ),
      },
      {
        path: 'detail/:id',
        loadComponent: () =>
          import('./pages/recipe-detail-page/recipe-detail-page').then(
            ({ RecipeDetailPage }) => RecipeDetailPage,
          ),
      },
    ],
  },
];
