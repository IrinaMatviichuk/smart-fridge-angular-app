import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.html',
  styleUrl: './form-field.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormField {
  readonly inputId = input.required<string>();
  readonly messageId = input.required<string>();
  readonly label = input.required<string>();

  readonly required = input(false);
  readonly invalid = input(false);
  readonly errorMessage = input<string | null>(null);
  readonly reserveMessageSpace = input(true);
}
