import { Routes } from '@angular/router';

export default [
  { path: '', loadComponent: () => import('./list/list.component') },
  { path: 'create', loadComponent: () => import('./create/create.component') },
] satisfies Routes;
