import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

import { IconName } from '../../../../core/icons/icon-name';
import { Button } from '../../../../shared/ui/button/button';
import { IconButton } from '../../../../shared/ui/icon-button/icon-button';
import { RecipeSummary } from '../../domain/recipe-summary.model';

@Component({
  selector: 'app-generated-recipe-card',
  imports: [Button, IconButton, MatIcon],
  templateUrl: './generated-recipe-card.html',
  styleUrl: './generated-recipe-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeneratedRecipeCard {
  readonly recipe = input.required<RecipeSummary>();

  readonly favorite = input(false);

  readonly favoritePending = input(false);

  readonly selected = output<RecipeSummary>();

  readonly favoriteChanged = output<RecipeSummary>();

  protected readonly icons = {
    favorite: IconName.Favorite,
    favoriteFilled: IconName.FavoriteFilled,
    clock: IconName.Clock,
    chart: IconName.Chart,
  } as const;

  protected handleSelected(): void {
    this.selected.emit(this.recipe());
  }

  protected handleFavoriteChanged(event: MouseEvent): void {
    event.stopPropagation();

    if (this.favoritePending()) {
      return;
    }

    this.favoriteChanged.emit(this.recipe());
  }
}
