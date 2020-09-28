const stuff = require("./stuff"); // no need for .js, automatically appends it

// built in core modules
const events = require("events");

const myEmitter = new events.EventEmitter();

myEmitter.on("someEvent", function (msg) {
    console.log(msg);
});

myEmitter.emit("someEvent", "some message");

const util = require("util");

var Person = function (name) {
    this.name = name;
};

// object inheritance
util.inherits(Person, events.EventEmitter);

var james = new Person("James");
var kenny = new Person("Kenny");
var tina = new Person("Tina");

var people = [james, kenny, tina];

people.forEach(function (person) {
    person.on("speak", function (msg) {
        console.log(`${this.name} said: "${msg}"`);
    });
});

kenny.emit("speak", "yo yo yo");
james.emit("speak", "i want a curry");
tina.emit("speak", "wassup");
