import {heading} from "logger.js";

heading('Symbol.iterator');

const myIterable = {
  data: ['a', 'b', 'c'],

  [Symbol.iterator]() {
    let index = 0;
    const data = this.data;

    return {
      next() {
        if (index < data.length) {
          return { value: data[index++], done: false };
        }
        return { value: undefined, done: true };
      }
    };
  }
};

for (const item of myIterable) {
  console.log(item); // 'a', 'b', 'c'
}