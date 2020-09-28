// basic routing

var http = require("http");
var fs = require("fs");

var server = http.createServer(function (req, res) {
    console.log("request was made: " + req.url);
    res.writeHead(200, { "Content-Type": "text/html" });
    const message = "feed me popcorn";

    switch (req.url) {
        case "/popcorn":
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(message);
            break;
        case "/contact":
            res.writeHead(200, { "Content-Type": "text/html" });
            fs.createReadStream(__dirname + "/contact.html").pipe(res);
            break;
        case "/api/ninjas":
            var ninjas = [
                { name: "ryu", age: 29 },
                { name: "yoshi", age: 32 },
            ];
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(ninjas));
            break;
        case "/":
            res.writeHead(200, { "Content-Type": "text/html" });
            fs.createReadStream(__dirname + "/index.html").pipe(res);
            break;
        default:
            res.writeHead(404, { "Content-Type": "text/html" });
            fs.createReadStream(__dirname + "/404.html").pipe(res);
    }
});

server.listen("7000", "127.0.0.1");
console.log("yo dawgs, now listening to port 7000");
