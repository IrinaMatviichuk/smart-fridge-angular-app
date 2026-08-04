import { IconName } from './icon-name';

export interface IconConfig {
  readonly name: IconName;
  readonly url: string;
}

export const ICONS: readonly IconConfig[] = [
  {
    name: IconName.Email,
    url: '/icons/auth/email.svg',
  },
  {
    name: IconName.Lock,
    url: '/icons/auth/lock.svg',
  },
  {
    name: IconName.PasswordPlaceholder,
    url: '/icons/auth/password-placeholder.svg',
  },
  {
    name: IconName.Visibility,
    url: '/icons/auth/visibility.svg',
  },
  {
    name: IconName.VisibilityOff,
    url: '/icons/auth/visibility-off.svg',
  },
];
