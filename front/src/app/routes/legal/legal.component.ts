import { DatePipe } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { interval, Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-legal',
  templateUrl: './legal.component.html',
  styleUrls: ['./legal.component.scss'],
  imports: [DatePipe],
})
export class LegalComponent {
  dateTime = signal(new Date());
  origin = this.dateTime();
  seconds = computed(() => {
    return ((this.dateTime().getTime() - this.origin.getTime()) / 1000).toFixed(0);
  });
  subscr: Subscription;
  constructor() {
    this.subscr = interval(1000)
      .pipe(
        tap(() => {
          this.dateTime.set(new Date());
          console.log('date = ' + this.dateTime());
        }),
        takeUntilDestroyed(),
      )
      .subscribe();
  }
}
