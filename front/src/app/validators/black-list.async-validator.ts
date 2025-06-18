import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { delay, map, Observable, of } from 'rxjs';

export const blackListAsyncValidator: AsyncValidatorFn = (
  control: AbstractControl,
): Observable<ValidationErrors | null> => {
  return of(undefined).pipe(
    delay(500),
    map(() => {
      console.log('control.value: ', control.value);

      if (['toto', 'titi'].includes(control.value)) {
        return {
          blackList: true,
        };
      }
      return null;
    }),
  );
};
