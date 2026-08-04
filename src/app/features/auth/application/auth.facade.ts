import { inject, Injectable } from '@angular/core';
import {
  catchError,
  defer,
  EMPTY,
  finalize,
  map,
  Observable,
  of,
  OperatorFunction,
  switchMap,
  tap,
} from 'rxjs';

import { resolveApiErrorMessage } from '../../../core/api';
import { AuthApiService } from '../data-access/auth-api.service';
import { AuthTokenStorage } from '../data-access/storage/auth-token.storage';
import { AuthCredentials } from '../domain/auth-credentials.model';
import { AuthTokens } from '../domain/auth-tokens.model';
import { AuthUser } from '../domain/auth-user.model';
import { AuthState } from './auth.state';

const DEFAULT_ERROR_MESSAGE = 'Something went wrong';
const SERVER_CONNECTION_ERROR_MESSAGE = 'Unable to connect to the server';
const INVALID_CREDENTIALS_ERROR_MESSAGE = 'Invalid email or password';

@Injectable({
  providedIn: 'root',
})
export class AuthFacade {
  private readonly authApi = inject(AuthApiService);

  private readonly tokenStorage = inject(AuthTokenStorage);

  private readonly authState = inject(AuthState);

  readonly currentUser = this.authState.currentUser;

  readonly loading = this.authState.loading;

  readonly error = this.authState.error;

  readonly isAuthenticated = this.authState.isAuthenticated;

  login(credentials: AuthCredentials): Observable<AuthUser> {
    return defer(() => {
      this.startRequest();

      return this.authApi.login(credentials);
    }).pipe(
      this.saveTokens(),
      this.switchToCurrentUser<AuthTokens>(),
      this.saveCurrentUser(),
      this.handleRequestError({
        401: INVALID_CREDENTIALS_ERROR_MESSAGE,
      }),
      this.finishRequest(),
    );
  }

  register(credentials: AuthCredentials): Observable<AuthUser> {
    return defer(() => {
      this.startRequest();

      return this.authApi.register(credentials);
    }).pipe(this.handleRequestError(), this.finishRequest());
  }

  restoreSession(): Observable<AuthUser | null> {
    const refreshToken = this.tokenStorage.readRefreshToken();

    if (!refreshToken) {
      this.clearSession();

      return of(null);
    }

    return defer(() => {
      this.startRequest();

      return this.authApi.refreshAccessToken(refreshToken);
    }).pipe(
      this.saveAccessToken(),
      this.switchToCurrentUser<string>(),
      this.saveCurrentUser(),
      map((user): AuthUser | null => user),
      catchError(() => {
        this.clearSession();

        return of(null);
      }),
      this.finishRequest(),
    );
  }

  loadCurrentUser(): Observable<AuthUser> {
    return defer(() => {
      this.startRequest();

      return this.authApi.getCurrentUser();
    }).pipe(this.saveCurrentUser(), this.handleRequestError(), this.finishRequest());
  }

  logout(): void {
    this.clearSession();
  }

  clearError(): void {
    this.authState.setError(null);
  }

  private saveTokens(): OperatorFunction<AuthTokens, AuthTokens> {
    return tap((tokens) => {
      this.tokenStorage.saveTokens(tokens);
    });
  }

  private saveAccessToken(): OperatorFunction<string, string> {
    return tap((accessToken) => {
      this.tokenStorage.saveAccessToken(accessToken);
    });
  }

  private switchToCurrentUser<T>(): OperatorFunction<T, AuthUser> {
    return switchMap(() => this.authApi.getCurrentUser());
  }

  private saveCurrentUser(): OperatorFunction<AuthUser, AuthUser> {
    return tap((user) => {
      this.authState.setCurrentUser(user);
    });
  }

  private handleRequestError<T>(
    statusMessages: Readonly<Partial<Record<number, string>>> = {},
  ): OperatorFunction<T, T> {
    return catchError((error: unknown) => {
      this.authState.setError(
        resolveApiErrorMessage(error, {
          defaultMessage: DEFAULT_ERROR_MESSAGE,
          connectionErrorMessage: SERVER_CONNECTION_ERROR_MESSAGE,
          statusMessages,
        }),
      );

      return EMPTY;
    });
  }

  private finishRequest<T>(): OperatorFunction<T, T> {
    return finalize(() => {
      this.authState.setLoading(false);
    });
  }

  private startRequest(): void {
    this.authState.setLoading(true);
    this.authState.setError(null);
  }

  private clearSession(): void {
    this.tokenStorage.clearTokens();
    this.authState.reset();
  }
}
