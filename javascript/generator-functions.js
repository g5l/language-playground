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

subTitle('Scheduler example');

class Scheduler {
  #tasks = [];

  addTask(task) {
    this.#tasks.push(task);
  }

  run() {
    while (this.#tasks.length > 0) {
      const task = this.#tasks.shift();
      const result = task.next();

      if (!result.done) {
        this.#tasks.push(task); // add task back to queue
      }
    }
  }
}

function* task1() {
  console.log('Task 1: Step 1');
  yield;
  console.log('Task 1: Step 2');
  yield;
  console.log('Task 1: Step 3');
}

function* task2() {
  console.log('Task 2: Step A');
  yield;
  console.log('Task 2: Step B');
}

const scheduler = new Scheduler();
scheduler.addTask(task1());
scheduler.addTask(task2());
scheduler.run();


subTitle('Paginated Data Fetching');

async function* fetchAllPages(baseUrl, pageSize = 20) {
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const response = await fetch(`${baseUrl}?page=${page}&limit=${pageSize}`);
    const data = await response.json();

    for (const item of data.items) {
      yield item;
    }

    hasMore = data.items.length === pageSize;
    page++;
  }
}

async function processAllUsers() {
  for await (const user of fetchAllPages('/api/users')) {
    console.log('Processing:', user.name);
  }
}