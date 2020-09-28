const express = require("express");
const todoController = require("./controllers/todoController");

const app = express();

// set up template engine

app.set("view engine", "ejs");

// static files, every url will route to public
app.use(express.static("./public"));

// listen to port
app.listen(5000);
console.log("listening to port 5000");

todoController(app);
