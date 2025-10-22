import { TestBed } from '@angular/core/testing';

import { ArticleService } from './article.service';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

describe('ArticleService', () => {
  let service: ArticleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection(), provideRouter([]), provideHttpClient()],
    });
    service = TestBed.inject(ArticleService);
  });

  it('should be created', () => {
    service.add2({ name: '', price: 0, qty: 0 });
    expect(service).toBeTruthy();
  });
});
