import {heading} from "logger.js";

heading('Map and Set');

class EventEmitter {
  #events = new Map();

  on(event, listener) {
    if (!this.#events.has(event)) {
      this.#events.set(event, new Set());
    }
    this.#events.get(event).add(listener);
    return () => this.off(event, listener); 
  }

  once(event, listener) {
    const wrapper = (...args) => {
      this.off(event, wrapper);
      listener.apply(this, args);
    };
    return this.on(event, wrapper);
  }

  off(event, listener) {
    const listeners = this.#events.get(event);
    if (listeners) {
      listeners.delete(listener);
      if (listeners.size === 0) {
        this.#events.delete(event);
      }
    }
  }

  emit(event, ...args) {
    const listeners = this.#events.get(event);
    if (listeners) {
      for (const listener of listeners) {
        listener.apply(this, args);
      }
    }
  }
}

const emitter = new EventEmitter();

const unsubscribe = emitter.on('data', data => console.log('Got:', data));
emitter.once('connect', () => console.log('Connected!'));

emitter.emit('connect');
emitter.emit('connect');

emitter.emit('data', 'Hello');
unsubscribe();
emitter.emit('data', 'World');

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
