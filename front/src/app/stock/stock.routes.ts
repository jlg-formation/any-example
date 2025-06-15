import { Routes } from '@angular/router';
import { createArticleGuard } from '../guards/create-article.guard';

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
    canActivate: [createArticleGuard],
  },
];
