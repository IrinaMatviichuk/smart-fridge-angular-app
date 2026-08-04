import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import { FormValueControl, ValidationError, WithOptionalFieldTree } from '@angular/forms/signals';
import { MatIcon } from '@angular/material/icon';

import { IconName } from '../../../core/icons/icon-name';
import { FormField } from '../form-field/form-field';

export type PasswordAutocomplete = 'current-password' | 'new-password' | 'off';

@Component({
  selector: 'app-password-field',
  imports: [FormField, MatIcon],
  templateUrl: './password-field.html',
  styleUrl: './password-field.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordField implements FormValueControl<string> {
  readonly value = model('');

  readonly inputId = input.required<string>();
  readonly label = input.required<string>();

  readonly placeholder = input('');
  readonly autocomplete = input<PasswordAutocomplete>('current-password');

  readonly prefixIcon = input<IconName | null>(null);

  readonly placeholderIcon = input<IconName | null>(IconName.PasswordPlaceholder);

  readonly reserveErrorSpace = input(true);

  readonly touched = input(false);
  readonly disabled = input(false);
  readonly readonly = input(false);
  readonly hidden = input(false);
  readonly invalid = input(false);
  readonly required = input(false);
  readonly minLength = input<number | undefined>(undefined);

  readonly errors = input<readonly WithOptionalFieldTree<ValidationError>[]>([]);

  readonly touch = output<void>();

  protected readonly passwordVisible = signal(false);

  protected readonly visibilityIcon = IconName.Visibility;

  protected readonly visibilityOffIcon = IconName.VisibilityOff;

  protected readonly messageId = computed(() => `${this.inputId()}-message`);

  protected readonly hasValue = computed(() => this.value().length > 0);

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

    if (target.value.length === 0) {
      this.passwordVisible.set(false);
    }
  }

  protected handleBlur(): void {
    this.touch.emit();
  }

  protected togglePasswordVisibility(): void {
    if (!this.hasValue() || this.disabled() || this.readonly()) {
      return;
    }

    this.passwordVisible.update((isVisible) => !isVisible);
  }
}
