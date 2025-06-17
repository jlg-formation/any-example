import { interval, Observable, map, startWith } from "rxjs";

const observer = {
  next: (data) => {
    console.log("data: ", data);
  },
  complete: () => {
    console.log("complete");
  },
  error: (err) => {
    console.log("err: ", err);
  },
};

const incr = (o) => {
  return new Observable((s) => {
    const s2 = o.subscribe({
      next: (data) => s.next(data + 1),
      error: (err) => s.error(err),
      complete: () => s.complete(),
    });

    return () => {
      s2.unsubscribe();
    };
  });
};

console.log("start");

interval(1000)
  .pipe(
    map((x) => x + 1),
    startWith(0)
  )
  .subscribe(observer);
