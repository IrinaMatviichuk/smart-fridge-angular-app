import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { RecipeCard } from '../../../../shared/ui/recipe-card/recipe-card';
import { RecipeCardModel } from '../../../../shared/ui/recipe-card/recipe-card.model';
import { RecipeSummary } from '../../domain/recipe-summary.model';

@Component({
  selector: 'app-generated-recipe-card',
  imports: [RecipeCard],
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
