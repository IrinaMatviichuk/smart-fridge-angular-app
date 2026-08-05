import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { AuthFacade } from '../../features/auth/application/auth.facade';
import { MainHeader } from '../main-header/main-header';
import { HeaderSearchState } from '../main-header/header-search.state';
import { MainSidebar } from '../main-sidebar/main-sidebar';

@Component({
  selector: 'app-main-layout',
  imports: [MainHeader, MainSidebar, RouterOutlet],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayout {
  private readonly authFacade = inject(AuthFacade);

  private readonly headerSearchState = inject(HeaderSearchState);

  private readonly router = inject(Router);

  protected readonly navigationOpen = signal(false);

  protected readonly searchConfig = this.headerSearchState.config;
  protected readonly searchQuery = this.headerSearchState.query;
  protected readonly currentUser = this.authFacade.currentUser;

  protected openNavigation(): void {
    this.navigationOpen.set(true);
  }

  protected closeNavigation(): void {
    this.navigationOpen.set(false);
  }

  protected updateSearchQuery(query: string): void {
    this.headerSearchState.setQuery(query);
  }

  protected openRecipes(): void {
    void this.router.navigate(['/recipes']);
  }

  protected openNotifications(): void {
    // Notification panel will be added later.
  }

  protected openProfile(): void {
    // Profile route or user menu will be added later.
  }

  protected handleLogout(): void {
    this.closeNavigation();
    this.headerSearchState.reset();
    this.authFacade.logout();

    void this.router.navigate(['/auth/login']);
  }
}
