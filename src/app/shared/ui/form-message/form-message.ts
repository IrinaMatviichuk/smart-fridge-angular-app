import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type FormMessageType = 'error' | 'info' | 'success';

@Component({
  selector: 'app-form-message',
  templateUrl: './form-message.html',
  styleUrl: './form-message.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormMessage {
  readonly message = input<string | null>(null);
  readonly type = input<FormMessageType>('error');
  readonly reserveSpace = input(true);
}
