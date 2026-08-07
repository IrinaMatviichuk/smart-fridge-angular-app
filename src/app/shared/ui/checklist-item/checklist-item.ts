import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';

import { Checkbox } from '../checkbox/checkbox';

@Component({
  selector: 'app-checklist-item',
  imports: [Checkbox],
  templateUrl: './checklist-item.html',
  styleUrl: './checklist-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChecklistItem {
  readonly checked = model(false);
  readonly disabled = input(false);
  readonly ariaLabel = input.required<string>();

  protected handleCheckedChange(checked: boolean): void {
    this.checked.set(checked);
  }
}
