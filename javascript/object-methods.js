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

