import { Routes } from '@angular/router';
import { tooMuchArticleGuard } from '../guards/too-much-article.guard';

export default [
  {
    path: '',
    loadComponent: () => import('./list/list.component'),
    title: 'Liste',
  },
  {
    path: 'create',
    loadComponent: () => import('./create/create.component'),
    canActivate: [tooMuchArticleGuard],
    title: 'Ajout article',
  },
] satisfies Routes;
