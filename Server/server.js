const path = require('path');
const http=require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicpath = path.join(__dirname,'/../public');

const port = process.env.PORT||3000;
const app = express();
var server = http.createServer(app);
var io = socketIO(server);
app.use(express.static(publicpath));

io.on('connection',(socket)=>{
    console.log('New user connected');

    socket.on('createMessage',(message)=>{
        console.log('createMessage', message);
        io.emit('newMessage',{
            from:message.from,
            text:message.text,
            createdAt:new Date().getTime()
        });
     });
    socket.on('disconnect', ()=>{
        console.log('User was disconnected');
    });
});


server.listen(port,()=>{
    console.log(`Server is up at port ${port}.`)
})