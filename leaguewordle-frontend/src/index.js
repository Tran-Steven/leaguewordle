import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./Home";
// import { createStore } from "redux";
//importing assets
import "./assets/css/index.css";
import titleImage from "./assets/images/league-of-wordle.png";
// import allReducers from "./state/reducers";

// const store = createStore(allReducers);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <div className="image-container">
    <img
      id="title"
      src={titleImage}
      alt="Title Screen"
      className="center"
    ></img>
  </div>
);

setTimeout(function () {
  root.render(
    <div className="main-load-in">
      <Home />
    </div>
  );
}, 4700);
