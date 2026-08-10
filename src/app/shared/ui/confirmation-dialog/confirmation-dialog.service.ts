import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, from, switchMap } from 'rxjs';

import type { ConfirmationDialogData } from './confirmation-dialog-data.model';

@Injectable({
  providedIn: 'root',
})
export class ConfirmationDialogService {
  private readonly dialog = inject(MatDialog);

  open(data: ConfirmationDialogData): Observable<boolean | undefined> {
    return from(import('./confirmation-dialog')).pipe(
      switchMap(({ ConfirmationDialog }) =>
        this.dialog
          .open(ConfirmationDialog, {
            width: 'calc(100vw - 32px)',
            maxWidth: '440px',
            autoFocus: false,
            restoreFocus: true,
            disableClose: false,
            data,
          })
          .afterClosed(),
      ),
    );
  }
}
