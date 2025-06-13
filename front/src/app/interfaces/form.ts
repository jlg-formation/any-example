import { AbstractControl } from '@angular/forms';

export type FG<T extends object> = {
  [key in keyof T]: AbstractControl<T[key]>;
};
