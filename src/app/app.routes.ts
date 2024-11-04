import { Routes } from '@angular/router';

export const routes: Routes = [
  // feature based routes must be on top of the pages routes
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./features/user/user.module').then(m => m.UserModule)
  },
  {
    path: '',
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
  },

  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', redirectTo: '/pages' }
];
