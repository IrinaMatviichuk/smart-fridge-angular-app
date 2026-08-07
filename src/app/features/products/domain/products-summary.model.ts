export interface ProductsSummary {
  readonly total: number;
  readonly fresh: number;
  readonly expiringSoon: number;
  readonly expired: number;
}
