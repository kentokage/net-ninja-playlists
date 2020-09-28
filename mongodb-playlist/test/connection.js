const Mongoose = require("mongoose");

// ES6 Promises, replace Mongoose promise with global promise
Mongoose.Promise = global.Promise;

// hook (before or after)
// connect to the db before tests run

before(function (done) {
    // connect to mongodb
    Mongoose.connect("mongodb://localhost/testaroo", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    Mongoose.connection
        .once("open", () => {
            console.log("connected to database");
            done();
        })
        .catch(function (error) {
            console.log("connection error: ", error);
        });

    // database -> collections (tables) -> record (javascript like objs)
    // collections have a model
    // schema tells the model how the model is defined
});

// drop the characters collection before each test
// drop = delete
beforeEach(function (done) {
    // drop the collection
    // mongo pluarlizes our collection
    // drop is async
    Mongoose.connection.collections.mariochars.drop(function () {
        done();
    });
});

// disconnect
after(function (done) {
    Mongoose.disconnect(() => {
        console.log("disconnected from database");
        done();
    });
});
