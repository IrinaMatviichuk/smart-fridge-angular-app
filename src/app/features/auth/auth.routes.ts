import { Routes } from '@angular/router';

import { AuthLayout } from './layouts/auth-layout/auth-layout';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    component: AuthLayout,
    children: [
      {
        path: 'login',
        title: 'Log in | Fridgy',
        loadComponent: () =>
          import('./pages/login-page/login-page').then(({ LoginPage }) => LoginPage),
      },
      {
        path: 'sign-up',
        title: 'Sign up | Fridgy',
        loadComponent: () =>
          import('./pages/sign-up-page/sign-up-page').then(({ SignUpPage }) => SignUpPage),
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login',
      },
      {
        path: '**',
        redirectTo: 'login',
      },
    ],
  },
];
