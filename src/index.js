import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import titleImage from './assets/league-of-wordle.png'
import App from './App';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

// import Home component & import About component
import Home from "./components/Home";
import About from "./components/About";

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <div class="image-container">
    <img id="title" src={titleImage} alt="Title Screen" class="center"></img>
  </div>
)
const home = ReactDOM.createRoot(document.getElementById('root'))


setTimeout(function () {
  home.render(
    <div class="main-load-in">
      <App App="Main Page" />
    </div>
  );
}, 4700);
