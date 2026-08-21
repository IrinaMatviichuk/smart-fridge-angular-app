import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

import { IconName } from '../../../../core/icons/icon-name';
import { RecipeGenerationProgressModel } from './recipe-generation-progress.model';

@Component({
  selector: 'app-recipe-generation-progress',
  imports: [MatIcon],
  templateUrl: './recipe-generation-progress.html',
  styleUrl: './recipe-generation-progress.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeGenerationProgress {
  readonly model = input.required<RecipeGenerationProgressModel>();

  protected readonly heroIcon = IconName.SearchOff;
}
