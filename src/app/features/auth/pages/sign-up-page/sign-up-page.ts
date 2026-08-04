import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from '@angular/router';
import { tap } from 'rxjs';

import { AuthFacade } from '../../application/auth.facade';
import { AuthCredentials } from '../../domain/auth-credentials.model';
import { SignUpForm } from '../../ui/sign-up-form/sign-up-form';

@Component({
  selector: 'app-sign-up-page',
  imports: [RouterLink, SignUpForm],
  templateUrl: './sign-up-page.html',
  styleUrl: './sign-up-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpPage {
  private readonly authFacade = inject(AuthFacade);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly loading = this.authFacade.loading;

  protected readonly error = this.authFacade.error;

  protected handleSignUp(credentials: AuthCredentials): void {
    this.authFacade
      .register(credentials)
      .pipe(
        tap(() => {
          void this.router.navigate(['/auth/login']);
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }
}
