import { log, heading, separator } from './logger.mjs';

const users = [
  { name: 'Alice', role: 'admin' },
  { name: 'Bob', role: 'user' },
  { name: 'Carol', role: 'admin' },
  { name: 'Dave', role: 'user' },
  { name: 'Eve', role: 'guest' },
];

console.log('Users input:');
log(users);

heading('Object - by role');
const usersByRoleObj = Object.groupBy(users, (u) => u.role);
log(usersByRoleObj);

heading('Map - by role');
const usersByRoleMap = Map.groupBy(users, (u) => u.role);
log(usersByRoleMap);

separator();

const numbers = [1, 2, 3, 4, 5, 6];
console.log('\nNumbers input:', numbers);

heading('Object - even/odd');
const evenOddObj = Object.groupBy(numbers, (n) => n % 2 === 0);
log(evenOddObj);

heading('Map - even/odd');
const evenOddMap = Map.groupBy(numbers, (n) => n % 2 === 0);
log(evenOddMap);

separator();

const words = ['a', 'to', 'tea', 'ted', 'ten', 'i', 'in'];
console.log('\nWords input:', words);

heading('Object - by word length');
const byLenObj = Object.groupBy(words, (w) => w.length);
log(byLenObj);

heading('Map - by first letter');
const byFirstLetterMap = Map.groupBy(words, (w) => w.at(0));
log(byFirstLetterMap);

separator();

heading('Convert Map -> Object (stringifying keys)');
const mapToObject = (m) => Object.fromEntries(
  [...m.entries()].map(([k, v]) => [String(k), v])
);
console.log('from evenOddMap:');
log(mapToObject(evenOddMap));

heading('Convert Object -> Map');
const objectToMap = (o) => new Map(Object.entries(o));
console.log('from byLenObj:');
log(objectToMap(byLenObj))
