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

let count = 0;

io.on('connection', (socket)=>{
    socket.emit('countUpdated', count);
    console.log('New Connection Added....');
    socket.on('increment', ()=>{
        count++;
        io.emit('countUpdated', count);
    });
});

server.listen(port, ()=>{
    console.log('server is running on port:', port);
});