import { interval, startWith, map, take } from "rxjs";

// const obs = take(4)(map((x) => x + 1)(startWith(-1)(interval(1000))));

const obs = interval(1000).pipe(
  startWith(-1),
  map((x) => x + 1),
  take(4)
);

const observer = {
  next: (x) => {
    console.log("x: ", x);
  },
  error: (err) => {
    console.log("err: ", err);
  },
  complete: () => {
    console.log("complete");
  },
};

obs.subscribe(observer);
