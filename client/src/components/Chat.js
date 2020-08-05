import React, { useState, useEffect } from 'react';
import queryString from'query-string'
import io from 'socket.io-client';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Messages from './Messages';

let socket;
const Chat = ({location}) => {
    const [name,setName] = useState('');
    const [room,setRoom] = useState('');
    const[message,setMessage] = useState('');
    const[messages,setMessages] = useState([ ]);

    let ENDPOINT = 'localhost:4000';
    useEffect(() => {
        const { name, room} = queryString.parse(location.search);
        setName(name);
        setRoom(room);
        socket = io(ENDPOINT) 
        socket.emit('join', {name, room },() => {
            
        });
        return() => {
            socket.emit('disconnect');
            socket.off();
        }
    },[ ENDPOINT, location.search]);

    useEffect(() => {
        socket.on('message', (message) => {
           setMessages([...messages,message]);
        })
    }, [messages])

// function for sending messages
 const sendMessage = (event) => {
    event.preventDefault();
     if(message){
         socket.emit('sendMessage', message ,() => setMessage(''));
     }
 } 

    return(
        <React.Fragment>
             <div className=" row">
                <div className="col-md-6">
                    <div className="room-heading">
                        <img className="online" src="./images/onlin.png"></img>
                        <h3>{room}</h3>
                        <Link to='/'>
                            <img  className="close-img" src="./images/close.jpg" alt=""/>
                        </Link>
                    </div>
                    <div className="chat-body">
                     <Messages messages={messages} name={name}/>
                    </div>
                    <div className="messg-chat">
                        <div className="form-group">
                            <input 
                            type="text" 
                            className="form-control" 
                            onChange = {(event) => setMessage(event.target.value)}
                            onKeyPress = { (event) => event.key === 'Enter' ?  sendMessage(event) : null}
                            placeholder="Type the Message......"
                            />
                        </div>
                        <button type="button">Send</button>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="info-chat">
                    <h1>Realtime Chat Application 💬</h1>
                    <h3>Created with React, Express, Node and Socket.IO ❤️</h3>
                        <h2>People currently chatting:</h2>
                        <ul>
                            <li>  
                                <img className="online1" src="./images/onlin.png"></img>
                                <h4>Akshay</h4> 
                            </li>
                        </ul>
                    
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
};

export default Chat;