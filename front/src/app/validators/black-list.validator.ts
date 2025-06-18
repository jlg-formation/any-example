import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const blackListValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  if (['zut', 'crotte'].includes(control.value)) {
    return {
      blackList: true,
    };
  }
  return null;
};
