import {
  EnvironmentProviders,
  inject,
  makeEnvironmentProviders,
  provideAppInitializer,
} from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

import { ICONS } from './icons';

export function provideAppIcons(): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideAppInitializer(() => {
      const iconRegistry = inject(MatIconRegistry);
      const sanitizer = inject(DomSanitizer);

      for (const icon of ICONS) {
        iconRegistry.addSvgIcon(icon.name, sanitizer.bypassSecurityTrustResourceUrl(icon.url));
      }
    }),
  ]);
}
