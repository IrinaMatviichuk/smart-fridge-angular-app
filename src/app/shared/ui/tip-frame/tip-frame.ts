import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

import { TipFrameModel } from './tip-frame.model';

@Component({
  selector: 'app-tip-frame',
  imports: [MatIcon],
  templateUrl: './tip-frame.html',
  styleUrl: './tip-frame.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TipFrame {
  readonly model = input.required<TipFrameModel>();
}
