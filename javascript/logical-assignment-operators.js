import {heading} from "./logger.js";

heading('||= (Logical OR Assignment)');
// x ||= y
// Equivalent to: x || (x = y)
// NOT equivalent to: x = x || y (subtle difference — see edge cases)

// Assigns when: x is falsy
// Keeps when: x is truthy

let name = '';
name ||= 'Anonymous';
console.log(name); // 'Anonymous'

let count = 0;
count ||= 10;
console.log(count); // 10

let active = false;
active ||= true;
console.log(active); // true

let data = null;
data ||= [];
console.log(data); // []

let value = 'exists';
value ||= 'default';
console.log(value); // 'exists' (truthy, not assigned)

// Setting Defaults
const options = { debug: false };

options.timeout ||= 3000;   
options.retries ||= 3;
options.debug ||= true; // Changed to true (false = falsy)

console.log(options);

const cache = {};

function addToCache(category, item) {
  cache[category] ||= []; 
  cache[category].push(item);
}

addToCache('fruits', 'apple');
addToCache('fruits', 'banana');
addToCache('vegetables', 'carrot');

console.log(cache);

heading('&&= (Logical AND Assignment)');
// x &&= y
// Equivalent to: x && (x = y)

// Assigns when: x is truthy
// Keeps when: x is falsy

let config = { debug: true };

config.debug &&= false;
console.log(config.debug); // false

let empty = '';
empty &&= 'replaced';
console.log(empty); // ''

let zero = 0;
zero &&= 100;
console.log(zero); // 0

// Conditional Updates

const user = {
  name: 'Alice',
  email: 'alice@example.com',
  isAdmin: true
};

// Only update if property exists and is truthy
user.name &&= user.name.toUpperCase();
user.nickname &&= user.nickname.toUpperCase();  // No error! (undefined is falsy)

console.log(user.name);      // 'ALICE'
console.log(user.nickname);  // undefined (wasn't assigned)


heading('??= (Nullish Coalescing Assignment)');
// x ??= y
// Equivalent to: x ?? (x = y)

// Assigns when: x is null or undefined
// Keeps when: x is any other value (including falsy values like 0, '', false)