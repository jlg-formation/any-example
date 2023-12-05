console.log("this: ", this);
console.log("globalThis: ", globalThis);

var aaaaaaa = 45678;

console.log("this: ", this);

function toto() {
  "use strict";
  console.log("this: ", this);
}

toto();

const titi = {
  tutu: toto,
};

titi.tutu();

const tata = toto.bind(123);

tata();
