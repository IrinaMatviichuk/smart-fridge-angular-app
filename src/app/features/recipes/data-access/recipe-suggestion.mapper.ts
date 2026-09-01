import { RecipeSuggestionTaskStatus } from '../domain/recipe-suggestion-task-status.model';
import { RecipeSuggestionTask } from '../domain/recipe-suggestion-task.model';
import { isRecipeSuggestionStatus } from '../domain/recipe-suggestion-status.type';
import { mapRecipeSummaryDto } from './recipe-summary.mapper';
import { RecipeSuggestionQueuedDto } from './recipe-suggestion-queued.dto';
import { RecipeSuggestionTaskStatusDto } from './recipe-suggestion-task-status.dto';

export const mapRecipeSuggestionQueuedDto = (
  dto: RecipeSuggestionQueuedDto,
): RecipeSuggestionTask => {
  if (!isRecipeSuggestionStatus(dto.status)) {
    throw new Error(`Unsupported recipe suggestion status: ${dto.status}`);
  }

  return {
    taskId: dto.task_id,
    status: dto.status,
    message: dto.message,
  };
};

export const mapRecipeSuggestionTaskStatusDto = (
  dto: RecipeSuggestionTaskStatusDto,
): RecipeSuggestionTaskStatus => {
  if (!isRecipeSuggestionStatus(dto.status)) {
    throw new Error(`Unsupported recipe suggestion status: ${dto.status}`);
  }

  switch (dto.status) {
    case 'PENDING':
    case 'RETRY':
      return {
        taskId: dto.task_id,
        status: dto.status,
      };

    case 'SUCCESS':
      if (!dto.result) {
        throw new Error('Recipe suggestion task completed without a result.');
      }

      return {
        taskId: dto.task_id,
        status: 'SUCCESS',
        recipes: dto.result.recipes.map(mapRecipeSummaryDto),
      };

    case 'FAILURE':
      return {
        taskId: dto.task_id,
        status: 'FAILURE',
        error: dto.error ?? 'Unable to generate recipes.',
      };
  }
};
