import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';

import { AvatarButtonSize } from './avatar-button.types';

@Component({
  selector: 'app-avatar-button',
  templateUrl: './avatar-button.html',
  styleUrl: './avatar-button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarButton {
  readonly ariaLabel = input.required<string>();

  readonly imageUrl = input<string | null>(null);

  readonly fallbackText = input('?');

  readonly size = input<AvatarButtonSize>('medium');

  readonly disabled = input(false);

  readonly pressed = output<void>();

  protected readonly normalizedFallback = computed(() => {
    const value = this.fallbackText().trim();

    return value.length > 0 ? value.charAt(0).toUpperCase() : '?';
  });

  protected handleClick(): void {
    if (this.disabled()) {
      return;
    }

    this.pressed.emit();
  }
}
