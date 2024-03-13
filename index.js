const express = require("express");
const http = require("http");
const socketIo = require('socket.io');

const port = process.env.PORT||3000;
const app = express();

const server = http.createServer(app);
const io = socketIo(server);


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
});

app.get("/style.css", (req, res) => {
    res.sendFile(__dirname + "/style.css")
});

io.on('connection', (socket) => {
    console.log("New user Connected");

    socket.on("chat message", msg => {
        io.emit("chat message", `${socket.id.substring(0, 5)}: ${msg}`);
    })

    socket.on("disconnect",() => {
        console.log("user disconnected");
    })
})

server.listen(port, () => {
    console.log("Server listening on port http://localhost:" + port);
})