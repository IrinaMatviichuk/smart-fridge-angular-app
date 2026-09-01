import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';

import { RecipeGenerationFacade } from '../../application/generation/recipe-generation.facade';
import { SavedRecipesFacade } from '../../application/saved/saved-recipes.facade';
import { GeneratedRecipeCard } from '../../components/generated-recipe-card/generated-recipe-card';
import { CollapsibleRecipeGrid } from '../../components/collapsible-recipe-grid/collapsible-recipe-grid';
import { RecipeFlowHeader } from '../../components/recipe-flow-header/recipe-flow-header';
import { RecipeSummary } from '../../domain/recipe-summary.model';
import { TipFrame } from '../../../../shared/ui/tip-frame/tip-frame';
import { TipFrameModel } from '../../../../shared/ui/tip-frame/tip-frame.model';
import { IconName } from '../../../../core/icons/icon-name';

@Component({
  selector: 'app-generated-recipes-page',
  imports: [CollapsibleRecipeGrid, GeneratedRecipeCard, RecipeFlowHeader, TipFrame],
  templateUrl: './generated-recipes-page.html',
  styleUrl: './generated-recipes-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeneratedRecipesPage {
  private readonly router = inject(Router);

  protected readonly generationFacade = inject(RecipeGenerationFacade);

  protected readonly savedFacade = inject(SavedRecipesFacade);

  protected readonly tip: TipFrameModel = {
    variant: 'info',
    icon: IconName.Info,
    title: 'Don\u2019t see what you want?',
    description: 'Try adding more ingredients to your fridge for better recipe suggestions.',
  };

  protected readonly actionErrorTip = computed<TipFrameModel | null>(() => {
    const error = this.savedFacade.actionError();

    if (!error) {
      return null;
    }

    return {
      variant: 'error',
      icon: IconName.Warning,
      title: 'Unable to update recipe',
      description: error,
    };
  });

  protected handleRecipeSelected(recipe: RecipeSummary): void {
    void this.router.navigate(['/recipes', 'detail', recipe.id]);
  }

  protected handleFavoriteChanged(recipe: RecipeSummary): void {
    this.savedFacade.toggleSaved(recipe);
  }
}
