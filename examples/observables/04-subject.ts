import { BehaviorSubject, interval, Observable, Subject, tap } from "rxjs";

const observer = (name: string) => ({
  next: (data: unknown) => {
    console.log(`data (${name}): `, data);
  },
  error: (err: unknown) => {
    console.log("err: ", err);
  },
  complete: () => {
    console.log("completed");
  },
});

const s1 = new BehaviorSubject(34);

const subs1 = s1.subscribe(observer("a1"));
const subs2 = s1.subscribe(observer("a2"));

s1.next(45);
