import { heading, subTitle, log } from "./logger.js";

heading('Array Methods');

const tasks = [
  { id: 1, title: 'Write tests',     done: true,  priority: 2 },
  { id: 2, title: 'Fix bug #42',     done: false, priority: 1 },
  { id: 3, title: 'Code review',     done: true,  priority: 3 },
  { id: 4, title: 'Deploy staging',  done: false, priority: 1 },
  { id: 5, title: 'Update docs',     done: false, priority: 2 },
];

subTitle('1. forEach');

tasks.forEach((task, index) => {
  console.log(`  [${index}] ${task.title} (done: ${task.done})`);
});


subTitle('2. map');

const titles = tasks.map(t => t.title);
console.log('titles:', titles);

const labeled = tasks.map(t => `[P${t.priority}] ${t.title}`);
console.log('labeled:', labeled);


subTitle('3. filter');

const pending = tasks.filter(t => !t.done);
console.log('pending:', pending.map(t => t.title));

const highPriority = tasks.filter(t => t.priority === 1);
console.log('high priority:', highPriority.map(t => t.title));


subTitle('4. find');

const firstPending = tasks.find(t => !t.done);
console.log('first pending:', firstPending?.title);

const notFound = tasks.find(t => t.id === 999);
console.log('not found:', notFound);


subTitle('5. some & every');

console.log('some done:', tasks.some(t => t.done));
console.log('every done:', tasks.every(t => t.done));
console.log('every has title:', tasks.every(t => t.title.length > 0));


subTitle('6. reduce');


const doneCount = tasks.reduce((count, t) => count + (t.done ? 1 : 0), 0);
console.log('done count:', doneCount);


const byPriority = tasks.reduce((acc, t) => {
  (acc[t.priority] ??= []).push(t.title);
  return acc;
}, {});
console.log('by priority:', byPriority);


const lookup = tasks.reduce((map, t) => {
  map[t.id] = t.title;
  return map;
}, {});
console.log('lookup:', lookup);


subTitle('7. includes & indexOf');

const nums = [10, 20, 30, NaN, 40];

console.log('includes(20):', nums.includes(20));
console.log('includes(99):', nums.includes(99));
console.log('includes(NaN):', nums.includes(NaN)); // true

console.log('indexOf(20):', nums.indexOf(20));
console.log('indexOf(99):', nums.indexOf(99)); // -1
console.log('indexOf(NaN):', nums.indexOf(NaN)); // -1


subTitle('8. slice vs splice');

const letters = ['a', 'b', 'c', 'd', 'e'];

const sliced = letters.slice(1, 3);
console.log('slice(1,3):', sliced);
console.log('original after slice:', letters);

const spliceTarget = [...letters];
const removed = spliceTarget.splice(1, 2, 'X', 'Y');
console.log('splice removed:', removed);
console.log('after splice:', spliceTarget);

const spliceTarget2 = [...letters];
const removed2 = spliceTarget2.splice(1, 3);
console.log('splice removed:', removed2);
console.log('after splice:', spliceTarget2);

subTitle('9. concat & join');

const arr1 = [1, 2];
const arr2 = [3, 4];
const arr3 = [5];

console.log('concat:', arr1.concat(arr2, arr3));
console.log('original unchanged:', arr1);

const words = ['Hello', 'World'];
console.log('join:", ":', words.join(', '));
console.log('join default:', words.join());
console.log('join empty:', words.join(''));


subTitle('10. push / pop / shift / unshift');

const stack = [1, 2, 3];
stack.push(4);
console.log('after push(4):', stack);

const popped = stack.pop();
console.log('pop():', popped, '->', stack);

const shifted = stack.shift();
console.log('shift():', shifted, '->', stack);

stack.unshift(0);
console.log('unshift(0):', stack);


subTitle('11. sort & reverse (mutating)');

const unsorted = [30, 1, 100, 20, 4];
const copy = [...unsorted];

copy.sort((a, b) => a - b);
console.log('sorted asc:', copy);

copy.reverse();
console.log('reversed:', copy);


subTitle('12. Array.from, Array.of, Array.isArray');

console.log('from string:', Array.from('hello'));
console.log('from Set:', Array.from(new Set([1, 2, 2, 3])));

// Array.of — creates array from arguments (unlike new Array)
console.log('Array.of(3):', Array.of(3)); // [3]
console.log('new Array(3):', new Array(3)); // [ <3 empty items> ]

// Array.isArray
console.log('isArray([]):', Array.isArray([]));
console.log('isArray("hi"):', Array.isArray('hi'));
console.log('isArray(arguments-like):', Array.isArray({ length: 0 }));

subTitle('13. Destructuring, spread & rest');

const [first, second, ...rest] = [10, 20, 30, 40, 50];
console.log('first:', first);
console.log('second:', second);
console.log('rest:', rest);

// skip elements
const [, , third] = ['a', 'b', 'c', 'd'];
console.log('skip to third:', third);

// default values
const [x = 0, y = 0, z = 0] = [1, 2];
console.log('with defaults:', x, y, z);

// swap variables
let left = 'L', right = 'R';
[left, right] = [right, left];
console.log('swapped:', left, right);

// spread to merge
const merged = [...[1, 2], ...[3, 4]];
console.log('spread merge:', merged);

// spread to copy (shallow)
const orig = [{ a: 1 }, { a: 2 }];
const copied = [...orig];
copied[0].a = 99;
console.log('shallow copy trap:  orig[0].a:', orig[0].a);  // 99
