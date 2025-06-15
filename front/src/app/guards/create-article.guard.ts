import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ArticleService } from '../services/article.service';

export const createArticleGuard: CanActivateFn = (route, state) => {
  const articleService = inject(ArticleService);
  const router = inject(Router);
  if (articleService.articles && articleService.articles?.length > 5) {
    return router.parseUrl('/legal');
  }
  return true;
};
