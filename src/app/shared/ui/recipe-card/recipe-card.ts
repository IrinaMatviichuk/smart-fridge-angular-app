import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

import { IconName } from '../../../core/icons/icon-name';
import { Button } from '../button/button';
import { IconButton } from '../icon-button/icon-button';
import { RecipeCardModel } from './recipe-card.model';

@Component({
  selector: 'app-recipe-card',
  imports: [Button, IconButton, MatIcon],
  templateUrl: './recipe-card.html',
  styleUrl: './recipe-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeCard {
  readonly model = input.required<RecipeCardModel>();

  readonly selected = output<RecipeCardModel>();

  readonly favoriteChanged = output<RecipeCardModel>();

  protected readonly icons = {
    favorite: IconName.Favorite,
    favoriteFilled: IconName.FavoriteFilled,
  } as const;

  protected handleSelected(): void {
    this.selected.emit(this.model());
  }

  protected handleFavorite(event: MouseEvent): void {
    event.stopPropagation();

    this.favoriteChanged.emit(this.model());
  }
}
