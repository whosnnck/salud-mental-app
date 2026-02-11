import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./features/auth/pages/login/login').then((m) => m.LoginComponent),
  },
  {
    path: 'employee',
    loadChildren: () =>
      import('./features/employee/employee.routes').then((m) => m.EMPLOYEE_ROUTES),
  },
  {
    path: 'hr',
    loadChildren: () => import('./features/hr/hr.routes').then((m) => m.HR_ROUTES),
  },
  {
    path: 'resources',
    loadChildren: () =>
      import('./features/resources/resources.routes').then((m) => m.RESOURCES_ROUTES),
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];
