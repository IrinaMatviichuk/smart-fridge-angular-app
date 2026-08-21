import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { RecipeBackButton } from '../recipe-back-button/recipe-back-button';

@Component({
  selector: 'app-recipe-flow-header',
  imports: [RecipeBackButton],
  templateUrl: './recipe-flow-header.html',
  styleUrl: './recipe-flow-header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeFlowHeader {
  readonly title = input.required<string>();

  readonly subtitle = input.required<string>();

  readonly backFallbackUrl = input<string>('/recipes/suggestions');
}
