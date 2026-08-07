import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

import { IconName } from '../../../core/icons/icon-name';
import { SummaryCardTone } from './summary-card.types';

@Component({
  selector: 'app-summary-card',
  imports: [MatIcon],
  templateUrl: './summary-card.html',
  styleUrl: './summary-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SummaryCard {
  readonly label = input.required<string>();
  readonly value = input.required<number>();
  readonly description = input.required<string>();
  readonly icon = input.required<IconName>();
  readonly tone = input.required<SummaryCardTone>();
}
