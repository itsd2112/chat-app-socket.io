const path = require('path');
const http = require('http');
const express = require('express');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);

const port = process.env.PORT || 3000; 
const publicDirectoryPath = path.join(__dirname, '../public');
const io = socketIo(server); 

app.use(express.static(publicDirectoryPath));    

// let count = 0;
const messageString = 'Welcome';

io.on('connection', (socket)=>{
    console.log('New Connection Added....');

    socket.emit('message', 'Welcome!');

    socket.on('sendMessage', (message)=>{
        console.log('new message recieved on server');
        io.emit('message', message);
    })
});

server.listen(port, ()=>{
    console.log('server is running on port:', port);
});