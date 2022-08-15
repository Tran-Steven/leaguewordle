import React from "react";
import "../assets/images/wrong.png";
import "../assets/css/Wrong.css";

const Wrong = (props) => {
  return (
    //base is 512x512
    <div className="wrong">
      <div className="containerWrong">
        <div className="textWrong">
          <h2 className="propHead">{props.text}</h2>
        </div>
        <div className="imageWrong">
          <img
            src={props.img}
            alt={props.alt}
            margin-top="1%"
            className="wrongImg"
          />
        </div>
      </div>
    </div>
  );
};

export { Wrong };
