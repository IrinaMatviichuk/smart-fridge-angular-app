import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { RecipeGenerationFacade } from '../../application/generation/recipe-generation.facade';
import { SavedRecipesFacade } from '../../application/saved/saved-recipes.facade';
import { GeneratedRecipeCard } from '../../components/generated-recipe-card/generated-recipe-card';
import { RecipeFlowHeader } from '../../components/recipe-flow-header/recipe-flow-header';
import { Recipe } from '../../domain/recipe.model';

@Component({
  selector: 'app-generated-recipes-page',
  imports: [GeneratedRecipeCard, RecipeFlowHeader],
  templateUrl: './generated-recipes-page.html',
  styleUrl: './generated-recipes-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeneratedRecipesPage {
  private readonly router = inject(Router);

  protected readonly generationFacade = inject(RecipeGenerationFacade);

  protected readonly savedFacade = inject(SavedRecipesFacade);

  protected handleRecipeSelected(recipe: Recipe): void {
    void this.router.navigate(['/recipes', 'detail', recipe.id]);
  }

  protected handleFavoriteChanged(recipe: Recipe): void {
    this.savedFacade.toggleSaved(recipe);
  }
}
