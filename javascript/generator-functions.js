import {heading} from "logger.js";

heading('Generator Functions');

/* --- valid ways to create --- */

function* gen1() {}
function *gen2() {}
function * gen3() {}

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