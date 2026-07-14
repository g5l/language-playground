import { heading, subTitle, log } from "./logger.js";

heading('JSON');

// JSON.stringify
subTitle('1. JSON.stringify basics');

const user = { name: 'Gabriel', age: 30, active: true };
const jsonStr = JSON.stringify(user);
console.log('stringified:', jsonStr);
console.log('type:', typeof jsonStr);

console.log('pretty:\n' + JSON.stringify(user, null, 2));

// JSON.parse
subTitle('2. JSON.parse basics');

const parsed = JSON.parse(jsonStr);
console.log('parsed:', parsed);
console.log('type:', typeof parsed);
console.log('parsed.name:', parsed.name);

// What gets lost in JSON
subTitle('3. Values lost in JSON serialization');

const problematic = {
  fn: () => 'hello',    // functions are dropped
  undef: undefined,            // undefined is dropped
  sym: Symbol('test'),         // symbols are dropped
  regex: /abc/gi,              // becomes {}
  date: new Date('2025-01-01'),// becomes a string
  nan: NaN,                    // becomes null
  inf: Infinity,               // becomes null
  negInf: -Infinity,           // becomes null
  nested: { ok: true },
};

const roundTripped = JSON.parse(JSON.stringify(problematic));
console.log('original keys:', Object.keys(problematic));
console.log('round-tripped:', roundTripped);

// ------------------------------------------------
// 4. Replacer function
// ------------------------------------------------
subTitle('4. Replacer function');

const sensitive = {
  username: 'gabriel',
  password: 's3cret',
  email: 'gabriel@test.com',
  role: 'admin',
};

// filter out sensitive fields
const safe = JSON.stringify(sensitive, (key, value) => {
  if (key === 'password') return undefined;  // omit this key
  if (key === 'email') return '***redacted***';
  return value;
}, 2);
console.log('with replacer:\n' + safe);

// replacer as array — whitelist of keys to include
const whitelisted = JSON.stringify(sensitive, ['username', 'role'], 2);
console.log('with array replacer:\n' + whitelisted);

// ------------------------------------------------
// 5. Reviver function
// ------------------------------------------------
subTitle('5. Reviver function');

const withDate = '{"name":"Deploy","createdAt":"2025-06-15T10:30:00.000Z","count":"42"}';

const revived = JSON.parse(withDate, (key, value) => {
  // restore ISO strings as Date objects
  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(value)) {
    return new Date(value);
  }
  // parse numeric strings
  if (key === 'count') return Number(value);
  return value;
});

console.log('revived:', revived);
console.log('createdAt is Date:', revived.createdAt instanceof Date);
console.log('count is number:', typeof revived.count);

// ------------------------------------------------
// 6. toJSON — custom serialization
// ------------------------------------------------
subTitle('6. toJSON method');

class Money {
  constructor(amount, currency) {
    this.amount = amount;
    this.currency = currency;
  }

  toJSON() {
    return `${this.amount} ${this.currency}`;
  }
}

const order = {
  item: 'Laptop',
  price: new Money(2500, 'USD'),
  tax: new Money(250, 'USD'),
};

console.log(JSON.stringify(order, null, 2));

// ------------------------------------------------
// 7. Handling circular references
// ------------------------------------------------
subTitle('7. Circular references');

const objA = { name: 'A' };
const objB = { name: 'B', ref: objA };
objA.ref = objB;  // circular!

try {
  JSON.stringify(objA);
} catch (e) {
  console.log('Caught:', e.message);
}

// solution: replacer that tracks seen objects
function safeStringify(obj, indent = 2) {
  const seen = new WeakSet();
  return JSON.stringify(obj, (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) return '[Circular]';
      seen.add(value);
    }
    return value;
  }, indent);
}

console.log('safe stringify:\n' + safeStringify(objA));

// ------------------------------------------------
// 8. JSON with Map and Set
// ------------------------------------------------
subTitle('8. JSON with Map & Set');

// Map and Set don't serialize by default
const map = new Map([['a', 1], ['b', 2]]);
const set = new Set([1, 2, 3]);
console.log('Map default:', JSON.stringify(map));   // {}
console.log('Set default:', JSON.stringify(set));   // {}

// serialize via conversion
const mapJson = JSON.stringify(Object.fromEntries(map));
console.log('Map via fromEntries:', mapJson);

const setJson = JSON.stringify([...set]);
console.log('Set via spread:', setJson);

// round-trip with type tags
function encodeCollections(key, value) {
  if (value instanceof Map) return { __type: 'Map', data: [...value] };
  if (value instanceof Set) return { __type: 'Set', data: [...value] };
  return value;
}

function decodeCollections(key, value) {
  if (value?.__type === 'Map') return new Map(value.data);
  if (value?.__type === 'Set') return new Set(value.data);
  return value;
}

const state = { users: map, ids: set, count: 5 };
const encoded = JSON.stringify(state, encodeCollections, 2);
console.log('encoded:\n' + encoded);

const decoded = JSON.parse(encoded, decodeCollections);
console.log('decoded.users:', decoded.users);
console.log('decoded.ids:', decoded.ids);
console.log('users is Map:', decoded.users instanceof Map);
console.log('ids is Set:', decoded.ids instanceof Set);

// ------------------------------------------------
// 9. JSON.parse error handling
// ------------------------------------------------
subTitle('9. JSON.parse error handling');

const badInputs = [
  '{invalid}',
  "{'single': 'quotes'}",
  '{name: "unquoted key"}',
  'undefined',
  '',
];

for (const input of badInputs) {
  try {
    JSON.parse(input);
  } catch (e) {
    console.log(`"${input}" → ${e.message}`);
  }
}

// ------------------------------------------------
// 10. structuredClone vs JSON for deep copy
// ------------------------------------------------
subTitle('10. structuredClone vs JSON deep copy');

const original = {
  name: 'Gabriel',
  date: new Date('2025-01-01'),
  pattern: /hello/gi,
  data: new Map([['x', 1]]),
  items: new Set([1, 2, 3]),
};

const jsonCopy = JSON.parse(JSON.stringify(original));
const cloned = structuredClone(original);

console.log('JSON copy:');
console.log('  date type:', typeof jsonCopy.date);       // string
console.log('  pattern:', jsonCopy.pattern);              // {}
console.log('  data:', jsonCopy.data);                    // {}

console.log('structuredClone:');
console.log('  date type:', cloned.date instanceof Date); // true
console.log('  pattern:', cloned.pattern);                // /hello/gi
console.log('  data:', cloned.data);                      // Map
console.log('  items:', cloned.items);                    // Set
