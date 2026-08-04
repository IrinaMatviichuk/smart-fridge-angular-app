import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type ButtonType = 'button' | 'reset' | 'submit';

export type ButtonVariant = 'primary' | 'secondary' | 'text';

@Component({
  selector: 'app-button',
  templateUrl: './button.html',
  styleUrl: './button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Button {
  readonly type = input<ButtonType>('button');
  readonly variant = input<ButtonVariant>('primary');

  readonly disabled = input(false);
  readonly loading = input(false);
  readonly fullWidth = input(false);

  readonly ariaLabel = input<string | null>(null);

  protected isDisabled(): boolean {
    return this.disabled() || this.loading();
  }
}
