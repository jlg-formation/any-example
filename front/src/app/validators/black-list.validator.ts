import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { delay, map, Observable, of, switchMap } from 'rxjs';
import { BlackListService } from '../services/black-list.service';

export const blackListValidator: (
  blackListService: BlackListService,
) => AsyncValidatorFn =
  (blackListService) =>
  (control: AbstractControl): Observable<ValidationErrors | null> => {
    return of(undefined).pipe(
      delay(500),
      switchMap(() => {
        return blackListService.isBlackListed(control.value);
      }),
      map((isBlackListed: boolean) => {
        console.log('isBlackListed: ', isBlackListed);
        if (isBlackListed) {
          return {
            blackList: true,
          };
        }
        return null;
      }),
    );
  };
