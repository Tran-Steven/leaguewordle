import React from "react";
import "../../assets/images/wrong.png";
import "./ChampionHint.css";
const ChampionHint = (props) => {
  return (
    //Image base is 512x512c
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
export { ChampionHint };
