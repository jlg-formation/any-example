import { CommonModule } from '@angular/common';
import { Component, computed, OnDestroy, OnInit, signal } from '@angular/core';

import { Subscription, interval, tap } from 'rxjs';

@Component({
  selector: 'app-legal',
  templateUrl: './legal.component.html',
  styleUrls: ['./legal.component.scss'],
  imports: [CommonModule],
})
export class LegalComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  time = signal(new Date());
  startTime = new Date();
  chrono = computed(() =>
    ((this.time().getTime() - this.startTime.getTime()) / 1000).toFixed(),
  );

  constructor() {
    this.subscription = interval(1000)
      .pipe(
        tap(() => {
          console.log('adjusting time');
          this.time.set(new Date());
        }),
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {}
}
