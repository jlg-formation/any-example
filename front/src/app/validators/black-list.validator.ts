import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const blackListValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  console.log('control.value: ', control.value);

  if (['zut', 'crotte'].includes(control.value)) {
    return {
      blackList: true,
    };
  }
  return null;
};
