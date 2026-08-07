import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.html',
  styleUrl: './radio.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Radio {
  readonly checked = model(false);
  readonly disabled = input(false);
  readonly ariaLabel = input.required<string>();

  protected select(): void {
    if (this.disabled() || this.checked()) {
      return;
    }

    this.checked.set(true);
  }
}
