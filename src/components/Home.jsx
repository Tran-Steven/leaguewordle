import './Home.css'
import React, { Component, useState } from 'react';
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Popup from "./Popup";
import Contact from "./Contact";
import champions from "./champions.json";
import { Wrong } from './Wrong.js';

import wrong from './assets/wrong.png'
import down from './assets/down.png'
import higher from './assets/higher.png'
import correct from './assets/checkmark.webp'
import { render } from '@testing-library/react';

const Home = () => {
  const { register, handleSubmit } = useForm();
  const [buttonPopup, setButtonPopup] = useState(true);
  const [show, setShow] = useState(false);

  const randNumGen = function () {
    var maxLimit = 161;
    let rand = Math.random() * maxLimit;
    rand = Math.floor(rand);
    return rand;
  }

  let correctChampion = champions[randNumGen()].Champion;
  return (
    <div class="main">
      <header class="mainImage">
        <img src={require('./assets/league-of-wordle.png')} alt="LoLxWordle Icon" width="312" height="119.6" nameClass="popup-i" />
        <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
          <img src={require('./assets/league-of-wordle.png')} alt="LoLxWordle Icon" width="312" height="119.6" />
          <h4 className='how-to-h'>HOW TO PLAY</h4>
          <p className='how-to'>Guess the League of legends champion within 5 tries.
            For every unsuccessful try, a hint will be given showing if your
            BE Amount, RP Amount, Release Date Year, or Champion Class is correct.
            <br />
            <br />
            Each guess has to be a valid champion. Click the send button below to submit.</p>
          <h4 className="found-bug">FOUND A BUG OR HAVE AN ISSUE?</h4>
          <Contact></Contact>
        </Popup>
      </header>



      <main class="gameSection">
        <h1>Welcome to League of Wordle!</h1>
        <form
          onSubmit={handleSubmit((data) => {
            let userInput = data.guess;
            const championList = Object.keys(champions);
            if (userInput.valueOf().toUpperCase() !== correctChampion.valueOf().toUpperCase()) {
              <Wrong text="Class" alt="wrong img" img={wrong} />
              
            }
          })

          }
        >
          <input 
          {...register("guess")} class="guess_input" placeholder="Enter Champion Name Here" type="text" />
          <input class="guess_input" type="submit" />
        </form>
      </main>


      <footer class="subImages">
        <a href="https://github.com/Tran-Steven" target="_blank" rel="noreferrer">
          <img src={require('./assets/github.png')} alt="Github Icon" width="265" height="102" />
        </a>
        <a href="https://www.linkedin.com/in/steven-tran-26735b206/" target="_blank" rel="noreferrer">
          <img src={require('./assets/linkedin.png')} alt="Linkedin Icon" width="265" height="102" />
        </a>
        <img src={require('./assets/mail.png')} alt="Mail Icon" width="265" height="102" />
        <img src={require('./assets/help.png')} alt="Help Icon" width="265" height="102" onClick={() => setButtonPopup(true)} id="help" />
        <img src={require('./assets/share.png')} alt="Share Icon" width="265" height="102" />
      </footer>


    </div>
  );
};

export default Home;