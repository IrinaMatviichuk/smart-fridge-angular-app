import { ChangeDetectionStrategy, Component, computed, input, model, output } from '@angular/core';
import { FormValueControl, ValidationError, WithOptionalFieldTree } from '@angular/forms/signals';
import { MatIcon } from '@angular/material/icon';

import { IconName } from '../../../core/icons/icon-name';
import { FormField } from '../form-field/form-field';

export type TextFieldType = 'email' | 'search' | 'text' | 'url';

export type TextFieldInputMode = 'email' | 'search' | 'text' | 'url';

@Component({
  selector: 'app-text-field',
  imports: [FormField, MatIcon],
  templateUrl: './text-field.html',
  styleUrl: './text-field.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextField implements FormValueControl<string> {
  readonly value = model('');

  readonly inputId = input.required<string>();
  readonly label = input.required<string>();

  readonly placeholder = input('');
  readonly autocomplete = input('off');
  readonly type = input<TextFieldType>('text');
  readonly inputMode = input<TextFieldInputMode>('text');

  readonly prefixIcon = input<IconName | null>(null);
  readonly reserveErrorSpace = input(true);

  readonly touched = input(false);
  readonly disabled = input(false);
  readonly readonly = input(false);
  readonly hidden = input(false);
  readonly invalid = input(false);
  readonly required = input(false);

  readonly errors = input<readonly WithOptionalFieldTree<ValidationError>[]>([]);

  readonly touch = output<void>();

  protected readonly messageId = computed(() => `${this.inputId()}-message`);

  protected readonly showInvalidState = computed(() => this.touched() && this.invalid());

  protected readonly errorMessage = computed<string | null>(() => {
    if (!this.showInvalidState()) {
      return null;
    }

    return this.errors()[0]?.message ?? null;
  });

  protected handleInput(event: Event): void {
    const target = event.target;

    if (!(target instanceof HTMLInputElement)) {
      return;
    }

    this.value.set(target.value);
  }

  protected handleBlur(): void {
    this.touch.emit();
  }
}
