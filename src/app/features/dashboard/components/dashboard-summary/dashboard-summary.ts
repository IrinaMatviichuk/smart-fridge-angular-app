import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { IconName } from '../../../../core/icons/icon-name';
import { SummaryCard } from '../../../../shared/ui/summary-card/summary-card';
import { DashboardSummary as DashboardSummaryModel } from '../../domain/dashboard-summary.model';

@Component({
  selector: 'app-dashboard-summary',
  imports: [SummaryCard],
  templateUrl: './dashboard-summary.html',
  styleUrl: './dashboard-summary.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardSummary {
  readonly summary = input.required<DashboardSummaryModel>();

  protected readonly icons = {
    total: IconName.Cube,
    expiringSoon: IconName.Clock,
    expired: IconName.Warning,
    fresh: IconName.CheckCircle,
  } as const;
}
