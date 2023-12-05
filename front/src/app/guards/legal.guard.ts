import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Observable, delay, lastValueFrom, map, of, timer } from 'rxjs';

let haveYouReadLegalPage = false;

export const IHaveReadTheLegalPage = () => {
  console.log('I have read the legal page');
  haveYouReadLegalPage = true;
};

export const legalGuard: CanActivateFn = (
  route,
  state
): Observable<boolean> => {
  const router = inject(Router);
  console.log('coucou legal check guards');
  return of(undefined).pipe(
    delay(100),
    map(() => {
      // if (haveYouReadLegalPage === false) {
      //   router.navigateByUrl('/legal');
      //   return false;
      // }
      return true;
    })
  );
};
