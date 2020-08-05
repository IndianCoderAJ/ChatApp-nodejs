import React, { useState, useEffect } from 'react';
import { css } from 'glamor';
import ScrollToBottom  ,{ useScrollToBottom, useSticky }from 'react-scroll-to-bottom'
import Message from './Message';
import './css/Message.css';


const Messages = ({messages,name}) => {

  return (  
        <ScrollToBottom  className="chat-body"> 
        
       {messages.map( (message,i)=> <div key={i}><Message message={message} name={name} /></div>)}
        <div> &nbsp;&nbsp; </div>
       </ScrollToBottom >
  )
}

export default Messages;