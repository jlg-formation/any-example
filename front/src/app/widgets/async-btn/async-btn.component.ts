import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { catchError, finalize, Observable, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-async-btn',
  imports: [FontAwesomeModule],
  templateUrl: './async-btn.component.html',
  styleUrl: './async-btn.component.scss',
})
export class AsyncBtnComponent {
  @Input('class')
  className = '';
  faCircleNotch = faCircleNotch;
  @Input()
  icon: IconDefinition | undefined = undefined;
  isRunning = false;

  @Input()
  action: Observable<void> = of(undefined);

  doAction() {
    return of(undefined).pipe(
      switchMap(() => {
        this.isRunning = true;
        return this.action;
      }),
      catchError((err) => {
        return of(undefined);
      }),
      finalize(() => {
        this.isRunning = false;
      }),
    );
  }
}
