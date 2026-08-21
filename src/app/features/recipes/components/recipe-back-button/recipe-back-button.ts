import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

import { IconName } from '../../../../core/icons/icon-name';

@Component({
  selector: 'app-recipe-back-button',
  imports: [MatIcon],
  templateUrl: './recipe-back-button.html',
  styleUrl: './recipe-back-button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeBackButton {
  private readonly location = inject(Location);

  private readonly router = inject(Router);

  readonly fallbackUrl = input<string>('/recipes/suggestions');

  protected readonly icon = IconName.ChevronLeft;

  protected handleBack(): void {
    if (window.history.length > 1) {
      this.location.back();

      return;
    }

    void this.router.navigateByUrl(this.fallbackUrl());
  }
}
