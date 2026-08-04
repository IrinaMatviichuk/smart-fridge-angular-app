import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { email, form, FormField, required, submit } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';

import { Button } from '../../../../shared/ui/button/button';
import { FormMessage } from '../../../../shared/ui/form-message/form-message';
import { PasswordField } from '../../../../shared/ui/password-field/password-field';
import { TextField } from '../../../../shared/ui/text-field/text-field';
import { AUTH_VALIDATION_MESSAGES } from '../../constants/auth-validation-messages';
import { AuthCredentials } from '../../domain/auth-credentials.model';

@Component({
  selector: 'app-login-form',
  imports: [Button, FormField, FormMessage, PasswordField, RouterLink, TextField],
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginForm {
  readonly loading = input(false);

  readonly serverError = input<string | null>(null);

  readonly submitted = output<AuthCredentials>();

  private readonly model = signal<AuthCredentials>({
    email: '',
    password: '',
  });

  protected readonly loginForm = form(this.model, (path) => {
    required(path.email, {
      message: AUTH_VALIDATION_MESSAGES.emailRequired,
    });

    email(path.email, {
      message: AUTH_VALIDATION_MESSAGES.emailInvalid,
    });

    required(path.password, {
      message: AUTH_VALIDATION_MESSAGES.passwordRequired,
    });
  });

  protected handleSubmit(event: SubmitEvent): void {
    event.preventDefault();

    if (this.loading()) {
      return;
    }

    void submit(this.loginForm, (field) => {
      this.submitted.emit(field().value());

      return Promise.resolve(undefined);
    });
  }
}
