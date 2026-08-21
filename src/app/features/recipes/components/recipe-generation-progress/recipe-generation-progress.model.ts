import { IconName } from '../../../../core/icons/icon-name';

export interface RecipeGenerationProgressStepModel {
  readonly icon: IconName;
  readonly title: string;
  readonly description: string;
}

export interface RecipeGenerationProgressModel {
  readonly title: string;
  readonly steps: readonly RecipeGenerationProgressStepModel[];
}
