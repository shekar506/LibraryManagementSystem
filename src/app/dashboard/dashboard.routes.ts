import { Routes } from '@angular/router';
import { AdminDashboard } from './admin-dashboard';
import { UserDashboard } from './user-dashboard';

export const DASHBOARD_ROUTES: Routes = [
  { path: 'admin', component: AdminDashboard },
  { path: 'user', component: UserDashboard  }
];
