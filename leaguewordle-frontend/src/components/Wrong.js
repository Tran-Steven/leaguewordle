import { render } from "@testing-library/react";
import React from "react";
import "./assets/wrong.png";
import "./Wrong.css";

const Wrong = (props) => {
  return (
    //base is 512
    <div class="wrong">
      <h2 class="propHead">{props.text}</h2>
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
