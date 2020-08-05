import React, { useState, useEffect } from 'react';

const Message = ({message,name}) => {
  console.log(message);
   let isThatCustomer = name.trim().toLowerCase();
   if(message.user === isThatCustomer) { 
     return (
       <React.Fragment>
         <div className="bubble-right">
         {message.text}
         </div>
            
       </React.Fragment>    
     )
   }if(message.user === "Admin") {
    return (
      <React.Fragment>
            <div className="bubble-left" style={{backgroundColor:"white",color:"black",padding:'10px',textAlign:'center'}}>
        {message.text}
        <div> &nbsp;&nbsp; </div>
        <div className='header-messg-by'>By {message.user}</div>
       </div>
            
       </React.Fragment> 
    )
   } 
   else {

    return (
      <React.Fragment>
      <div className="bubble-left">
        {message.text}
        <div> &nbsp;&nbsp; </div>
        <div className='header-messg-by'>By {message.user}</div>
       </div>
  </React.Fragment> 
    )
   }

}

export default Message;