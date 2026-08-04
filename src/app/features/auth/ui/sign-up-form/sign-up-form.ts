import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import {
  email,
  form,
  FormField,
  minLength,
  required,
  submit,
  validate,
} from '@angular/forms/signals';

import { Button } from '../../../../shared/ui/button/button';
import { FormMessage } from '../../../../shared/ui/form-message/form-message';
import { PasswordField } from '../../../../shared/ui/password-field/password-field';
import { TextField } from '../../../../shared/ui/text-field/text-field';
import { AUTH_VALIDATION } from '../../constants/auth-validation.constants';
import { AUTH_VALIDATION_MESSAGES } from '../../constants/auth-validation-messages';
import { AuthCredentials } from '../../domain/auth-credentials.model';
import { SignUpFormModel } from './sign-up-form.model';

@Component({
  selector: 'app-sign-up-form',
  imports: [Button, FormField, FormMessage, PasswordField, TextField],
  templateUrl: './sign-up-form.html',
  styleUrl: './sign-up-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpForm {
  readonly loading = input(false);

  readonly serverError = input<string | null>(null);

  readonly submitted = output<AuthCredentials>();

  private readonly model = signal<SignUpFormModel>({
    email: '',
    password: '',
    confirmPassword: '',
  });

  protected readonly signUpForm = form(this.model, (path) => {
    required(path.email, {
      message: AUTH_VALIDATION_MESSAGES.emailRequired,
    });

    email(path.email, {
      message: AUTH_VALIDATION_MESSAGES.emailInvalid,
    });

    required(path.password, {
      message: AUTH_VALIDATION_MESSAGES.passwordRequired,
    });

    minLength(path.password, AUTH_VALIDATION.passwordMinLength, {
      message: AUTH_VALIDATION_MESSAGES.passwordMinLength(AUTH_VALIDATION.passwordMinLength),
    });

    required(path.confirmPassword, {
      message: AUTH_VALIDATION_MESSAGES.confirmPasswordRequired,
    });

    validate(path.confirmPassword, ({ value, valueOf }) => {
      const confirmPassword = value();

      if (!confirmPassword) {
        return null;
      }

      return confirmPassword === valueOf(path.password)
        ? null
        : {
            kind: 'passwordMismatch',
            message: AUTH_VALIDATION_MESSAGES.passwordsMismatch,
          };
    });
  });

  protected handleSubmit(event: SubmitEvent): void {
    event.preventDefault();

    if (this.loading()) {
      return;
    }

    void submit(this.signUpForm, (field) => {
      const { email, password } = field().value();

      this.submitted.emit({
        email,
        password,
      });

      return Promise.resolve(undefined);
    });
  }
}
