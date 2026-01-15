const words = ["hello world", "flat map is cool"];
const newWords = words.flatMap(s => s.split(" "));
console.log({ newWords });

const pages = [
  { page: 1, products: ["A", "B"] },
  { page: 2, products: ["C"] }
];

const newPages = pages.flatMap(p => p.products)
console.log({ newPages });

const products = [
  { name: "Shirt", sizes: ["S","M","L"] },
  { name: "Shoe", sizes: ["40","41"] }
];

const newProducts = products.flatMap(p =>
  p.sizes.map(size => ({ product: p.name, size }))
);

console.log({ newProducts });
// {
//   newProducts: [
//     { product: 'Shirt', size: 'S' },
//     { product: 'Shirt', size: 'M' },
//     { product: 'Shirt', size: 'L' },
//     { product: 'Shoe', size: '40' },
//     { product: 'Shoe', size: '41' }
//   ]
// }

//Remove empty elements
const empty = ["hello", "", "world", ""];
const newEmpty = empty.flatMap(item => item ? [item] : [])
console.log({ newEmpty });