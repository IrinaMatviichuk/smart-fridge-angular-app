import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

import { IconName } from '../../../core/icons/icon-name';

@Component({
  selector: 'app-checkbox',
  imports: [MatIcon],
  templateUrl: './checkbox.html',
  styleUrl: './checkbox.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Checkbox {
  readonly checked = model(false);
  readonly disabled = input(false);
  readonly ariaLabel = input.required<string>();

  protected readonly checkIcon = IconName.Check;

  protected toggle(): void {
    if (this.disabled()) {
      return;
    }

    this.checked.update((checked) => !checked);
  }
}
