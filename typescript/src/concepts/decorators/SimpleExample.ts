function LogClass(constructor: Function) {
  console.log(`Class ${constructor.name} has been created.`);
}

@LogClass
export class SimpleExample {
  constructor() {
    console.log("SimpleExample instance created.");
  }
}
