import { Observable } from "rxjs";

const obs = new Observable<unknown>((subscriber) => {
  subscriber.next(123);
  const timer = setTimeout(() => {
    subscriber.next(456);
    subscriber.error(new Error("titi"));
    subscriber.next(457);
    console.log("aaa");
  }, 1000);

  return () => {
    console.log("housekeeping");
    clearTimeout(timer);
  };
});

const subscription = obs.subscribe({
  next: (data) => {
    if (typeof data !== "string") {
      console.log("data: ", data);
      return;
    }
    console.log("data: ", data.toLowerCase());
  },
  error: (err) => {
    console.log("err: ", err);
  },
  complete: () => {
    console.log("completed");
  },
});

setTimeout(() => {
  subscription.unsubscribe();
}, 500);
