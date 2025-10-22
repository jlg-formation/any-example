import { Component, EventEmitter, input, Input, output, Output, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { catchError, finalize, Observable, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-async-btn',
  imports: [FontAwesomeModule],
  templateUrl: './async-btn.component.html',
  styleUrl: './async-btn.component.css',
})
export class AsyncBtnComponent {
  isPrimary = input(false);

  action = input<Observable<void>>(of(undefined));

  icon = input(faCircleNotch);

  setError = output<unknown>();

  faCircleNotch = faCircleNotch;

  isRunning = signal(false);

  doAction(): Observable<void> {
    console.log('do action');
    return of(undefined).pipe(
      switchMap(() => {
        this.isRunning.set(true);
        this.setError.emit(undefined);
        return this.action();
      }),
      catchError((err) => {
        this.setError.emit(err);
        return of(undefined);
      }),
      finalize(() => {
        this.isRunning.set(false);
      }),
    );
  }
}
