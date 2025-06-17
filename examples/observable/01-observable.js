import { Observable } from "rxjs";

const obs = new Observable((subscriber) => {
  subscriber.next(23);
  subscriber.next({ toto: "titi" });
  const timer = setTimeout(() => {
    subscriber.next({ toto: "tata" });
    // subscriber.error(new Error("oups"));
    subscriber.complete();
    console.log("hello");
  }, 1000);

  return () => {
    console.log("housekeeping");
    clearTimeout(timer);
  };
});

const subscription = obs.subscribe({
  next: (data) => {
    console.log("data: ", data);
  },
  complete: () => {
    console.log("complete");
  },
  error: (err) => {
    console.log("err: ", err);
  },
});

setTimeout(() => {
  subscription.unsubscribe();
}, 500);
