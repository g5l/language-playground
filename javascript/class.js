import {heading, separator} from './logger.js';

class BankAccount {
  static bankName = 'Gabriel Bank';
  static #totalAccounts = 0;

  constructor(owner, initialBalance = 0) {
    this.owner = owner;
    this._balance = initialBalance;
    this.createdAt = new Date();
    BankAccount.#totalAccounts++;
  }

  get balance() {
    return this._balance;
  }

  deposit(amount) {
    if (amount <= 0) throw new Error('Invalid amount');
    this._balance += amount;
    return this;
  }

  withdraw(amount) {
    if (amount > this._balance) throw new Error("You don't have money!");
    this._balance -= amount;
    return this;
  }

  transfer(amount, targetAccount) {
    this.withdraw(amount);
    targetAccount.deposit(amount);
    return this;
  }

  toString() {
    return `${this.owner}'s account: $${this._balance}`;
  }

  static createJointAccount(owner1, owner2, initialBalance) {
    return new BankAccount(`${owner1} & ${owner2}`, initialBalance);
  }

  static getAccountCount() {
    return BankAccount.#totalAccounts;
  }
}

const gabriel = new BankAccount('Gabriel', 1000);
const fernanda = new BankAccount('Fernanda', 500);

console.log({deposit: gabriel.deposit(200).withdraw(50)});
console.log({transfer: gabriel.transfer(100, fernanda)});

console.log(gabriel.balance);
console.log(fernanda.balance);
console.log(String(gabriel));

console.log({getAccountCount: BankAccount.getAccountCount()});
console.log({bankName: BankAccount.bankName});

separator();

heading("Public and private")
class Person {
  // Private field
  #birthDate;

  // Public field
  name;

  constructor(name, birthDate) {
    this.name = name;
    this.#birthDate = birthDate;
  }

  // Private method
  #calculateAge() {
    const today = new Date();
    const birth = new Date(this.#birthDate);
    return today.getFullYear() - birth.getFullYear();
  }

  // Public method
  getProfile() {
    return {
      name: this.name,
      age: this.#calculateAge(),
    };
  }
}

const marcos = new Person('Marcos', '1990-05-15');

console.log({name: marcos.name});
console.log({profile: marcos.getProfile()});

// marcos.#calculateAge(); SyntaxError because it's private