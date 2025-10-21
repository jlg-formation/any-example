import { AbstractControl, ValidatorFn } from '@angular/forms';

export const blackListValidator: ValidatorFn = (control: AbstractControl) => {
  const blackList = ['crotte', 'fichtre'];
  if (typeof control.value === 'string') {
    if (blackList.includes(control.value.toLowerCase())) {
      return {
        blackList: 'Gros mot interdit',
      };
    }
  }

  return null;
};
