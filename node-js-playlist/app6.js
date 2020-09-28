// serve json

var http = require("http");

var server = http.createServer(function (req, res) {
    console.log("request was made: " + req.url);
    res.writeHead(200, { "Content-Type": "application/json" });
    const myObj = {
        name: "Ryu",
        job: "Ninja",
        age: 27,
    };

    res.end(JSON.stringify(myObj));
});

server.listen("7000", "127.0.0.1");
console.log("yo dawgs, now listening to port 7000");
