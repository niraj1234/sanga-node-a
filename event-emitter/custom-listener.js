const EventEmitter = require("events");

class MyCustomEmitter extends EventEmitter {
  constructor() {
    super();
    console.log("Getting some data from WebService-AA call");
    this.greeting = "Hello";
  }

  greet(name) {
    this.emit("g1", `${this.greeting}, ${name}`);
  }
}

const myCustomEmitter = new MyCustomEmitter();

myCustomEmitter.on("g1", (input) => {
  console.log("Fetch data from WebService-BB");
  console.log(`Greeting event`, input);
});

myCustomEmitter.greet("Niraj");