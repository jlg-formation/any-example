import {
  Attribute,
  Component,
  EventEmitter,
  Output,
  input,
  signal,
} from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

import {
  Observable,
  catchError,
  delay,
  finalize,
  of,
  switchMap,
  tap,
} from 'rxjs';

@Component({
  selector: 'app-async-btn',
  templateUrl: './async-btn.component.html',
  styleUrl: './async-btn.component.scss',
  imports: [FontAwesomeModule],
})
export class AsyncBtnComponent {
  action = input<Observable<void> | Promise<void>>(Promise.resolve());
  disabled = input(false);
  faCircleNotch = faCircleNotch;
  icon = input(faCircleNotch);
  isRunning = signal(false);

  @Output('setError')
  setErrorEmitter = new EventEmitter<string>();

  constructor(@Attribute('class') public className = '') {}

  startAction(): Observable<void> {
    return of(undefined).pipe(
      tap(() => {
        console.log('start action');
        this.setErrorEmitter.emit('');
        this.isRunning.set(true);
      }),
      delay(200),
      switchMap(() => {
        return this.action();
      }),
      catchError((err) => {
        console.log('err: ', err);
        if (err instanceof Error) {
          this.setErrorEmitter.emit(err.message);
        }
        return of(undefined);
      }),
      finalize(() => {
        this.isRunning.set(false);
      }),
    );
  }
}
