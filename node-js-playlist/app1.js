const stuff = require("./stuff"); // no need for .js, automatically appends it

myEmitter.emit("someEvent", "some message");

console.log("hey ninjas");

setTimeout(function () {
    console.log("3 seconds");
}, 3000);

var time = 0;

var timer = setInterval(function () {
    if (time < 10) {
        time += 2;
        console.log(time, "seconds have passed");
    } else {
        clearInterval(timer);
    }
}, 2000);

console.log(__dirname);
console.log(__filename);

stuff.counter();
stuff.adder(1, 2);
console.log(stuff.pi);
