import { Routes } from '@angular/router';
import { MainLayout } from '../../shared/layout/main-layout/main-layout';
import { DashboardHr } from './pages/dashboard-hr/dashboard-hr';
import { HrInbox } from './pages/inbox/inbox';

export const HR_ROUTES: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      { path: 'dashboard', component: DashboardHr },
      { path: 'inbox', component: HrInbox },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
];
