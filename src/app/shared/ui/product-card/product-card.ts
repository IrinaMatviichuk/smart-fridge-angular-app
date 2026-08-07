import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

import { IconName } from '../../../core/icons/icon-name';
import { IconButton } from '../icon-button/icon-button';
import { StatusChip } from '../status-chip/status-chip';
import { ProductCardModel } from './product-card.model';

@Component({
  selector: 'app-product-card',
  imports: [IconButton, MatIcon, StatusChip],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCard {
  readonly product = input.required<ProductCardModel>();

  readonly menuVisible = input(true);

  readonly selected = output<ProductCardModel>();

  readonly menuRequested = output<ProductCardModel>();

  protected readonly icons = {
    calendar: IconName.Calendar,
    menu: IconName.MoreHorizontal,
  } as const;

  protected handleSelected(): void {
    this.selected.emit(this.product());
  }

  protected handleCardKeydown(event: KeyboardEvent): void {
    /*
     * Keyboard events from nested interactive controls
     * must not activate the whole card.
     */
    if (event.target !== event.currentTarget) {
      return;
    }

    if (event.key !== 'Enter' && event.key !== ' ') {
      return;
    }

    event.preventDefault();

    this.handleSelected();
  }

  protected handleMenuRequested(event: MouseEvent): void {
    event.stopPropagation();

    this.menuRequested.emit(this.product());
  }
}
