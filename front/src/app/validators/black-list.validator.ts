import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const blackListValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const blackList = ['zut', 'mince'];
  if (blackList.includes(control.value)) {
    return {
      blackList: 'Mot interdit',
    };
  }
  return null;
};
