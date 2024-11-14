var express = require('express');
var app = express();
var http = require('http').createServer(app);
var cors = require('cors');
const { Server } = require("socket.io");



// Set up CORS for Express server
app.use(cors({
    origin: "http://localhost:3000", // Allow requests from this origin
    methods: ["GET", "POST"],
    credentials: true
}));

// Set up Socket.io with CORS
const io = new Server(http, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});



io.on('connection', (socket) => {
    console.log("user online");

    socket.on('canvas-data', (data) => {
        socket.broadcast.emit('canvas-data', data);
    });
});


var server_port = process.env.YOUR_PORT || process.env.PORT || 5000;
http.listen(server_port, () => {
    console.log("Started on:" + server_port);
});