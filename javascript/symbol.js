import {heading} from "./logger.js";

heading('Symbol');

const sym1 = Symbol();
const sym2 = Symbol();

console.log(sym1 === sym2); // false (always unique)

const sym3 = Symbol('test');
const sym4 = Symbol('test');

console.log(sym3 === sym4); // false
console.log(sym3.description); // 'test'


// ─── Symbols as Property Keys ────────────────────────────

const ID = Symbol('id');
const SECRET = Symbol('secret');

const user = {
  name: 'Gabriel',
  [ID]: 12345,
  [SECRET]: 'password123'
};

console.log(user.name);
console.log(user[ID]);
console.log(user[SECRET]);

// Symbols are not enumerated by default
console.log(Object.keys(user)); // ['name']
console.log(Object.getOwnPropertyNames(user)); // ['name']
console.log(JSON.stringify(user)); // {"name":"Gabriel"}

// But they can be accessed:
console.log(Object.getOwnPropertySymbols(user)); // [ Symbol(id), Symbol(secret) ]
console.log(Reflect.ownKeys(user)); // [ 'name', Symbol(id), Symbol(secret) ]