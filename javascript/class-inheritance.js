import { heading, subTitle } from "./logger.js";

heading('Class Inheritance & Advanced Patterns');

subTitle('1. extends & super');

class Shape {
  #color;

  constructor(color = 'black') {
    this.#color = color;
  }

  get color() {
    return this.#color;
  }

  area() {
    throw new Error('area() must be implemented by subclass');
  }

  describe() {
    return `${this.constructor.name} [${this.#color}], area: ${this.area()}`;
  }
}

class Circle extends Shape {
  #radius;

  constructor(radius, color) {
    super(color);
    this.#radius = radius;
  }

  area() {
    return Math.round(Math.PI * this.#radius ** 2 * 100) / 100;
  }

  get radius() {
    return this.#radius;
  }
}

class Rectangle extends Shape {
  #w; #h;

  constructor(w, h, color) {
    super(color);
    this.#w = w;
    this.#h = h;
  }

  area() {
    return this.#w * this.#h;
  }
}

// test abstract shape
// const shape = new Shape();
// console.log('shape:', shape);

const c = new Circle(5, 'red');
const r = new Rectangle(4, 6, 'blue');
console.log(c.describe());
console.log(r.describe());


subTitle('2. Method overriding & super calls');

class Square extends Rectangle {
  constructor(side, color) {
    super(side, side, color);
  }
  
  describe() {
    return `[Square override] ${super.describe()}`;
  }
}

const sq = new Square(5, 'green');
console.log(sq.describe());


subTitle('3. instanceof');

console.log('sq instanceof Square:', sq instanceof Square); // true
console.log('sq instanceof Rectangle:', sq instanceof Rectangle); // true
console.log('sq instanceof Shape:', sq instanceof Shape); // true
console.log('sq instanceof Object:', sq instanceof Object); // true


subTitle('4. Class expressions');

const Animal = class {
  constructor(name) { this.name = name; }
  speak() { return `${this.name} talking...`; }
};

const Dog = class CanineClass {
  constructor(name) { this.name = name; }
  speak() { return `${this.name} barks`; }
  className() { return CanineClass.name; }
};

const dog = new Dog('Rex');
console.log(dog.speak()); // Rex barks
console.log('Internal class name:', dog.className()); // CanineClass
console.log('Variable name:', Dog.name); // CanineClass


subTitle('5. Static initialization blocks');

class Config {
  static env;
  static debug;

  static {
    Config.env = 'development';
    Config.debug = Config.env !== 'production';
    console.log(`Config initialized: env=${Config.env}, debug=${Config.debug}`);
  }
}

console.log('Config.env:', Config.env);



subTitle('7. Abstract-like pattern');

class Repository {
  constructor() {
    if (new.target === Repository) {
      throw new Error('Repository is abstract and cannot be instantiated directly');
    }
  }

  findById(id)  { throw new Error('findById() not implemented'); }
  save(entity)  { throw new Error('save() not implemented'); }
}

class InMemoryRepository extends Repository {
  #store = new Map();

  findById(id) {
    return this.#store.get(id) ?? null;
  }

  save(entity) {
    this.#store.set(entity.id, entity);
    return entity;
  }
}

try {
  new Repository();
} catch (e) {
  console.log('Caught:', e.message);
}

const repo = new InMemoryRepository();
repo.save({ id: 1, name: 'Alice' });
console.log('findById(1):', repo.findById(1));
console.log('findById(99):', repo.findById(99));
