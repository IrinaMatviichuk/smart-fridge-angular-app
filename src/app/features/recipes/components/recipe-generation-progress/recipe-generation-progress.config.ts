import { IconName } from '../../../../core/icons/icon-name';
import { RecipeGenerationProgressModel } from './recipe-generation-progress.model';

export const RECIPE_GENERATION_PROGRESS: RecipeGenerationProgressModel = {
  title: 'Finding the perfect recipes...',
  steps: [
    {
      icon: IconName.Cloud,
      title: 'Analyzing your ingredients',
      description: 'Checking what you have in your inventory',
    },
    {
      icon: IconName.Sparkles,
      title: 'Generating recipe ideas',
      description: 'Our AI is creating tasty options',
    },
    {
      icon: IconName.Clock,
      title: 'Prioritizing expiring products',
      description: 'Focusing on ingredients that expire soon',
    },
  ],
};
