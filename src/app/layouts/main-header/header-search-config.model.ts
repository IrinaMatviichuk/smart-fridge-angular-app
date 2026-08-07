import { HeaderControlKey } from './header-control-key.type';

export interface HeaderSearchConfig {
  readonly key: Extract<HeaderControlKey, 'search'>;

  readonly placeholder: string;
  readonly ariaLabel: string;
}
