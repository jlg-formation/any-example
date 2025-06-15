import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { createArticleGuard } from './create-article.guard';

describe('createArticleGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => createArticleGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
