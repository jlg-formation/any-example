import {
  Attribute,
  Component,
  EventEmitter,
  Input,
  Output,
  signal,
} from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  IconDefinition,
  faCircleNotch,
} from '@fortawesome/free-solid-svg-icons';

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
  @Input() action: Observable<void> | Promise<void> = Promise.resolve();
  @Input() disabled = false;
  faCircleNotch = faCircleNotch;
  @Input()
  icon: IconDefinition = faCircleNotch;
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
        if (this.action instanceof Observable) {
          return this.action;
        }
        return this.action;
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
