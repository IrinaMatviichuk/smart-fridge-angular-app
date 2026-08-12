import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { RecipeGenerationProgressModel } from './recipe-generation-progress.model';

@Component({
  selector: 'app-recipe-generation-progress',
  templateUrl: './recipe-generation-progress.html',
  styleUrl: './recipe-generation-progress.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeGenerationProgress {
  readonly model = input.required<RecipeGenerationProgressModel>();
}
