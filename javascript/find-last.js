import {heading, subTitle} from "./logger.js";

heading('Find last');

const nums = [1, 3, 5, 7, 9, 7, 5, 3, 1];

// array.findLast((element, index, array) => {
// });

console.log(nums.find(n => n > 4)); // 5 (index 2, from left)
console.log(nums.findLast(n => n > 4)); // 5 (index 6, from right)

console.log(nums.findIndex(n => n > 4)); // 2
console.log(nums.findLastIndex(n => n > 4)); // 6

subTitle('Using index');

const items = ['a', 'b', 'c', 'd', 'e'];
console.log(items.findLast((_, i) => i % 2 === 0)); // 'e'
console.log(items.findLastIndex(n => n > 4)); // 4

heading('Find last with thisArg (bing this)');

// array.findLast(callback, thisArg);
const validator = {
  threshold: 100,
  isAbove(val) { return val > this.threshold; }
};

const data = [50, 120, 80, 150, 30];

console.log(data.findLast(validator.isAbove, validator)); // 150