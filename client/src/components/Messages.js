import React, { useState, useEffect } from 'react';
import Scrolltobottom from 'react-scroll-to-bottom'
import Message from './Message';

const Messages = ({messages,name}) => {
  return (
        <Scrolltobottom>
       {messages.map( (message,i)=> <div key={i}><Message message={message} name={name} /></div>)}
       </Scrolltobottom>
  )
}

export default Messages;