import { Routes } from '@angular/router';
export const productRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/list').then((c) => c.List),
  },
  {
    path: 'new',
    loadComponent: () => import('./form/form').then((c) => c.Form)
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./form/form').then((c) => c.Form),
  }
];
