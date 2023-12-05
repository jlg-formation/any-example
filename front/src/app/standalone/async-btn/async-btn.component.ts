import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleNotch, faCoffee } from '@fortawesome/free-solid-svg-icons';
import { delay, finalize, of, tap } from 'rxjs';

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

  doSomething() {
    of(undefined)
      .pipe(
        tap(() => {
          this.isDoing = true;
        }),
        delay(2000),
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
