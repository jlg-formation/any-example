import { Directive, ElementRef, inject, Input, OnInit } from '@angular/core';

type Mode = 'select' | 'focus';

@Directive({
  selector: '[appAutofocus]',
})
export class AutofocusDirective implements OnInit {
  @Input('appAutofocus')
  mode: Mode = 'select';

  elt: ElementRef<HTMLElement> = inject(ElementRef<HTMLElement>);

  constructor() {
    console.log('appAutofocus instantiated.');
  }

  ngOnInit(): void {
    console.log('this.mode: ', this.mode);
    if (this.elt.nativeElement instanceof HTMLInputElement) {
      if (this.mode === 'select') {
        this.elt.nativeElement.select();
        return;
      }
      this.elt.nativeElement.focus();
      return;
    }
    this.elt.nativeElement.focus();
  }
}
