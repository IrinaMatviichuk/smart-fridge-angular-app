import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, from, switchMap } from 'rxjs';

import type { Product } from '../../../../entities/product/domain/product.model';
import type { ProductStorage } from '../../../../entities/product/domain/product-storage.type';
import type { ProductWriteModel } from '../../domain/product-write.model';
import type { ProductFormDialogData } from './product-form-dialog-data.model';

@Injectable()
export class ProductFormDialogService {
  private readonly dialog = inject(MatDialog);

  open(storage: ProductStorage, product?: Product): Observable<ProductWriteModel | undefined> {
    return from(import('./product-form-dialog')).pipe(
      switchMap(({ ProductFormDialog }) =>
        this.dialog
          .open(ProductFormDialog, {
            width: 'calc(100vw - 32px)',
            maxWidth: '520px',
            maxHeight: 'calc(100vh - 32px)',
            autoFocus: false,
            restoreFocus: true,
            data: {
              storage,
              product,
            } satisfies ProductFormDialogData,
          })
          .afterClosed(),
      ),
    );
  }
}
