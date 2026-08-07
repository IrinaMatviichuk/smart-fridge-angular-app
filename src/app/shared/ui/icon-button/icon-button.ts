import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

import { IconName } from '../../../core/icons/icon-name';
import { IconButtonSize, IconButtonType, IconButtonVariant } from './icon-button.types';

@Component({
  selector: 'app-icon-button',
  imports: [MatIcon],
  templateUrl: './icon-button.html',
  styleUrl: './icon-button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconButton {
  readonly icon = input.required<IconName>();

  readonly ariaLabel = input.required<string>();

  readonly type = input<IconButtonType>('button');

  readonly variant = input<IconButtonVariant>('neutral');

  readonly size = input<IconButtonSize>('medium');

  readonly disabled = input(false);

  readonly active = input(false);

  readonly badge = input<string | number | null>(null);
}
