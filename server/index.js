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
        let  alluser = getUserInRoom(room);
        alluser = JSON.stringify(alluser);
        socket.emit('message',{user:'Admin', text:`${user.name} welcome to the Room ${user.room}`});
        socket.emit('roomData',{alluser:`${alluser}`});
        socket.broadcast.to(user.room).emit('roomData',{alluser:`${alluser}`});
        socket.broadcast.to(user.room).emit('message', { user:'Admin', text:`${user.name} has Join`}); 
        socket.join(user.room); 
        callack();  
    });

    socket.on('sendMessage',(message,callback) => {
        const {currentUser} = getUser(socket.id);
        io.to(currentUser.room).emit('message',{user:currentUser.name,text:message});
        callback();
    })

    socket.on('disconnect',()=> {
           const remove = removeUser(socket.id);
           console.log('disconnected');
        socket.broadcast.to(remove[0].room).emit('message', { user:'Admin', text:`${remove[0].name} has left`});
        let  alluser = getUserInRoom(remove[0].room);
        alluser = JSON.stringify(alluser); 
        console.log(alluser);
        socket.broadcast.to(remove[0].room).emit('roomData',{alluser:`${alluser}`});  
    });
});

app.use(router);
server.listen(PORT,()=> {
    console.log(`server is running on port ${PORT}`);
})