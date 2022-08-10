import React from "react";
import "../assets/images/wrong.png";
import "../assets/css/Wrong.css";

const Wrong = (props) => {
  return (
    //base is 512x512
    <div className="wrong">
      <h2 className="propHead">{props.text}</h2>
      <img
        src={props.img}
        width="10%"
        height="10%"
        alt={props.alt}
        margin-top="1%"
      ></img>
    </div>
  );
};

export { Wrong };
