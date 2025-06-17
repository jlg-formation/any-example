import { DatePipe } from '@angular/common';
import {
  Component,
  computed,
  linkedSignal,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { interval, tap } from 'rxjs';

@Component({
  selector: 'app-legal',
  templateUrl: './legal.component.html',
  styleUrls: ['./legal.component.scss'],
  imports: [DatePipe],
})
export class LegalComponent implements OnInit {
  now = signal(new Date());

  readonly start = new Date();

  chrono = linkedSignal(() => {
    return ((this.now().getTime() - this.start.getTime()) / 1000).toFixed(0);
  });

  second = computed(() => {
    if (Number(this.chrono()) < 2) {
      return 'seconde';
    }
    return 'secondes';
  });

  constructor() {
    interval(1000)
      .pipe(
        tap(() => {
          this.now.set(new Date());
          console.log('nouvelle val: ', this.now());
        }),
        takeUntilDestroyed(),
      )
      .subscribe();
  }

  ngOnInit(): void {
    // this.chrono.set('-6');
  }
}
