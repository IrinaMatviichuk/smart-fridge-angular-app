import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormField, form, required } from '@angular/forms/signals';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';

import { IconName } from '../../../../core/icons/icon-name';
import { Button } from '../../../../shared/ui/button/button';
import { DateField } from '../../../../shared/ui/date-field/date-field';
import { Radio } from '../../../../shared/ui/radio/radio';
import { Select } from '../../../../shared/ui/select/select';
import { TextField } from '../../../../shared/ui/text-field/text-field';
import { PRODUCT_CATEGORY_OPTIONS } from '../../config/product-category-options.config';
import { ProductCategory } from '../../../../entities/product/domain/product-category.type';
import { ProductStorage } from '../../../../entities/product/domain/product-storage.type';
import { ProductWriteModel } from '../../domain/product-write.model';
import {
  PRODUCT_FORM_DIALOG_TEXT,
  PRODUCT_FORM_VALIDATION_MESSAGES,
} from './product-form-dialog.constants';
import { ProductFormDialogData } from './product-form-dialog-data.model';

@Component({
  selector: 'app-product-form-dialog',
  imports: [Button, DateField, FormField, MatIcon, Radio, Select, TextField],
  templateUrl: './product-form-dialog.html',
  styleUrl: './product-form-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductFormDialog {
  private readonly dialogRef = inject(MatDialogRef<ProductFormDialog, ProductWriteModel>);

  protected readonly data = inject<ProductFormDialogData>(MAT_DIALOG_DATA);

  private readonly product = this.data.product;

  protected readonly icons = {
    close: IconName.Close,
    cube: IconName.Cube,
  } as const;

  protected readonly categoryOptions = PRODUCT_CATEGORY_OPTIONS;

  protected readonly minDate = computed<Date | null>(() => new Date());

  protected readonly isEditMode = computed(() => this.product !== undefined);

  protected readonly title = computed(() =>
    this.isEditMode() ? PRODUCT_FORM_DIALOG_TEXT.edit.title : PRODUCT_FORM_DIALOG_TEXT.create.title,
  );

  protected readonly subtitle = computed(() =>
    this.isEditMode()
      ? PRODUCT_FORM_DIALOG_TEXT.edit.subtitle
      : PRODUCT_FORM_DIALOG_TEXT.create.subtitle,
  );

  protected readonly submitLabel = computed(() =>
    this.isEditMode()
      ? PRODUCT_FORM_DIALOG_TEXT.edit.submitLabel
      : PRODUCT_FORM_DIALOG_TEXT.create.submitLabel,
  );

  protected readonly model = signal<ProductWriteModel>({
    name: this.product?.name ?? '',
    category: this.product?.category ?? 'other',
    storage: this.product?.storage ?? this.data.storage,
    quantity: this.product?.quantity ?? '',
    expiryDate: this.product?.expiryDate ?? '',
  });

  protected readonly productForm = form(this.model, (path) => {
    required(path.name, {
      message: PRODUCT_FORM_VALIDATION_MESSAGES.name.required,
    });

    required(path.storage, {
      message: PRODUCT_FORM_VALIDATION_MESSAGES.storage.required,
    });

    required(path.expiryDate, {
      message: PRODUCT_FORM_VALIDATION_MESSAGES.expiryDate.required,
    });
  });

  protected selectStorage(storage: ProductStorage): void {
    this.productForm.storage().value.set(storage);
  }

  protected selectCategory(category: ProductCategory | null): void {
    if (category === null) {
      return;
    }

    this.productForm.category().value.set(category);
  }

  protected close(): void {
    this.dialogRef.close();
  }

  protected submit(event: SubmitEvent): void {
    event.preventDefault();

    if (this.productForm().invalid()) {
      return;
    }

    const value = this.model();

    this.dialogRef.close({
      ...value,
      name: value.name.trim(),
      quantity: value.quantity.trim(),
    });
  }
}
