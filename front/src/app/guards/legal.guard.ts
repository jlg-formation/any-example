import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { lastValueFrom, timer } from 'rxjs';

let haveYouReadLegalPage = false;

export const IHaveReadTheLegalPage = () => {
  console.log('I have read the legal page');
  haveYouReadLegalPage = true;
};

export const legalGuard: CanActivateFn = async (
  route,
  state
): Promise<boolean> => {
  const router = inject(Router);
  console.log('coucou legal check guards');
  await lastValueFrom(timer(2000));
  if (haveYouReadLegalPage === false) {
    router.navigateByUrl('/legal');
    return false;
  }
  return true;
};
