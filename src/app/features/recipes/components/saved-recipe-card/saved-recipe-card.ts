import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

import { RecipeCard } from '../../../../shared/ui/recipe-card/recipe-card';
import { RecipeCardModel } from '../../../../shared/ui/recipe-card/recipe-card.model';
import { SavedRecipe } from '../../domain/saved-recipe.model';

@Component({
  selector: 'app-saved-recipe-card',
  imports: [RecipeCard],
  templateUrl: './saved-recipe-card.html',
  styleUrl: './saved-recipe-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SavedRecipeCard {
  readonly recipe = input.required<SavedRecipe>();

  readonly favorite = input(false);

  readonly favoritePending = input(false);

  readonly selected = output<SavedRecipe>();

  readonly favoriteChanged = output<SavedRecipe>();

  protected cardModel(): RecipeCardModel {
    return {
      ...this.recipe(),
      favorite: this.favorite(),
      favoritePending: this.favoritePending(),
    };
  }

  protected handleSelected(): void {
    this.selected.emit(this.recipe());
  }

  protected handleFavoriteChanged(): void {
    this.favoriteChanged.emit(this.recipe());
  }
}
