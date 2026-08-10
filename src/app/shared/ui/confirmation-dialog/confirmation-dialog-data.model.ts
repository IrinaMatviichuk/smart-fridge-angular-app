export type ConfirmationDialogVariant = 'default' | 'danger';

export interface ConfirmationDialogData {
  readonly title: string;
  readonly message: string;

  readonly confirmLabel: string;
  readonly cancelLabel: string;

  readonly variant?: ConfirmationDialogVariant;
}
