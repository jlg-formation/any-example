// @ts-nocheck
import { BehaviorSubject } from "rxjs";

const subject = new BehaviorSubject("toto");

console.log("subject.value: ", subject.value);

subject.next(56);
subject.next("toto");

setTimeout(() => {
  subject.next(false);
}, 2000);

const observer = (name) => ({
  next: (x) => {
    console.log(`${name}: `, x);
  },
  error: (err) => {
    console.log("err: ", err);
  },
  complete: () => {
    console.log("complete");
  },
});

const subscription = subject.subscribe(observer("s1"));
subject.subscribe(observer("s2"));
subject.subscribe(observer("s3"));
subject.subscribe(observer("s4"));
subject.subscribe(observer("s5"));

setTimeout(() => {
  subscription.unsubscribe();
}, 500);
