import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { IconName } from '../../core/icons/icon-name';
import { MAIN_SIDEBAR_NAVIGATION_ITEMS } from './main-sidebar-navigation.constants';

@Component({
  selector: 'app-main-sidebar',
  imports: [MatIcon, RouterLink, RouterLinkActive],
  templateUrl: './main-sidebar.html',
  styleUrl: './main-sidebar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainSidebar {
  readonly navigationSelected = output<void>();
  readonly helpRequested = output<void>();
  readonly logoutRequested = output<void>();

  protected readonly navigationItems = MAIN_SIDEBAR_NAVIGATION_ITEMS;

  protected readonly helpIcon = IconName.Help;
  protected readonly logoutIcon = IconName.Logout;
}
