import { StatusChipTone } from '../status-chip/status-chip.types';

export interface ProductCardModel {
  readonly id: number;
  readonly title: string;
  readonly quantity: string;
  readonly expiryLabel: string;
  readonly statusLabel: string;
  readonly statusTone: StatusChipTone;
}
