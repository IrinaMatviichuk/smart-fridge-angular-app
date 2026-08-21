import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconName } from '../../../../core/icons/icon-name';
import { TipFrame } from '../../../../shared/ui/tip-frame/tip-frame';
import { TipFrameModel } from '../../../../shared/ui/tip-frame/tip-frame.model';
import { RecipeFlowHeader } from '../../components/recipe-flow-header/recipe-flow-header';
import { RecipeGenerationProgress } from '../../components/recipe-generation-progress/recipe-generation-progress';
import { RECIPE_GENERATION_PROGRESS } from '../../components/recipe-generation-progress/recipe-generation-progress.config';

@Component({
  selector: 'app-recipe-pending-page',
  imports: [RecipeFlowHeader, RecipeGenerationProgress, TipFrame],
  templateUrl: './recipe-pending-page.html',
  styleUrl: './recipe-pending-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipePendingPage {
  protected readonly progress = RECIPE_GENERATION_PROGRESS;

  protected readonly tip: TipFrameModel = {
    variant: 'info',
    icon: IconName.Info,
    title: 'This usually takes just a few seconds',
    description: 'Sit tight while we do the magic!',
  };
}
