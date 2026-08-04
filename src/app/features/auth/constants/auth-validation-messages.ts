export const AUTH_VALIDATION_MESSAGES = {
  emailRequired: 'Email is required',
  emailInvalid: 'Enter a valid email address',

  passwordRequired: 'Password is required',

  passwordMinLength: (minLength: number): string =>
    `Password must contain at least ${minLength} characters`,

  confirmPasswordRequired: 'Password confirmation is required',

  passwordsMismatch: 'Passwords do not match',
} as const;
