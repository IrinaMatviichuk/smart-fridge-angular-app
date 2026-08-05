import { Injectable, signal } from '@angular/core';

import { HeaderSearchConfig } from './header-search-config.model';

@Injectable({
  providedIn: 'root',
})
export class HeaderSearchState {
  private readonly configState = signal<HeaderSearchConfig | null>(null);

  private readonly queryState = signal('');

  readonly config = this.configState.asReadonly();

  readonly query = this.queryState.asReadonly();

  configure(config: HeaderSearchConfig): void {
    this.configState.set(config);
    this.queryState.set('');
  }

  setQuery(query: string): void {
    this.queryState.set(query);
  }

  clearQuery(): void {
    this.queryState.set('');
  }

  reset(): void {
    this.configState.set(null);
    this.queryState.set('');
  }
}
