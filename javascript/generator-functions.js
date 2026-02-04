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

function* countTo(n) {
  for (let i = 1; i <= n; i++) {
    yield i;
  }
}

console.log([...countTo(5)]); // [1, 2, 3, 4, 5]

subTitle('Chat example');

function* conversation() {
  const name = yield 'What is your name?';
  const age = yield `Hello ${name}! How old are you?`;
  return `${name} is ${age} years old`;
}

const chat = conversation();

console.log(chat.next().value);
console.log(chat.next('Gabriel').value);
console.log(chat.next(28).value); 