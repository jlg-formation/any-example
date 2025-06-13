import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { BlackListService } from '../services/black-list.service';

export const blackListValidator: (
  blackListService: BlackListService,
) => ValidatorFn =
  (blackListService) =>
  (control: AbstractControl): ValidationErrors | null => {
    const blackList = blackListService.blackList;
    if (blackList.includes(control.value)) {
      return {
        blackList: 'Mot interdit',
      };
    }
    return null;
  };
