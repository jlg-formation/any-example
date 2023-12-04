import { Observable } from "rxjs";

const obs = new Observable((s) => {
  s.next(34);
  s.next("toto");
  const timer = setTimeout(() => {
    console.log("coucou");
    s.next(false);
    s.error(new Error("oups"));
  }, 1000);

  return () => {
    console.log("hop menage");
    clearTimeout(timer);
  };
});

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

const subscription = obs.subscribe(observer);

setTimeout(() => {
  subscription.unsubscribe();
}, 500);
