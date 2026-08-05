import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';

import { AuthFacade } from '../application/auth.facade';

export const authGuard: CanActivateFn = (_route, state) => {
  const authFacade = inject(AuthFacade);
  const router = inject(Router);

  if (authFacade.isAuthenticated()) {
    return true;
  }

  return authFacade.restoreSession().pipe(
    map((user) =>
      user
        ? true
        : router.createUrlTree(['/auth/login'], {
            queryParams: {
              returnUrl: state.url,
            },
          }),
    ),
  );
};
