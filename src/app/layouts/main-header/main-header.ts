import { ChangeDetectionStrategy, Component, input, model, output } from '@angular/core';

import { IconName } from '../../core/icons/icon-name';
import { AvatarButton } from '../../shared/ui/avatar-button/avatar-button';
import { Button } from '../../shared/ui/button/button';
import { IconButton } from '../../shared/ui/icon-button/icon-button';
import { SearchField } from '../../shared/ui/search-field/search-field';
import { HeaderSearchConfig } from './header-search-config.model';

@Component({
  selector: 'app-main-header',
  imports: [AvatarButton, Button, IconButton, SearchField],
  templateUrl: './main-header.html',
  styleUrl: './main-header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainHeader {
  readonly searchConfig = input<HeaderSearchConfig | null>(null);
  readonly searchQuery = model('');

  readonly userEmail = input('');
  readonly profileImageUrl = input<string | null>(null);
  readonly notificationCount = input<number | null>(null);

  readonly menuRequested = output<void>();
  readonly recipesRequested = output<void>();
  readonly notificationsRequested = output<void>();
  readonly profileRequested = output<void>();

  protected readonly menuIcon = IconName.MoreHorizontal;
  protected readonly recipesIcon = IconName.Recipe;
  protected readonly notificationIcon = IconName.Notification;
}
