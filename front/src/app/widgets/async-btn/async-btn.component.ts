import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  input,
  Input,
  Output,
  signal,
} from '@angular/core';
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
  className = input('', {
    alias: 'class',
  });
  faCircleNotch = faCircleNotch;

  icon = input<IconDefinition>(faCircleNotch);
  isRunning = signal(false);

  action = input<Observable<void>>(of(undefined));

  @Output()
  setError = new EventEmitter<string>();

  doAction() {
    return of(undefined).pipe(
      switchMap(() => {
        this.setError.emit('');
        this.isRunning.set(true);
        return this.action();
      }),
      catchError((err) => {
        this.setError.emit('Erreur Technique');
        return of(undefined);
      }),
      finalize(() => {
        console.log('finalize');
        this.isRunning.set(false);
      }),
    );
  }
}
