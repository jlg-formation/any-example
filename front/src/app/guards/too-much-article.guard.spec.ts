import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { tooMuchArticleGuard } from './too-much-article.guard';

describe('tooMuchArticleGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => tooMuchArticleGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
