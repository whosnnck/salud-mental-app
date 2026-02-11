import { Routes } from '@angular/router';
import { MainLayout } from '../../shared/layout/main-layout/main-layout';
import { ResourceList } from './pages/resource-list/resource-list';

export const RESOURCES_ROUTES: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [{ path: '', component: ResourceList }],
  },
];
