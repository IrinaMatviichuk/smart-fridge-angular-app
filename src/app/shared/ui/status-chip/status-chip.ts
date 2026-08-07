import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { StatusChipTone } from './status-chip.types';

@Component({
  selector: 'app-status-chip',
  templateUrl: './status-chip.html',
  styleUrl: './status-chip.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusChip {
  readonly tone = input.required<StatusChipTone>();
}
