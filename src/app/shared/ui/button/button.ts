import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

import { IconName } from '../../../core/icons/icon-name';
import { ButtonSize, ButtonType, ButtonVariant } from './button.types';

@Component({
  selector: 'app-button',
  imports: [MatIcon],
  templateUrl: './button.html',
  styleUrl: './button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Button {
  readonly type = input<ButtonType>('button');
  readonly variant = input<ButtonVariant>('primary');
  readonly size = input<ButtonSize>('default');
  readonly disabled = input(false);
  readonly loading = input(false);
  readonly fullWidth = input(false);
  readonly iconStart = input<IconName | null>(null);
  readonly iconEnd = input<IconName | null>(null);
  readonly loadingLabel = input('Loading');

  protected readonly effectivelyDisabled = computed(() => this.disabled() || this.loading());
}
