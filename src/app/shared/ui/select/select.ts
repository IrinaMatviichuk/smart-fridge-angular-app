import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  computed,
  inject,
  input,
  model,
  signal,
} from '@angular/core';
import { MatIcon } from '@angular/material/icon';

import { IconName } from '../../../core/icons/icon-name';
import { SelectOption } from './select-option.interface';
import { SelectSize, SelectVariant } from './select.types';

@Component({
  selector: 'app-select',
  imports: [MatIcon],
  templateUrl: './select.html',
  styleUrl: './select.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Select<T extends string = string> {
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  readonly options = input.required<readonly SelectOption<T>[]>();

  readonly value = model<T | null>(null);

  readonly placeholder = input('Select');

  readonly ariaLabel = input.required<string>();

  readonly variant = input<SelectVariant>('secondary');

  readonly size = input<SelectSize>('default');

  readonly disabled = input(false);

  protected readonly open = signal(false);

  protected readonly icons = {
    chevronDown: IconName.ChevronDown,
    check: IconName.Check,
  } as const;

  protected readonly selectedOption = computed(() => {
    const selectedValue = this.value();

    if (selectedValue === null) {
      return null;
    }

    return this.options().find((option) => option.value === selectedValue) ?? null;
  });

  @HostListener('document:click', ['$event'])
  protected handleDocumentClick(event: MouseEvent): void {
    if (!this.open()) {
      return;
    }

    const target = event.target;

    if (!(target instanceof Node)) {
      return;
    }

    if (this.elementRef.nativeElement.contains(target)) {
      return;
    }

    this.close();
  }

  @HostListener('document:keydown.escape')
  protected handleEscape(): void {
    if (!this.open()) {
      return;
    }

    this.close();
  }

  protected toggle(): void {
    if (this.disabled()) {
      return;
    }

    this.open.update((open) => !open);
  }

  protected selectOption(option: SelectOption<T>): void {
    if (option.disabled) {
      return;
    }

    this.value.set(option.value);

    this.close();
  }

  protected close(): void {
    this.open.set(false);
  }
}
