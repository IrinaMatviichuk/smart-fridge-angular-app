import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

import { TabsItem } from './tabs-item.interface';
import { TabsValue } from './tabs.types';

@Component({
  selector: 'app-tabs',
  imports: [MatIcon],
  templateUrl: './tabs.html',
  styleUrl: './tabs.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Tabs<T extends TabsValue = TabsValue> {
  readonly items = input.required<readonly TabsItem<T>[]>();

  readonly value = model.required<T>();

  readonly ariaLabel = input.required<string>();

  readonly fullWidth = input(false);

  protected select(item: TabsItem<T>): void {
    if (item.disabled || item.value === this.value()) {
      return;
    }

    this.value.set(item.value);
  }
}
