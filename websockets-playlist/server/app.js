const express = require("express");
const socket = require("socket.io");

// app
const app = express();
const server = app.listen(5000, function () {
    console.log("listening to requests on port 5000");
});

// static files
// serves file in public folder, index.html
app.use(express.static("public"));
// app.use('/src', express.static('src'))

// socket setup to server
const io = socket(server);

const messages = [];

const clients = new Map();

// listen when connections are made
io.on("connection", function (socket) {
    console.log("made socket connection", socket.id);

    socket.on("getInitData", function () {
        socket.emit("getInitData", messages);
    });

    socket.on("chat", function (data) {
        messages.push(data);
        if (!clients.has(socket.id)) {
            clients.set(socket.id, { handle: data.handle });
        }
        io.sockets.emit("chat", data);
    });

    socket.on("typing", function (data) {
        // broadcast to everyone except the broadcaster
        socket.broadcast.emit("typing", data);
    });

    socket.on("disconnect", function () {
        if (clients.has(socket.id)) {
            const handle = clients.get(socket.id).handle;
            console.log(`${handle} has disconnected`, socket.id);
            const data = {
                handle,
                message: "has left the chat",
                timestamp: new Date().toLocaleString(),
            };
            messages.push(data);
            io.sockets.emit("chat", data);
            clients.delete(socket.id);
        } else {
            console.log("Some unknown has disconnecte", socket.id);
        }
    });
});
