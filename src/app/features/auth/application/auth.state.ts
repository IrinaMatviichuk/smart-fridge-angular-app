import { computed, Injectable, signal } from '@angular/core';

import { AuthUser } from '../domain/auth-user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthState {
  private readonly currentUserState = signal<AuthUser | null>(null);

  private readonly loadingState = signal(false);

  private readonly errorState = signal<string | null>(null);

  readonly currentUser = this.currentUserState.asReadonly();

  readonly loading = this.loadingState.asReadonly();

  readonly error = this.errorState.asReadonly();

  readonly isAuthenticated = computed(() => this.currentUser() !== null);

  setCurrentUser(user: AuthUser | null): void {
    this.currentUserState.set(user);
  }

  setLoading(loading: boolean): void {
    this.loadingState.set(loading);
  }

  setError(error: string | null): void {
    this.errorState.set(error);
  }

  reset(): void {
    this.currentUserState.set(null);
    this.loadingState.set(false);
    this.errorState.set(null);
  }
}
