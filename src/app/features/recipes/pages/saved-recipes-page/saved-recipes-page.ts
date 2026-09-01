import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { EmptyState } from '../../../../shared/ui/empty-state/empty-state';
import { TipFrame } from '../../../../shared/ui/tip-frame/tip-frame';
import { TipFrameModel } from '../../../../shared/ui/tip-frame/tip-frame.model';
import { SavedRecipesFacade } from '../../application/saved/saved-recipes.facade';
import { SavedRecipeCard } from '../../components/saved-recipe-card/saved-recipe-card';
import { CollapsibleRecipeGrid } from '../../components/collapsible-recipe-grid/collapsible-recipe-grid';
import { SavedRecipe } from '../../domain/saved-recipe.model';
import { SAVED_RECIPES_EMPTY_STATE, SAVED_RECIPES_INFO_TIP } from './saved-recipes-page.config';
import { mapSavedRecipeActionErrorTip, mapSavedRecipesErrorTip } from './saved-recipes-page.mapper';

@Component({
  selector: 'app-saved-recipes-page',
  imports: [CollapsibleRecipeGrid, EmptyState, SavedRecipeCard, TipFrame],
  templateUrl: './saved-recipes-page.html',
  styleUrl: './saved-recipes-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SavedRecipesPage implements OnInit {
  private readonly router = inject(Router);

  protected readonly facade = inject(SavedRecipesFacade);

  protected readonly emptyState = SAVED_RECIPES_EMPTY_STATE;

  protected readonly infoTip = SAVED_RECIPES_INFO_TIP;

  protected readonly errorTip = computed<TipFrameModel | null>(() => {
    const error = this.facade.error();

    if (!error) {
      return null;
    }

    return mapSavedRecipesErrorTip(error);
  });

  protected readonly actionErrorTip = computed<TipFrameModel | null>(() => {
    const error = this.facade.actionError();

    if (!error) {
      return null;
    }

    return mapSavedRecipeActionErrorTip(error);
  });

  ngOnInit(): void {
    this.facade.load();
  }

  protected handleRecipeSelected(recipe: SavedRecipe): void {
    void this.router.navigate(['/recipes', 'detail', recipe.id]);
  }

  protected handleFavoriteChanged(recipe: SavedRecipe): void {
    this.facade.toggleSaved(recipe);
  }

  protected handleEmptyAction(): void {
    void this.router.navigate(['/dashboard', 'fridge']);
  }
}
