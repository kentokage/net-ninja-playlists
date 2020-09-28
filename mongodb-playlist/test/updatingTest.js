const assert = require("assert");
const MarioChar = require("../models/mariochar");
const Mongoose = require("mongoose");

// * 3 ways to update
/*
  char.update()
  MarioChar.update()
  MarioChar.findOneAndUpdate()
*/

// ES6 Promises, replace Mongoose promise with global promise
Mongoose.Promise = global.Promise;
Mongoose.set("useFindAndModify", false);

// describe our test
describe("Updating records", function () {
    var char;
    beforeEach(function () {
      char = new MarioChar({ name: "Luigi", weight: 100 });
      return char.save();
    });

    it("Update one record from the database", function () {
      return MarioChar.findOneAndUpdate({name: 'Luigi'}, {name: 'Luigi 2'}).then(() => {
          return MarioChar.findOne({_id: char._id});
      }).then(result => {
          assert(result.name === "Luigi 2");
      });
    });
    
    it("Increment the weight by 1", function () {
      // MarioChar.update() updates all records
      // {} no filter criteria, returns all records
      return MarioChar.updateMany({}, { $inc: {weight: 1}}).then(() => {
        return MarioChar.findOne({_id: char._id})
      }).then(result => {
        assert(result.weight === 101);
      });
    })
});
