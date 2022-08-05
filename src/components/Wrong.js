import { render } from "@testing-library/react";
import React from "react";
import './assets/wrong.png';

const Wrong = (props) => { 
  
    return ( 
      
      //base is 512
      <div> 
        <h2>{props.text}</h2> 
        <img src={props.img} width="10%" height="10%" alt ={props.alt}></img> 
      </div> 
    
    ); 
  }; 

export {Wrong};