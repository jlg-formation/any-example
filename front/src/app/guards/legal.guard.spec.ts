import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { legalGuard } from './legal.guard';
import { Observable } from 'rxjs';

describe('legalGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => {
      (
        legalGuard(...guardParameters) as unknown as Observable<any>
      ).subscribe();
      return true;
    });

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
