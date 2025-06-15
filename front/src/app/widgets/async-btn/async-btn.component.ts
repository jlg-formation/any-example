import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
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
  readonly cd = inject(ChangeDetectorRef);

  @Input() action: Observable<void> | Promise<void> = Promise.resolve();
  @Input() class = '';
  @Input() disabled = false;
  faCircleNotch = faCircleNotch;
  @Input()
  icon: IconDefinition = faCircleNotch;
  isRunning = false;

  @Output('setError')
  setErrorEmitter = new EventEmitter<string>();

  startAction(): Observable<void> {
    return of(undefined).pipe(
      tap(() => {
        console.log('start action');
        this.setErrorEmitter.emit('');
        this.isRunning = true;
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
        this.isRunning = false;
        this.cd.markForCheck();
      }),
    );
  }
}
