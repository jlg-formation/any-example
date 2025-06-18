import { FormControl, FormGroup } from '@angular/forms';

export const getErrorMessage = (f: FormGroup, fieldName: string): string => {
  const field = f.controls[fieldName];

  if (field.valid) {
    return '';
  }

  if (field.errors === null) {
    return '';
  }

  console.log('field.errors: ', field.errors);
  if ('required' in field.errors) {
    return 'Champ Obligatoire';
  }
  if ('maxlength' in field.errors) {
    return `Champ trop long (${field.errors['maxlength'].actualLength}>${field.errors['maxlength'].requiredLength})`;
  }
  if ('blackList' in field.errors) {
    return `Mot interdit`;
  }

  return '';
};
