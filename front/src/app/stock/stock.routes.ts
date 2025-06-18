import { Routes } from '@angular/router';
import { tooMuchArticleGuard } from '../guards/too-much-article.guard';

export default [
  { path: '', loadComponent: () => import('./list/list.component') },
  {
    path: 'create',
    loadComponent: () => import('./create/create.component'),
    canActivate: [tooMuchArticleGuard],
  },
] satisfies Routes;
