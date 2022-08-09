import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import titleImage from "./assets/league-of-wordle.png";
import App from "./App";
import useForm from "react-hook-form";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

// import Home component
import Home from "./components/Home";

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
      <App App="Main Page" />
    </div>
  );
}, 4700);
