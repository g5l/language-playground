const id = 1;
const name = 'Alice';
const surname = 'Silva';
const age = 2;
const gender = 'female';

const prefix = name + '-';

const person = {
  id,
  name,
  surname,
  age,
  gender,
  fullName() {
    return `${this.name} ${this.surname}`;
  },
  [prefix.toLowerCase() + 'createdAt']: Date.now(),
  [`${prefix.toLowerCase()}updatedAt`]: Date.now(),
  
  get agee() {
    return this.age;
  },
  
  set setFullName(value) {
    [this.name, this.surname] = value.split(' ');
  }
}

console.log(person);
console.log({fullName: person.fullName(), name: person.name, surname: person.surname});
console.log({age: person.agee});
console.log('New name');
person.setFullName = 'New Name';
console.log({fullName: person.fullName(), name: person.name, surname: person.surname});
