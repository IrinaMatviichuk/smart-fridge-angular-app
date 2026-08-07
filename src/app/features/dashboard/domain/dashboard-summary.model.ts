export interface DashboardSummary {
  readonly total: number;
  readonly expiringSoon: number;
  readonly expired: number;
  readonly fresh: number;
}
