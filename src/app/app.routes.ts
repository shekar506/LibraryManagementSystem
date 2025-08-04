  import { Routes } from '@angular/router';
  import { Login } from './auth/login/login';
  import { AuthGuard } from './guards/auth-guard';
  import { AdminDashboard } from './dashboard/admin-dashboard';
  import { UserDashboard } from './dashboard/user-dashboard';
  import { AddBook } from './components/addbook/addbook';
  import { EditBookComponent } from './editbook/editbook';
  import { IssueHistoryComponent } from './issue-history/issue-history';
  import { ReturnBookComponent } from './return-book/return-book';
import { RegisterUser } from './register-user/register-user';

  export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: Login },
    {
      path: 'dashboard',
      canActivate: [AuthGuard],
      loadChildren: () => import('./dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES)
    },  {
      path: 'admin-home',
      component: AdminDashboard,
      canActivate: [AuthGuard]
    },
    
    {
      path: 'user-home',
      component: UserDashboard,
      canActivate: [AuthGuard]
    },
    {
      path: 'manage-books',
      canActivate: [AuthGuard],
      loadComponent: () => import('./admin/manage-books/manage-books').then(m => m.ManageBooks)
    },
    {
    path: 'manage-members',
    loadComponent: () => import('./components/managemembers/manage-members/manage-members').then(m => m.ManageMembersComponent)
  },
  {
    path: 'issue-book',
    canActivate: [AuthGuard],
    loadComponent: () => import('./admin/issue-book/issue-book').then(m => m.IssueBook)
  },
  {
    path: 'user-dashboard',
    loadComponent: () => import('./dashboard/user-dashboard').then(m => m.UserDashboard)
  },
  { path: 'add-book', component: AddBook},
  { path: 'edit-book/:id', component: EditBookComponent },
  {
    path: 'booklist',
    loadComponent: () => import('./admin/issue-book/issue-book').then(m => m.IssueBook)
  },
    { path: 'register', component: RegisterUser },

    { path: 'issue-history/:memberId', component: IssueHistoryComponent },
    {
  path: 'return-book',
  component: ReturnBookComponent,
  canActivate: [AuthGuard]  // optional if you want to restrict
}

  ];
