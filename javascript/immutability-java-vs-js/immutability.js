"use strict";

const plain = ["alpha", "beta", "gamma"];
plain.push("delta");
console.log(plain);

const seedData = Object.freeze(["alpha", "beta", "gamma"]);
try {
  seedData.push("delta");
} catch (e) {
  console.log(e.constructor.name, "-", e.message);
  // TypeError - Cannot add property 3, object is not extensible
}

const shallow = Object.freeze([
  { id: 1, name: "alpha" },
  { id: 2, name: "beta" },
]);

shallow[0].name = "MUTATED";
console.log(JSON.stringify(shallow));

console.log(Object.isFrozen(shallow)); // true
console.log(Object.isFrozen(shallow[0])); // false