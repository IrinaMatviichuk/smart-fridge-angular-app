export const IconName = {
  Email: 'email',
  Lock: 'lock',
  PasswordPlaceholder: 'password-placeholder',
  Visibility: 'visibility',
  VisibilityOff: 'visibility-off',
} as const;

export type IconName = (typeof IconName)[keyof typeof IconName];
