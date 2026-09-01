import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

import { IconName } from '../../../../core/icons/icon-name';
import { HeaderFacade } from '../../../../layouts/main-header/header.facade';
import { IconButton } from '../../../../shared/ui/icon-button/icon-button';
import { RecipeImageAttribution } from '../../../../shared/ui/recipe-image-attribution/recipe-image-attribution';
import { TipFrame } from '../../../../shared/ui/tip-frame/tip-frame';
import { TipFrameModel } from '../../../../shared/ui/tip-frame/tip-frame.model';
import { RecipeDetailFacade } from '../../application/detail/recipe-detail.facade';
import { RecipeDetailStore } from '../../application/detail/recipe-detail.store';
import { SavedRecipesFacade } from '../../application/saved/saved-recipes.facade';
import { RecipeBackButton } from '../../components/recipe-back-button/recipe-back-button';
import { RecipeDetail } from '../../domain/recipe-detail.model';
import {
  mapRecipeDetailActionErrorTip,
  mapRecipeDetailErrorTip,
} from './recipe-detail-page.mapper';

@Component({
  selector: 'app-recipe-detail-page',
  imports: [IconButton, MatIcon, RecipeBackButton, RecipeImageAttribution, TipFrame],
  providers: [RecipeDetailStore, RecipeDetailFacade],
  templateUrl: './recipe-detail-page.html',
  styleUrl: './recipe-detail-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeDetailPage implements OnInit {
  private readonly route = inject(ActivatedRoute);

  private readonly router = inject(Router);

  private readonly header = inject(HeaderFacade);

  protected readonly facade = inject(RecipeDetailFacade);

  protected readonly savedFacade = inject(SavedRecipesFacade);

  protected readonly icons = {
    favorite: IconName.Favorite,
    favoriteFilled: IconName.FavoriteFilled,
    clock: IconName.Clock,
    difficulty: IconName.Chart,
    servings: IconName.Users,
    ingredients: IconName.CookingPot,
    steps: IconName.RecipeBook,
  } as const;

  protected readonly tip: TipFrameModel = {
    variant: 'info',
    icon: IconName.Info,
    title: 'Tip',
    description: 'You can replace chicken with shrimps or mushrooms for a different twist!',
  };

  protected readonly errorTip = computed<TipFrameModel | null>(() => {
    const error = this.facade.error();

    if (!error) {
      return null;
    }

    return mapRecipeDetailErrorTip(error);
  });

  protected readonly actionErrorTip = computed<TipFrameModel | null>(() => {
    const error = this.savedFacade.actionError();

    if (!error) {
      return null;
    }

    return mapRecipeDetailActionErrorTip(error);
  });

  constructor() {
    this.header.configureSearch({
      key: 'search',
      placeholder: 'Search products...',
      ariaLabel: 'Search products',
    });
  }

  ngOnInit(): void {
    const recipeId = Number(this.route.snapshot.paramMap.get('id'));

    if (!Number.isInteger(recipeId) || recipeId <= 0) {
      void this.router.navigate(['/recipes', 'generated']);

      return;
    }

    this.facade.load(recipeId);
  }

  protected handleFavoriteChanged(recipe: RecipeDetail): void {
    this.savedFacade.toggleSaved(recipe);
  }
}
