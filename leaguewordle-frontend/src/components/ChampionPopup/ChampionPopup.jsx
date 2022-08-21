import React from "react";
import "./ChampionPopup.css";
const ChampionPopup = (props) => {
  return (
    <div className="championCompo">
      <div className="containerChampion">
        <div className="textChampion">
          <h2 className="propText">Wrong Guess</h2>
        </div>
        <div className="imageChampion">
          <img
            src={require(`../../assets/images/icons/${props.img}.jpg`)}
            alt={props.alt}
            width="5%"
            height="5%"
          />
        </div>
        <h2 className="propText">{props.text}</h2>
      </div>
    </div>
  );
};

export { ChampionPopup };
