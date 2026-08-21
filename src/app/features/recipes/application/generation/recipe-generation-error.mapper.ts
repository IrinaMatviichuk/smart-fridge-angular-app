import { HttpErrorResponse } from '@angular/common/http';

import { resolveApiErrorMessage } from '../../../../core/api';
import { RecipeGenerationError } from '../../domain/recipe-generation-error.type';
import { RECIPE_GENERATION_ERROR_MESSAGES } from './recipe-generation-errors.constants';

export interface RecipeGenerationErrorModel {
  readonly type: RecipeGenerationError;
  readonly message: string | null;
}

export const mapRecipeGenerationError = (error: unknown): RecipeGenerationErrorModel => {
  if (error instanceof HttpErrorResponse) {
    switch (error.status) {
      case 429:
        return {
          type: 'daily-limit',
          message: null,
        };

      case 503:
        return {
          type: 'service-unavailable',
          message: null,
        };
    }
  }

  return {
    type: 'unknown',
    message: resolveApiErrorMessage(error, RECIPE_GENERATION_ERROR_MESSAGES.generate),
  };
};
