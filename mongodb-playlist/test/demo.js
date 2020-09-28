const assert = require("assert");
const MarioChar = require("../models/mariochar");
const Mongoose = require("mongoose");

// ES6 Promises, replace Mongoose promise with global promise
Mongoose.Promise = global.Promise;

// describe our test
describe("Saving records", function () {
    // connect to the db before tests run

    // create different tests
    // it block describes one single test
    it("add two numbers together", function () {
        assert(2 + 3 === 5);
    });

    it("Saves a record to the database", async function () {
        var char = new MarioChar({ name: "Luigi3", weight: 100 });

        return char.save().then(() => {
            assert(!char.isNew);
        });

        // await char.save();
        // assert(!char.isNew);
        // return;

        // NOT NEEDED, just return promise
        // needed to tell Mocha to move on to the next test
        // done();
    });

    // it("Not saved to database", function () {
    //     var char = new MarioChar({ name: "Peach", weight: 100 });
    //     assert(char.isNew);
    // });
});
