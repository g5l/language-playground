const arr1 = [1, 2, [3, 4]];
const ex1 = arr1.flat();
const ex2 = arr1.flat(1);
const ex3 = arr1.flat(2);
const ex4 = arr1.flat(Infinity);

console.log({ex1});
console.log({ex2});
console.log({ex3});
console.log({ex4});

const arr2 = [1, 2, [3, 4, [5, 6]]];
const test1 = arr2.flat();
const test2 = arr2.flat(2);
const test3 = arr2.flat(Infinity);

console.log({test1});
console.log({test2});
console.log({test3});

const matrix = [[1,2,3],[4,5,6]];
const list = matrix.flat();
console.log(list);

const pages = [
  { items: [1,2] },
  { items: [3,[4,5]] }
];

const all = pages.map(p => p.items).flat(Infinity);
console.log({all});