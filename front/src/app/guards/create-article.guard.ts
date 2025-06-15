import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { ArticleService } from '../services/article.service';

export const createArticleGuard: CanActivateFn = (route, state) => {
  const articleService = inject(ArticleService);
  if (articleService.articles && articleService.articles?.length > 5) {
    return false;
  }
  return true;
};
