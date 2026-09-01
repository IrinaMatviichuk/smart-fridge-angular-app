import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatIcon } from '@angular/material/icon';

import { IconName } from '../../../core/icons/icon-name';
import { IconButton } from '../icon-button/icon-button';
import { ActionMenuItem } from './action-menu-item.model';
import { IconButtonSize } from '../icon-button/icon-button.types';

@Component({
  selector: 'app-action-menu',
  imports: [IconButton, MatIcon, MatMenu, MatMenuItem, MatMenuTrigger],
  templateUrl: './action-menu.html',
  styleUrl: './action-menu.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionMenu<T extends string = string> {
  readonly actions = input.required<readonly ActionMenuItem<T>[]>();

  readonly triggerIcon = input<IconName>(IconName.MoreHorizontal);

  readonly triggerAriaLabel = input('Open actions');

  readonly triggerSize = input<IconButtonSize>('extra-small');

  readonly actionSelected = output<ActionMenuItem<T>>();

  protected selectAction(action: ActionMenuItem<T>): void {
    if (action.disabled) {
      return;
    }

    this.actionSelected.emit(action);
  }
}
