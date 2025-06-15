import { Routes } from '@angular/router';

export const stockRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/list.component'),
    title: 'Liste des articles',
  },
  {
    path: 'create',
    loadComponent: () => import('./create/create.component'),
    title: 'Ajouter un article',
  },
];
