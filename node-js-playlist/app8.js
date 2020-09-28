// *express

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const urlencodedParser = bodyParser.urlencoded({ extended: false });

// set view engine
// /views is the default folder
app.set("view engine", "ejs");

/* manual test
app.use("/assets", function (req, res, next) {
    console.log(req.url);
    // * next says go on to the new middlewre
    // at the end
    next();
});
*/

// * express.static('pathToFolder') will serve the files in the path staticly
app.use("/assets", express.static("assets"));

app.get("/", function (req, res) {
    // express is clever to define the content type...
    // res.send("this is the home page");
    res.sendFile(__dirname + "/index.html");
});

app.get("/contact", function (req, res) {
    // res.send("this is the contact page");
    res.sendFile(__dirname + "/contact.html");
});

// middleware in the middle
app.post("/contact", urlencodedParser, function (req, res) {
    console.log(req.body);
    res.render("contact-success", { data: req.body });
});

app.get("/profile/:name", function (req, res) {
    // res.send("You requested to see a profile with name of " + req.params.name);

    // * get request from query strings
    const { age, job } = req.query;
    const data = {
        age: age,
        job: job,
        hobbies: ["eating", "fighting", "fishing"],
    };
    res.render("profile", {
        person: req.params.name,
        data,
    });
});

app.listen(5000);

// * http verbs
// * get, post, delete, put

/*
    get - app.get('route', fn);
    post - app.post('route', fn);
    delete - app.delete('route', fn);
*/

// * templating engines, send html pages

/*
    embed dynamic content: using javascript template engine, embed data in javascript code into html files
    ejs: embedded js
*/

// * middleware is the code between the response and the request
