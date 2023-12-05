import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: 'input[appAutofocus],textarea[appAutofocus]',
})
export class AutofocusDirective implements OnInit {
  constructor(private elt: ElementRef<HTMLInputElement | HTMLTextAreaElement>) {
    console.log('instantiate directive', this.elt.nativeElement);
  }
  ngOnInit(): void {
    this.elt.nativeElement.select();
  }
}
