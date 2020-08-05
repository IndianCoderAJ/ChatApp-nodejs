import React, { useState, useEffect } from 'react';

const Message = ({message,name}) => {
  return (
      <p>{message.text}</p>
  )
}

export default Message;