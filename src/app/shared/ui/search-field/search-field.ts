import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

import { IconName } from '../../../core/icons/icon-name';

@Component({
  selector: 'app-search-field',
  imports: [MatIcon],
  templateUrl: './search-field.html',
  styleUrl: './search-field.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchField {
  readonly value = model('');

  readonly inputId = input.required<string>();
  readonly ariaLabel = input.required<string>();

  readonly placeholder = input('Search');
  readonly disabled = input(false);
  readonly clearable = input(true);

  protected readonly searchIcon = IconName.Search;

  protected readonly clearIcon = IconName.Close;

  protected handleInput(event: Event): void {
    const target = event.target;

    if (!(target instanceof HTMLInputElement)) {
      return;
    }

    this.value.set(target.value);
  }

  protected clear(): void {
    if (this.disabled()) {
      return;
    }

    this.value.set('');
  }
}
