import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { RecipeGenerationFacade } from './recipe-generation.facade';

export const recipePendingGuard: CanActivateFn = () => {
  const facade = inject(RecipeGenerationFacade);
  const router = inject(Router);

  if (facade.taskId() && facade.generationPending()) {
    return true;
  }

  return router.createUrlTree(['/recipes', 'suggestions']);
};

export const generatedRecipesGuard: CanActivateFn = () => {
  const facade = inject(RecipeGenerationFacade);
  const router = inject(Router);

  if (facade.hasGeneratedRecipes()) {
    return true;
  }

  return router.createUrlTree(['/recipes', 'suggestions']);
};
