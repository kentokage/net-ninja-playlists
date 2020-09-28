const assert = require("assert");
const MarioChar = require("../models/mariochar");
const Mongoose = require("mongoose");

// * 3 ways to delete
/*
  char.remove()
  MarioChar.remove()
  MarioChar.findOneAndRemove()
*/

// ES6 Promises, replace Mongoose promise with global promise
Mongoose.Promise = global.Promise;
Mongoose.set("useFindAndModify", false);

// describe our test
describe("Deleting records", function () {
    var char;
    beforeEach(function () {
        char = new MarioChar({ name: "Luigi", weight: 100 });
        return char.save();
    });

    it("Delete one record from the database", function () {
        return MarioChar.findOneAndRemove({ name: "Luigi" })
            .then(() => {
                return MarioChar.findOne({ name: "Luigi" });
            })
            .then((result) => {
                assert(result === null);
            });
    });

    it("Finds one record from the database", function () {
        // if no params, finds everything
        return MarioChar.findOne({ name: "Luigi" }).then(function (result) {
            assert(result.name === "Luigi");
        });
    });
});
