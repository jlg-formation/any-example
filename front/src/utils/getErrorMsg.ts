import { FormControl } from '@angular/forms';

export const getErrorMsg = (c: FormControl): string => {
  if (c.errors?.['required']) {
    return 'Champ Obligatoire';
  }
  if (c.errors?.['minlength']) {
    return `Champ trop court (${c.errors?.['minlength'].actualLength} < ${c.errors?.['minlength'].requiredLength})`;
  }
  if (c.errors?.['blackList']) {
    return c.errors?.['blackList'];
  }
  return '';
};
