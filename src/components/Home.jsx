import './Home.css'
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const Home = () => {
  const { register, handleSubmit } = useForm();
  return (
    <div class="main">
      <div class="images">
        <img src={require('./assets/league-of-wordle.png')} alt="LoLxWordle Icon" width="312" height="119.6" />
      </div>
      <div class="game">
        <h1>Welcome to League of Wordle!</h1>

        <form
          onSubmit={handleSubmit((data) => {
            console.log(data);
          })}
        >
          <input  {...register("guess")} class="guess_input" placeholder="Enter Champion Name Here" type="text" />
          <input class="guess_input" type="submit" />
        </form>

        <div class="sub-image" id="footer">
          <a href="https://github.com/Tran-Steven" target="_blank" rel="noreferrer">
            <img src={require('./assets/github.png')} alt="Github Icon" width="312" height="119.6" />
          </a>
          <a href="https://www.linkedin.com/in/steven-tran-26735b206/" target="_blank" rel="noreferrer">
            <img src={require('./assets/linkedin.png')} alt="Linkedin Icon" width="312" height="119.6" />
          </a>
          <img src={require('./assets/mail.png')} alt="Mail Icon" width="312" height="119.6" />
          <img src={require('./assets/share.png')} alt="Share Icon" width="312" height="119.6" />
        </div>

      </div>
    </div>
  );
};

export default Home;