import { Injectable, signal } from '@angular/core';

import { AuthTokens } from '../../domain/auth-tokens.model';
import { AUTH_TOKEN_STORAGE_KEYS } from './auth-token-storage.constants';

@Injectable({
  providedIn: 'root',
})
export class AuthTokenStorage {
  private readonly accessTokenState = signal<string | null>(null);

  readonly accessToken = this.accessTokenState.asReadonly();

  readAccessToken(): string | null {
    return this.accessTokenState();
  }

  readRefreshToken(): string | null {
    return localStorage.getItem(AUTH_TOKEN_STORAGE_KEYS.refreshToken);
  }

  hasRefreshToken(): boolean {
    return this.readRefreshToken() !== null;
  }

  saveTokens(tokens: AuthTokens): void {
    this.saveAccessToken(tokens.accessToken);
    this.saveRefreshToken(tokens.refreshToken);
  }

  saveAccessToken(accessToken: string): void {
    this.accessTokenState.set(accessToken);
  }

  saveRefreshToken(refreshToken: string): void {
    localStorage.setItem(AUTH_TOKEN_STORAGE_KEYS.refreshToken, refreshToken);
  }

  clearAccessToken(): void {
    this.accessTokenState.set(null);
  }

  clearTokens(): void {
    this.clearAccessToken();

    localStorage.removeItem(AUTH_TOKEN_STORAGE_KEYS.refreshToken);
  }
}
