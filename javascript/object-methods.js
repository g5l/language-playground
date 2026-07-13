import { heading, subTitle, log } from "./logger.js";

heading('Object Methods & Patterns');

subTitle('1. Object.keys, Object.values, Object.entries');

const user = { name: 'Gabriel', role: 'engineer', level: 'senior' };

console.log('keys:', Object.keys(user));
console.log('values:', Object.values(user));
console.log('entries:', Object.entries(user));


const uppercased = Object.fromEntries(
  Object.entries(user).map(([k, v]) => [k, v.toUpperCase()])
);
console.log('uppercased:', uppercased);


subTitle('2. Object.assign');

const defaults = { theme: 'light', lang: 'en', debug: false };
const overrides = { theme: 'dark', debug: true };

const config = Object.assign({}, defaults, overrides);
console.log('merged config:', config);

const a = { x: 1 };
const b = { x: 2, y: 3 };
const c = { y: 4, z: 5 };
console.log('multi-merge:', Object.assign({}, a, b, c));

subTitle('3. Object.freeze & Object.seal');

const frozen = Object.freeze({ name: 'Gabriel', scores: [90, 85] });

try { frozen.name = 'Bob'; } catch (e) {
  console.log('frozen assign:', e.message);
}
try { frozen.age = 30; } catch (e) {
  console.log('frozen add prop:', e.message);
}
console.log('frozen object:', frozen);
console.log('isFrozen:', Object.isFrozen(frozen));

frozen.scores.push(100);
console.log('nested mutation still works:', frozen.scores);

const sealed = Object.seal({ name: 'Bob', age: 25 });
sealed.name = 'Robert';
try { sealed.email = 'bob@test.com'; } catch (e) {
  console.log('sealed add prop:', e.message);
}
try { delete sealed.age; } catch (e) {
  console.log('sealed delete:', e.message);
}
console.log('sealed object:', sealed);
console.log('isSealed:', Object.isSealed(sealed));

subTitle('4. Object.defineProperty & descriptors');

const product = {};

Object.defineProperty(product, 'id', {
  value: 42,
  writable: false,
  enumerable: true,
  configurable: false,
});

Object.defineProperty(product, 'secret', {
  value: 'hidden',
  enumerable: false,
});

try { product.id = 999; } catch (e) {
  console.log('writable:false ->', e.message);
}
console.log('product.id:', product.id);
console.log('Object.keys:', Object.keys(product));
console.log('product.secret:', product.secret);

const desc = Object.getOwnPropertyDescriptor(product, 'id');
console.log('id descriptor:', desc);

subTitle('5. Object.create');

const proto = {
  greet() { return `Hello, I'm ${this.name}`; }
};

const person = Object.create(proto);
person.name = 'Gabriel';

console.log(person.greet());
console.log('own keys:', Object.keys(person));
console.log('has greet on prototype:', 'greet' in person);
console.log('greet is own property:', person.hasOwnProperty('greet'));

// Object.create(null) — no prototype at all (pure dictionary)
const dict = Object.create(null);
dict.key = 'value';
console.log('dict.toString:', dict.toString);  // undefined — no prototype

// ------------------------------------------------
// 6. Object.is (strict equality with edge-case fixes)
// ------------------------------------------------
subTitle('6. Object.is');

console.log('0 === -0:', 0 === -0);
console.log('Object.is(0, -0):', Object.is(0, -0));

console.log('NaN === NaN:', NaN === NaN);
console.log('Object.is(NaN, NaN):', Object.is(NaN, NaN));

console.log('Object.is(1, 1):', Object.is(1, 1));
console.log('Object.is({}, {}):', Object.is({}, {}));

// ------------------------------------------------
// 7. Shallow copy vs deep copy
// ------------------------------------------------
subTitle('7. Shallow vs deep copy');

const original = {
  name: 'Gabriel',
  address: { city: 'Porto Alegre', country: 'Brazil' },
  tags: ['dev', 'js'],
};

// shallow copy with spread
const shallow = { ...original };
shallow.name = 'Changed';
shallow.address.city = 'Sao Paulo';  // mutates original!
console.log('original.name:', original.name);           // unchanged
console.log('original.address.city:', original.address.city); // mutated!

// deep copy with structuredClone
original.address.city = 'Porto Alegre'; // reset
const deep = structuredClone(original);
deep.address.city = 'Curitiba';
deep.tags.push('node');
console.log('after structuredClone:');
console.log('  original.address.city:', original.address.city); // unchanged
console.log('  original.tags:', original.tags);                 // unchanged
console.log('  deep.address.city:', deep.address.city);
console.log('  deep.tags:', deep.tags);

// ------------------------------------------------
// 8. Object.hasOwn (ES2022 — preferred over hasOwnProperty)
// ------------------------------------------------
subTitle('8. Object.hasOwn');

const obj = Object.create({ inherited: true });
obj.own = 'yes';

console.log('Object.hasOwn(obj, "own"):', Object.hasOwn(obj, 'own'));
console.log('Object.hasOwn(obj, "inherited"):', Object.hasOwn(obj, 'inherited'));

// works safely with Object.create(null) too
const nullProto = Object.create(null);
nullProto.key = 'val';
console.log('Object.hasOwn(nullProto, "key"):', Object.hasOwn(nullProto, 'key'));

// ------------------------------------------------
// 9. for...in vs Object.keys (enumerable own + inherited vs own-only)
// ------------------------------------------------
subTitle('9. for...in vs Object.keys');

const parent = { inherited: true };
const child = Object.create(parent);
child.own = true;

const forInKeys = [];
for (const key in child) forInKeys.push(key);

console.log('for...in:', forInKeys);
console.log('Object.keys:', Object.keys(child));
