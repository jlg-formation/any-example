import { BehaviorSubject } from "rxjs";

const observer = (str) => {
  return {
    next: (data) => {
      console.log(`${str}: `, data);
    },
    complete: () => {
      console.log("complete");
    },
    error: (err) => {
      console.log("err: ", err);
    },
  };
};

const subject = new BehaviorSubject(12);

const a1 = subject.subscribe(observer("a1"));
const a2 = subject.subscribe(observer("a2"));

subject.next(34);
subject.next(45);

a1.unsubscribe();

subject.next(56);
