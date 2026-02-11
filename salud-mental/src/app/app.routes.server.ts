import { RenderMode, ServerRoute } from '@angular/ssr';
import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/pages/login/login';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
];

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
