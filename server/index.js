var express = require('express')
const socketIO = require('socket.io');
const router = require('./Router');
const http = require('http');
const { addUser, removeUser, getUser, getUserInRoom} = require('./users'); 
const PORT =  4000;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

io.on('connection',(socket) =>{
    console.log("we have new Connection !!!!");
    socket.on('join', ( { name, room}, callack) => {
        const { errors, user} = addUser({id:socket.id, name, room});
        if(errors) return callack(errors);
        socket.emit('message',{user:'Admin', text:`${user.name} welcome to Room ${user.room}`} );
        socket.broadcast.to(user.room).emit('message', { user:'admin', text:`${user.name} has Join`});  
        socket.join(user.room); 
        callack();  
    });

    socket.on('sendMessage',(message,callback) => {
        const {currentUser} = getUser(socket.id);
        console.log(currentUser);
        io.to(currentUser.room).emit('message',{user:currentUser.name,text:message});
        callback();
    })

    socket.on('disconnect',()=> {
        console.log("user had disconnected");
    });
});

app.use(router);
server.listen(PORT,()=> {
    console.log(`server is running on port ${PORT}`);
})