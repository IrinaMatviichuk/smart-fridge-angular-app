import { Injectable, inject } from '@angular/core';

import { HeaderSearchConfig } from './header-search-config.model';
import { HeaderSearchState } from './header-search.state';

@Injectable({
  providedIn: 'root',
})
export class HeaderFacade {
  private readonly searchState = inject(HeaderSearchState);

  readonly searchConfig = this.searchState.config;

  readonly searchQuery = this.searchState.query;

  configureSearch(config: HeaderSearchConfig): void {
    this.searchState.configure(config);
  }

  setSearchQuery(query: string): void {
    this.searchState.setQuery(query);
  }

  clearSearchQuery(): void {
    this.searchState.clearQuery();
  }

  resetSearch(): void {
    this.searchState.reset();
  }
}
