module.exports.counter = function () {
    console.log("counter");
};

module.exports.adder = function (a, b) {
    console.log(a + b);
};

module.exports.pi = 3.142;

// export the function expression
// module.exports is just an empty object
// var counter = ...
// module.exports = { counter, adder, pi };
