import { heading, subTitle, log } from "./logger.js";

heading('Map & Set');

subTitle('1. Map: constructor & basic operations');

const map = new Map([
  ['name', 'Gabriel'],
  ['role', 'engineer'],
  ['lang', 'JavaScript'],
]);

console.log('size:', map.size);
console.log('get name:', map.get('name'));
console.log('has role:', map.has('role'));
console.log('has missing:', map.has('age'));

map.set('level', 'senior');
map.delete('lang');
console.log('after set & delete, size:', map.size);


subTitle('2. Map iteration');

console.log('for...of entries:');
for (const [key, value] of map) {
  console.log(`  ${key} → ${value}`);
}

console.log('keys:', [...map.keys()]);
console.log('values:', [...map.values()]);

console.log('forEach:');
map.forEach((value, key) => {
  console.log(`  ${key}: ${value}`);
});


subTitle('3. Map: non-string keys');

const objKey = { id: 1 };
const fnKey = () => {};
const mapWithComplexKeys = new Map();

mapWithComplexKeys.set(objKey, 'object as key');
mapWithComplexKeys.set(fnKey, 'function as key');
mapWithComplexKeys.set(42, 'number as key');
mapWithComplexKeys.set(true, 'boolean as key');

console.log('obj key:', mapWithComplexKeys.get(objKey));
console.log('fn key:', mapWithComplexKeys.get(fnKey));
console.log('number key:', mapWithComplexKeys.get(42));

console.log('{ id: 1 } lookup:', mapWithComplexKeys.get({ id: 1 }));

subTitle('4. Map: Object conversions');

const obj = { a: 1, b: 2, c: 3 };
const fromObj = new Map(Object.entries(obj));
console.log('Object → Map:', fromObj);

const backToObj = Object.fromEntries(fromObj);
console.log('Map → Object:', backToObj);


subTitle('5. Set: basics & iteration');

const set = new Set([1, 2, 3, 2, 1, 4]);
console.log('from array with dupes:', set);
console.log('size:', set.size);

set.add(5);
set.add(3);
set.delete(1);
console.log('has(2):', set.has(2));
console.log('has(1) after delete:', set.has(1));
console.log('after mutations:', set);

console.log('for...of:');
for (const val of set) {
  console.log(' ', val);
}

console.log('keys() === values():', [...set.keys()].join(',') === [...set.values()].join(','));
console.log('entries:', [...set.entries()]);  // [value, value] pairs

set.forEach(val => process.stdout.write(`${val} `));
console.log('← forEach');

subTitle('6. Set: deduplication & set operations');

const arr = [1, 2, 3, 4, 3, 2, 5, 1];
const unique = [...new Set(arr)];
console.log('dedupe:', unique);

const setA = new Set([1, 2, 3, 4, 5]);
const setB = new Set([3, 4, 5, 6, 7]);

const union = new Set([...setA, ...setB]);
console.log('union:', [...union]);

const intersection = new Set([...setA].filter(x => setB.has(x)));
console.log('intersection:', [...intersection]);

const difference = new Set([...setA].filter(x => !setB.has(x)));
console.log('difference A-B:', [...difference]);

const symDiff = new Set([...setA].filter(x => !setB.has(x)).concat([...setB].filter(x => !setA.has(x))));
console.log('symmetric diff:', [...symDiff]);

subTitle('7. Set built-in operations (ES2025)');

try {
  const s1 = new Set([1, 2, 3, 4, 5]);
  const s2 = new Set([3, 4, 5, 6, 7]);

  console.log('s1.union(s2):', s1.union(s2));
  console.log('s1.intersection(s2):', s1.intersection(s2));
  console.log('s1.difference(s2):', s1.difference(s2));
  console.log('s1.symmetricDifference(s2):', s1.symmetricDifference(s2));
  console.log('s1.isSubsetOf(s2):', s1.isSubsetOf(s2));
  console.log('s1.isSupersetOf(new Set([1,2])):', s1.isSupersetOf(new Set([1, 2])));
  console.log('s1.isDisjointFrom(new Set([8,9])):', s1.isDisjointFrom(new Set([8, 9])));
} catch (e) {
  console.log('ES2025 Set methods not available in this runtime:', e.message);
}

subTitle('8. WeakSet');

const weakSet = new WeakSet();

let objA = { name: 'A' };
let objB = { name: 'B' };

weakSet.add(objA);
weakSet.add(objB);

console.log('has objA:', weakSet.has(objA));
console.log('has objB:', weakSet.has(objB));

weakSet.delete(objB);
console.log('has objB after delete:', weakSet.has(objB));

const visited = new WeakSet();

function processOnce(node) {
  if (visited.has(node)) return 'already processed';
  visited.add(node);
  return `processing ${node.id}`;
}

const node1 = { id: 'n1' };
console.log(processOnce(node1));
console.log(processOnce(node1));

subTitle('9. Collection ↔ Array conversions');

const fromSet = Array.from(new Set([1, 2, 3]));
console.log('Set → Array:', fromSet);

const fromMap = Array.from(new Map([['a', 1], ['b', 2]]));
console.log('Map → Array:', fromMap);

const mapForConv = new Map([['x', 10], ['y', 20]]);
console.log('Map keys → Array:', [...mapForConv.keys()]);
console.log('Map values → Array:', [...mapForConv.values()]);

subTitle('10. clear()');

const tempMap = new Map([['a', 1], ['b', 2]]);
const tempSet = new Set([1, 2, 3]);

console.log('map size before clear:', tempMap.size);
tempMap.clear();
console.log('map size after clear:', tempMap.size);

console.log('set size before clear:', tempSet.size);
tempSet.clear();
console.log('set size after clear:', tempSet.size);
