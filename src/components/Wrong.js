import { render } from "@testing-library/react";
import React from "react";
import './assets/wrong.png';

const Wrong = (props) => { 
  
    return ( 
      
      <div> 
        <h4>{props.text}</h4> 
        <img src={props.img} width="512" height="512" alt ={props.alt}></img>
      </div> 
    
    ); 
  }; 

export {Wrong};