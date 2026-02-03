import {heading, subTitle} from "./logger.js";

heading('Generator Functions');

/* ----- Syntax variation ----- */

// function* myGenerator() {
//   yield 'a';
// }
//
// const myGenerator = function* () {
//   yield 'a';
// };
//
// const myGenerator = function* namedGenerator() {
//   yield 'a';
// };
//
// const obj = {
//   *myGenerator() {
//     yield 'a';
//   }
// };
//
// class MyClass {
//   *myGenerator() {
//     yield 'a';
//   }
// }

/* --- valid ways to create --- */

// function* gen1() {}
// function *gen2() {}
// function * gen3() {}

/* ----------- Code ------------ */

function* generatorFunction() {
  yield 1;
  yield 2;
  yield 3;
}

const generator = generatorFunction();

console.log({generator: generator.next()});
console.log({generator: generator.next()});
console.log({generator: generator.next()});
console.log({generator: generator.next()});

subTitle('Key world yield');

function* demo() {
  yield 1;

  yield 2;

  const x = yield 3;

  return 'done';
}

console.log({yield: [...demo()]})