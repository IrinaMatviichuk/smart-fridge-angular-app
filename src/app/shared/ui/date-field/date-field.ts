import { ChangeDetectionStrategy, Component, computed, input, model, output } from '@angular/core';
import { FormValueControl, ValidationError, WithOptionalFieldTree } from '@angular/forms/signals';
import {
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { MatDatepicker, MatDatepickerInput } from '@angular/material/datepicker';
import { MatIcon } from '@angular/material/icon';

import { FormField } from '../form-field/form-field';
import { DATE_FIELD_FORMATS, DATE_FIELD_LOCALE } from './date-field.constants';
import { formatIsoDate, parseIsoDate } from './date-field.utils';

@Component({
  selector: 'app-date-field',
  imports: [FormField, MatDatepicker, MatDatepickerInput, MatIcon],
  providers: [
    provideNativeDateAdapter(),
    {
      provide: MAT_DATE_LOCALE,
      useValue: DATE_FIELD_LOCALE,
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: DATE_FIELD_FORMATS,
    },
  ],
  templateUrl: './date-field.html',
  styleUrl: './date-field.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateField implements FormValueControl<string> {
  readonly value = model('');

  readonly inputId = input.required<string>();
  readonly label = input.required<string>();

  readonly placeholder = input('Enter or select date');
  readonly minDate = input<Date | null>(null);
  readonly maxDate = input<Date | null>(null);
  readonly pickerOnly = input(false);
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

  protected readonly dateValue = computed<Date | null>(() => parseIsoDate(this.value()));
  protected readonly inputReadonly = computed(() => this.readonly() || this.pickerOnly());
  protected readonly pickerDisabled = computed(() => this.disabled() || this.readonly());

  protected handleInputClick(picker: MatDatepicker<Date>): void {
    if (!this.pickerOnly() || this.pickerDisabled()) {
      return;
    }

    picker.open();
  }

  protected handleDateChange(value: Date | null): void {
    if (!value) {
      this.value.set('');

      return;
    }

    this.value.set(formatIsoDate(value));
  }

  protected handleBlur(): void {
    this.touch.emit();
  }
}
