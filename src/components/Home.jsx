import './Home.css'
import React from "react";
// importing Link from react-router-dom to navigate to 
// different end points.
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div class="main">
      <div class="imageßs">
        <img src={require('./assets/league-of-wordle.png')} alt="LoLxWordle Icon" width="312" height="119.6" />
      </div>
      <div class="game">ß
        <h1>Welcome to League of Wordle!</h1>
        <form action="Home.jsx" method="GET">
          <input type="text" name="txtbox" id="txtbox" />
          <input id="guess_submit" class="guess_input" type="submit" value="Submit" />
        </form>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <div class="sub-image">
          <img src={require('./assets/github.png')} alt="Github Icon" width="312" height="119.6" />
          <img src={require('./assets/linkedin.png')} alt="Linkedin Icon" width="312" height="119.6" />
          <img src={require('./assets/mail.png')} alt="Mail Icon" width="312" height="119.6" />
          <img src={require('./assets/share.png')} alt="Share Icon" width="312" height="119.6" />
        </div>
      </div>
    </div>
  );
};

export default Home;