import { Directive } from '@angular/core';

@Directive({
  selector: 'input[appAutofocus],textarea[appAutofocus]',
})
export class AutofocusDirective {
  constructor() {
    console.log('instantiate directive');
  }
}
