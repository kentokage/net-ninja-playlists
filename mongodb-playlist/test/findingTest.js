const assert = require("assert");
const MarioChar = require("../models/mariochar");
const Mongoose = require("mongoose");

// ES6 Promises, replace Mongoose promise with global promise
Mongoose.Promise = global.Promise;

// describe our test
describe("Finding records", function () {
    var char;
    beforeEach(function () {
        char = new MarioChar({ name: "Luigi", weight: 100 });
        return char.save();
    });

    it("Finds one record from the database", function () {
        // if no params, finds everything
        return MarioChar.findOne({ name: "Luigi" }).then(function (result) {
            assert(result.name === "Luigi");
        });
    });

    it("Finds one record by ID from the database", function () {
        // if no params, finds everything
        return MarioChar.findOne({ _id: char._id }).then(function (result) {
            // _ids are actually objects
            assert(result._id.toString() === char._id.toString());
        });
    });
});
