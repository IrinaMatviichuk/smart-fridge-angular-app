import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

import { IconName } from '../../../core/icons/icon-name';
import { ActionMenu } from '../action-menu/action-menu';
import { ActionMenuItem } from '../action-menu/action-menu-item.model';
import { StatusChip } from '../status-chip/status-chip';
import { ProductCardModel } from './product-card.model';

@Component({
  selector: 'app-product-card',
  imports: [ActionMenu, MatIcon, StatusChip],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCard<TAction extends string = string> {
  readonly product = input.required<ProductCardModel>();

  readonly actions = input<readonly ActionMenuItem<TAction>[]>([]);

  readonly selected = output<ProductCardModel>();

  readonly actionSelected = output<ActionMenuItem<TAction>>();

  protected readonly icons = {
    calendar: IconName.Calendar,
  } as const;

  protected handleSelected(): void {
    this.selected.emit(this.product());
  }

  protected handleCardKeydown(event: KeyboardEvent): void {
    if (event.target !== event.currentTarget) {
      return;
    }

    if (event.key !== 'Enter' && event.key !== ' ') {
      return;
    }

    event.preventDefault();

    this.handleSelected();
  }

  protected handleActionSelected(action: ActionMenuItem<TAction>, event?: Event): void {
    event?.stopPropagation();

    this.actionSelected.emit(action);
  }
}
