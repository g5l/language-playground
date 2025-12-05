// Reverse string
const str = "gabriel";

const reversed = str
  .split("")
  .reduceRight((acc, char) => acc + char, "");

console.log(reversed); 

// Difference to reduce
const nums = [1, 2, 3];
const resR = nums.reduceRight((acc, x) => acc - x);
console.log(resR); // 0

const res = nums.reduce((acc, x) => acc - x);
console.log(res); // -4