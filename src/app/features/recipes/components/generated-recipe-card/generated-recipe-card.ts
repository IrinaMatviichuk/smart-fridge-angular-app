import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

import { IconName } from '../../../../core/icons/icon-name';
import { Button } from '../../../../shared/ui/button/button';
import { IconButton } from '../../../../shared/ui/icon-button/icon-button';
import { Recipe } from '../../domain/recipe.model';

@Component({
  selector: 'app-generated-recipe-card',
  imports: [Button, IconButton],
  templateUrl: './generated-recipe-card.html',
  styleUrl: './generated-recipe-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeneratedRecipeCard {
  readonly recipe = input.required<Recipe>();

  readonly favorite = input(false);

  readonly favoritePending = input(false);

  readonly selected = output<Recipe>();

  readonly favoriteChanged = output<Recipe>();

  protected readonly icons = {
    favorite: IconName.Favorite,
    favoriteFilled: IconName.FavoriteFilled,
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
