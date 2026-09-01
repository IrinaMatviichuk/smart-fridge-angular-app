import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { RecipeImage } from '../../../features/recipes/domain/recipe-image.model';

@Component({
  selector: 'app-recipe-image-attribution',
  templateUrl: './recipe-image-attribution.html',
  styleUrl: './recipe-image-attribution.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeImageAttribution {
  readonly image = input.required<RecipeImage>();
}
