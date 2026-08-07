import { IconName } from '../../../../core/icons/icon-name';
import { SummaryCardTone } from '../../../../shared/ui/summary-card/summary-card.types';

export interface DashboardSummaryCardConfig {
  readonly key: 'total' | 'expiringSoon' | 'expired' | 'fresh';

  readonly label: string;
  readonly description: string;
  readonly icon: IconName;
  readonly tone: SummaryCardTone;
}

export const DASHBOARD_SUMMARY_CARDS: readonly DashboardSummaryCardConfig[] = [
  {
    key: 'total',
    label: 'Total Products',
    description: 'All products',
    icon: IconName.Cube,
    tone: 'info',
  },
  {
    key: 'expiringSoon',
    label: 'Expiring Soon',
    description: 'In 1-2 days',
    icon: IconName.Clock,
    tone: 'warning',
  },
  {
    key: 'expired',
    label: 'Expired Ones',
    description: 'For disposal',
    icon: IconName.Warning,
    tone: 'error',
  },
  {
    key: 'fresh',
    label: 'Fresh Products',
    description: 'Good to use',
    icon: IconName.CheckCircle,
    tone: 'success',
  },
];
