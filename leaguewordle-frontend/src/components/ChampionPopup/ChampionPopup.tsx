import React from "react";
import "./ChampionPopup.css";
const ChampionPopup = (props) => {
  return (
    <div className="containerChampion">
      <img
        className="imageChampion"
        src={require(`../../assets/images/icons/${props.img}.jpg`)}
        alt={props.alt}
      />
      <h2 className="propText">{props.text}</h2>
    </div>
  );
};
export { ChampionPopup };
