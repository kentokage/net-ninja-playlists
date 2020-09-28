var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var mongoose = require("mongoose");

const user = "kenny";
const password = "k3nnyPwn5";

mongoose.connect(
    `mongodb+srv://${user}:${password}@cluster0-pcpbz.mongodb.net/test?retryWrites=true&w=majority`
);

mongoose.connection.openUri("open", () => {
    console.log("connected to database");
});

// create a schema - this is like a blueprint
var todoSchema = new mongoose.Schema({
    item: String,
});

// creates collection for u?!
var Todo = mongoose.model("Todo", todoSchema);
// var itemOne = Todo({ item: "buy flowers" }).save(function (err) {
//     if (err) throw err;
//     console.log("item saved");
// });

// console.log("itemOne", itemOne);

// var data = [
//     { item: "get milk" },
//     { item: "walk dog" },
//     { item: "kick coding ass" },
// ];

module.exports = function (app) {
    app.get("/todo", function (req, res) {
        // get data from mongodb and pass it to the view
        Todo.find({}, function (err, data) {
            if (err) throw error;
            res.render("todo", { todos: data });
        });
    });

    app.post("/todo", urlencodedParser, function (req, res) {
        // get data from the view and add it to mongodb
        Todo(req.body).save(function (err, data) {
            if (err) throw err;
            console.log("item saved");
            res.json(data);
        });
    });

    app.delete("/todo/:item", function (req, res) {
        // delete requested item from mongodb
        Todo.find({ item: req.params.item.replace(/\-/g, " ") }).remove(
            function (err, data) {
                if (err) throw err;
                res.json(data);
            }
        );
    });
};
