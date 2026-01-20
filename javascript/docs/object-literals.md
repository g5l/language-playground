# Object Literals

Enhanced object literal syntax introduced in ES6 (ES2015).

## Common Pitfalls and Edge Cases

#### Shorthand Methods Are NOT Arrow Functions:

```javascript
const obj = {
  name: 'Test',

  // Shorthand method — `this` works correctly
  greet() {
    return this.name;  // 'Test'
  },

  // Arrow function — `this` is inherited from outer scope
  greetArrow: () => {
    return this.name;  // undefined (or global)
  }
};
```

#### Reserved Words Work as Property Names

```javascript
// ES6 allows reserved words as shorthand methods
const obj = {
  class() { return 'works!'; },
  if() { return 'also works!'; },
  return() { return 'yes!'; }
};

obj.class();  // 'works!'
```