import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

import { Button } from '../button/button';
import { EmptyStateModel } from './empty-state.model';

@Component({
  selector: 'app-empty-state',
  imports: [Button],
  templateUrl: './empty-state.html',
  styleUrl: './empty-state.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyState {
  readonly data = input.required<EmptyStateModel>();

  readonly actionRequested = output<void>();
}
