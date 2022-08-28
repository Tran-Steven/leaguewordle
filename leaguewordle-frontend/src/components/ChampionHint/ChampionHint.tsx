import React from "react";
import "../../assets/images/wrong.png";
import "./ChampionHint.css";
const ChampionHint = (props) => {
  return (
    //Image base is 512x512c
    <div className="hint">
      <div className="containerHint">
        <div className="textHint">
          <h2 className="propHead">{props.text}</h2>
        </div>
        <div className="imageHint">
          <img
            src={props.img}
            alt={props.alt}
            margin-top="1%"
            className="wrongHint"
          />
        </div>
      </div>
    </div>
  );
};
export { ChampionHint };
