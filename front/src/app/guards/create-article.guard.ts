import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ArticleService } from '../services/article.service';

export const createArticleGuard: CanActivateFn = (route, state) => {
  const articleService = inject(ArticleService);
  const router = inject(Router);
  const articles = articleService.articles.value();
  if (articles && articles.length > 5) {
    return router.parseUrl('/legal');
  }
  return true;
};
