import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { delay, map, Observable, of } from 'rxjs';

export const blackListValidator: AsyncValidatorFn = (
  control: AbstractControl,
): Observable<ValidationErrors | null> => {
  return of(undefined).pipe(
    delay(500),
    map(() => {
      console.log('control.value: ', control.value);

      if (['zut', 'crotte'].includes(control.value)) {
        return {
          blackList: true,
        };
      }
      return null;
    }),
  );
};
