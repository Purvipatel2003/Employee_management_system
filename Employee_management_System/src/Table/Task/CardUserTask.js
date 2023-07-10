 import React from 'react'
 import '../Task/card.css';
 export const CardUserTask = (props) => {
   return (
    
    <div className="popup-box">
    <div className="box">
      <span className="close-icon" onClick={props.handleClose}>x</span>
      {props.content}
    </div>
  </div>
     
   )
 }
 