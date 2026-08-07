import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { SummaryCard } from '../../../../shared/ui/summary-card/summary-card';
import { DashboardSummary as DashboardSummaryModel } from '../../domain/dashboard-summary.model';
import { DASHBOARD_SUMMARY_CARDS } from './dashboard-summary.config';

@Component({
  selector: 'app-dashboard-summary',
  imports: [SummaryCard],
  templateUrl: './dashboard-summary.html',
  styleUrl: './dashboard-summary.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardSummary {
  readonly summary = input.required<DashboardSummaryModel>();

  protected readonly cards = computed(() =>
    DASHBOARD_SUMMARY_CARDS.map((card) => ({
      ...card,
      value: this.summary()[card.key],
    })),
  );
}
