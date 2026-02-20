import {heading} from "logger.js";

heading('WeakMap');

const privateData = new WeakMap();

class Person {
  constructor(name, ssn) {
    this.name = name;

    // SSN is private
    privateData.set(this, { ssn });
  }

  getSSN(authorized) {
    if (!authorized) throw new Error('Unauthorized');
    return privateData.get(this).ssn;
  }
}

const jef = new Person('Jeferson', '123-45-6789');
console.log(jef.name);
console.log(jef.ssn);
console.log(jef.getSSN(true));

/* Cache */

const cache = new WeakMap();

function computeExpensive(obj) {
  if (cache.has(obj)) {
    console.log('Cache hit');
    return cache.get(obj);
  }

  console.log('Computing...');
  const result = obj.data.reduce((a, b) => a + b, 0);
  cache.set(obj, result);
  return result;
}

let dataset = { data: [1, 2, 3, 4, 5] };
computeExpensive(dataset);  // slow
computeExpensive(dataset);  // fast


dataset = null;
// if set null cache entry automatically garbage collected!