import { Routes } from '@angular/router';

const loadDashboardPage = () =>
  import('./pages/dashboard-page/dashboard-page').then(({ DashboardPage }) => DashboardPage);

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'fridge',
  },
  {
    path: ':storage',
    loadComponent: loadDashboardPage,
  },
];
