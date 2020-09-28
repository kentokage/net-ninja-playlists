// Buffers
/*
    temp storage spot for a chunk of data that is being transferred from one place to another
    the buffer is filled with data, then passed along
    transfer small chunks of data at a time
    can create streams in Node.js to transfer data
    increase performance
*/

// Streams
/*
    Writable streams - allow node js to write data to a stream
    Readable streams - allow node js to read data to a stream
    Duplex - can read and write to a stream

    stream is going to read data, fill up buffer, and pass the data on as chunks
*/

const fs = require("fs");

const myReadStream = fs.createReadStream(__dirname + "/readme.txt", "utf8");
const myWriteStream = fs.createWriteStream(__dirname + "/writeMeStream.txt");

// old way
// myReadStream.on("data", function (chunk) {
//     console.log("new chunk received: ");
//     // console.log(chunk);
//     myWriteStream.write(chunk);
// });

// pipes, easier way to read and write
// pipe is like a redirect angle pipe
// has to be from a readable stream
myReadStream.pipe(myWriteStream);

const http = require("http");

const server = http.createServer();

// res is a writable stream!
server.on("request", function (req, res) {
    console.log("request was made: " + req.url);
    // res.writeHead(200, { "Content-Type": "text/plain" });
    res.writeHead(200, {
        "Content-Type": "text/html",
    });
    // const myReadStream2 = fs.createReadStream(
    //     __dirname + "/readme.txt",
    //     "utf8"
    // );
    const myReadStream2 = fs.createReadStream(
        __dirname + "/index.html",
        "utf8"
    );
    myReadStream2.pipe(res);
});

server.listen("7000", "127.0.0.1");
console.log("yo dawgs, now listening to port 7000");
