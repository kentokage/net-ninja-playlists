// file module

const fs = require("fs");

// sync
// blocking code, will fully read until complete
// let readme = fs.readFileSync("readme.txt", "utf8");

// async

fs.readFile("readme.txt", "utf8", function (err, data) {
    fs.unlink("writeMe.txt", () => {
        fs.writeFile("writeMe.txt", data + " Kenny 2", () => {});
    });
});

// fs.mkdir("stuff", function () {
//     fs.readFile("readme.txt", "utf8", function (err, data) {
//         fs.writeFile("./stuff/writeMe.txt", data + " Kenny 3", () => {});
//     });
// });

// fs.rmdirSync("stuff");

fs.unlink("./stuff/writeMe.txt", function () {
    fs.rmdir("stuff", () => {});
});


[12, 27, 18, 41, 33, 39, 55];