import React from "react";

// ../../assets/images/tiles/{props.img}_0.jpg/

const champName = `{props.img}`;
const ChampionPopup = (props) => {
  return (
    <div className="championCompo">
      <div className="containerChampion">
        <div className="textChampion">
          <h2 className="propText">{props.text}</h2>
        </div>
        <div className="imageChampion">
          <img src={props.img} alt={props.alt} margin-top="1%" />
        </div>
      </div>
    </div>
  );
};

export { ChampionPopup };
