import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { ArticleService } from '../services/article.service';
import { inject } from '@angular/core';

export const tooMuchArticleGuard: CanActivateFn = (route, state) => {
  const articleService = inject(ArticleService);
  const router = inject(Router);

  const articles = articleService.articles();
  if (articles === undefined) {
    return false;
  }

  if (articles.length > 5) {
    return router.parseUrl('/legal');
  }
  return true;
};
