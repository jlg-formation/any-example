import { interval, Observable, tap } from "rxjs";

const fois2 = (obs: Observable<number>) => {
  return new Observable<number>((subscriber) => {
    const s = obs.subscribe({
      next: (data) => {
        subscriber.next(2 * data);
      },
      error: (err) => {
        subscriber.error(err);
      },
      complete: () => {
        subscriber.complete();
      },
    });

    return () => {
      console.log("housekeeping");
      s.unsubscribe();
    };
  });
};

const plus1 = (obs: Observable<number>) => {
  return new Observable<number>((subscriber) => {
    const s = obs.subscribe({
      next: (data) => {
        subscriber.next(data + 1);
      },
      error: (err) => {
        subscriber.error(err);
      },
      complete: () => {
        subscriber.complete();
      },
    });

    return () => {
      console.log("housekeeping");
      s.unsubscribe();
    };
  });
};

console.log("start");
interval(1000)
  .pipe(
    fois2,
    fois2,
    plus1,
    tap({
      next: (data) => {
        console.log("data: ", data);
      },
      error: (err) => {
        console.log("err: ", err);
      },
      complete: () => {
        console.log("completed");
      },
    })
  )
  .subscribe();
