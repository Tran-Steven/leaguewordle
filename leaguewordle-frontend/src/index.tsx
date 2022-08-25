import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./Home.tsx";
//importing assets
import "./assets/css/index.css";
import titleImage from "./assets/images/league-of-wordle.png";
let root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <div className="image-container">
    <img id="title" src={titleImage} alt="Title Screen" className="center" />
  </div>
);
setTimeout(function () {
  root.render(
    <div className="main-load-in">
      <Home />
    </div>
  );
}, 1800);
