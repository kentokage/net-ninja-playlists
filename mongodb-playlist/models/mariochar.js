const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create schema and model
// model represents the collection
// schema represents the structure

const MarioCharSchema = new Schema({
    name: String,
    weight: Number,
});

const MarioChar = mongoose.model("mariochar", MarioCharSchema);
// mariochar is the collection name
// model and collection seems to be synonymous in this case

module.exports = MarioChar;

// can do this to create new records in the collection
// var myChar = new MarioChar({})
