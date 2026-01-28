import {heading} from "logger.js";

heading('fill()');

const arr1 = [1, 2, 3, 4, 5];
arr1.fill(0);
console.log(arr1);

const arr2 = [1, 2, 3, 4, 5];
arr2.fill(0, 2);
console.log(arr2);

const arr3 = [1, 2, 3, 4, 5];
arr3.fill(0, 1, 3);
console.log(arr3);

const arr4 = [1, 2, 3, 4, 5];
arr4.fill(0, -3); // [1, 2, 0, 0, 0]
console.log(arr4);

const arr5 = [1, 2, 3, 4, 5];
arr5.fill(0, -4, -1); // [1, 0, 0, 0, 5]
console.log(arr5);

console.log(new Array(5).fill(0));

console.log(new Array(3).fill('hello'));

console.log(Array(10).fill(1));

heading('copyWithin(target, start, end)');

const copyArr1 = [1, 2, 3, 4, 5];
copyArr1.copyWithin(0, 3); // [4, 5, 3, 4, 5]
// Copies [4, 5] (from index 3 to end) to position 0
console.log(copyArr1);

const copyArr2 = [1, 2, 3, 4, 5];
copyArr2.copyWithin(0, 3, 4); // [4, 2, 3, 4, 5]
// Copies [4] (index 3 only) to position 0
console.log(copyArr2);


heading('entries()');

const colors = ['red', 'blue', 'yellow'];
const iterator = colors.entries();

console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());

for (const [index, color] of colors.entries()) {
  console.log(`${index}: ${color}`);
}