import { TestBed } from '@angular/core/testing';

import { ArticleService } from './article.service';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';

describe('ArticleService', () => {
  let service: ArticleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection(), provideHttpClient()],
    });
    service = TestBed.inject(ArticleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
