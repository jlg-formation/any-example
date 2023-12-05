import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleNotch, faCoffee } from '@fortawesome/free-solid-svg-icons';
import { delay, finalize, of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-async-btn',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './async-btn.component.html',
  styleUrl: './async-btn.component.scss',
})
export class AsyncBtnComponent {
  isDoing = false;
  faCircleNotch = faCircleNotch;

  @Input()
  icon = faCoffee;

  @Input()
  action: () => Promise<void> = async (): Promise<void> => {};

  doSomething() {
    of(undefined)
      .pipe(
        tap(() => {
          this.isDoing = true;
        }),
        delay(300),
        switchMap(() => {
          return this.action();
        }),
        tap(() => {
          console.log('coucou');
        }),
        finalize(() => {
          this.isDoing = false;
        })
      )
      .subscribe();
  }
}
