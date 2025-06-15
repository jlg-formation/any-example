import { CommonModule } from '@angular/common';
import { Component, computed, OnDestroy, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { interval, tap } from 'rxjs';

@Component({
  selector: 'app-legal',
  templateUrl: './legal.component.html',
  styleUrl: './legal.component.scss',
  imports: [CommonModule],
})
export class LegalComponent implements OnInit {
  time = signal(new Date());
  startTime = new Date();
  chrono = computed(() =>
    ((this.time().getTime() - this.startTime.getTime()) / 1000).toFixed(),
  );

  constructor() {
    interval(1000)
      .pipe(
        tap(() => {
          console.log('adjusting time');
          this.time.set(new Date());
        }),
        takeUntilDestroyed(),
      )
      .subscribe();
  }

  ngOnInit(): void {}
}
