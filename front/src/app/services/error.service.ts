import { Injectable } from '@angular/core';
import { FormGroup, AbstractControl, FormControl } from '@angular/forms';
import { FG } from '../interfaces/form';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  getErrorMessage<T extends object>(f: FormGroup<FG<T>>, fieldName: keyof T) {
    console.log('getErrorMessage', fieldName);
    if (f.valid || f.controls[fieldName].valid || f.untouched) {
      return '';
    }

    const field: FormControl = f.controls[fieldName] as FormControl;
    if (field.errors === null) {
      return '';
    }
    if ('blackList' in field.errors) {
      return 'Mot interdit';
    }
    if ('maxlength' in field.errors) {
      return `Mot trop long (${field.errors['maxlength'].actualLength}>${
        field.errors['maxlength'].requiredLength
      })`;
    }
    if ('min' in field.errors) {
      if (field.errors['min'].min === 0) {
        return 'Le nombre doit être positif.';
      }
    }
    if ('required' in field.errors) {
      return 'Champ obligatoire.';
    }
    return 'Champ incorrect pour raison inconnue.';
  }
}
