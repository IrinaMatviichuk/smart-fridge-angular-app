import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { tap } from 'rxjs';

import { AuthFacade } from '../../application/auth.facade';
import { AuthCredentials } from '../../domain/auth-credentials.model';
import { LoginForm } from '../../ui/login-form/login-form';

const DEFAULT_AUTHENTICATED_ROUTE = '/dashboard';

@Component({
  selector: 'app-login-page',
  imports: [LoginForm, RouterLink],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage {
  private readonly authFacade = inject(AuthFacade);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly loading = this.authFacade.loading;

  protected readonly error = this.authFacade.error;

  protected handleLogin(credentials: AuthCredentials): void {
    this.authFacade
      .login(credentials)
      .pipe(
        tap(() => {
          void this.router.navigateByUrl(this.resolveReturnUrl());
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }

  private resolveReturnUrl(): string {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');

    if (!returnUrl || !returnUrl.startsWith('/') || returnUrl.startsWith('//')) {
      return DEFAULT_AUTHENTICATED_ROUTE;
    }

    return returnUrl;
  }
}
