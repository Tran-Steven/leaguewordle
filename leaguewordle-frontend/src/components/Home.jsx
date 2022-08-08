import axios from "axios";
import "./Home.css";
import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Popup from "./Popup";
import champions from "./champions.json";
import { Wrong } from "./Wrong.js";

import wrong from "./assets/wrong.png";
import down from "./assets/down.png";
import higher from "./assets/higher.png";
import correct from "./assets/checkmark.webp";
import { render } from "@testing-library/react";

const Home = () => {
  const { register, handleSubmit } = useForm();
  const [buttonPopup, setButtonPopup] = useState(true);
  const [buttonConPopup, setButtonConPopup] = useState(true);
  const [isToggled, setIsToggled] = useState(false);
  const [isRight, setIsRight] = useState(false);
  const [isWrong, setIsWrong] = useState(false);

  //deals with the data from the form and sends an email
  const [sent, setSent] = useState(false);
  const [text, setText] = useState("");

  const handleSend = async () => {
    setSent(true);
    try {
      await axios.post("http://localhost:2525/send_mail", {
        text,
      });
    } catch (error) {
      console.log(error);
      console.log("react error");
    }
  };

  const randNumGen = function () {
    var maxLimit = 161;
    let rand = Math.random() * maxLimit;
    rand = Math.floor(rand);
    return rand;
  };
  const getCorrectChampion = () => champions[randNumGen()].Champion;
  let correctChampion = champions[randNumGen()].Champion;
  return (
    <div class="main">
      <header class="mainImage">
        <img
          src={require("./assets/league-of-wordle.png")}
          alt="LoLxWordle Icon"
          width="22%"
        />
        <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
          <img
            src={require("./assets/league-of-wordle.png")}
            alt="LoLxWordle Icon"
            width="50%"
          />
          <h2 className="how-to-h">HOW TO PLAY</h2>
          <p className="how-to">
            Guess the League of legends champion within 5 tries. For every
            unsuccessful try, a hint will be given showing if your BE Amount, RP
            Amount, Release Date Year, or Champion Class is correct.
            <br />
            <br />
            Each guess has to be a valid champion. Click the send button below
            to submit.
          </p>
          <h2 className="found-bug">FOUND A BUG OR HAVE AN ISSUE?</h2>
          <div className="formHolder">
            {!sent ? (
              <form
                target="_top"
                method="post"
                action="mailto:visualsteven@gmail.com"
                enctype="text/plain"
                onSubmit={handleSend}
              >
                <div className="contactInfo">
                  <input
                    class="input100"
                    name="Bug/Issue"
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />

                  {/* <textarea class="input100" name="Bug/Issue"></textarea> */}
                  <br />
                  <input type="submit" value="Send" />
                </div>
              </form>
            ) : (
              // <Confirm trig={buttonConPopup} setTrig={setButtonConPopup}>
              <h2 className="confirm">Email Sent Successfully!</h2>
              // </Confirm>
            )}
          </div>
        </Popup>
      </header>

      <main class="gameSection">
        <h1 className="opener">Welcome to League of Wordle!</h1>
        <form
          onSubmit={handleSubmit((data) => {
            let userInput = data.guess;
            console.log("User's input: " + userInput);
            const championList = Object.keys(champions);

            console.log("Correct champion: " + correctChampion);

            if (
              userInput.valueOf().toUpperCase() !==
              correctChampion.valueOf().toString().toUpperCase()
            ) {
              setIsWrong(true);
              setIsRight(false);
            } else if (
              userInput.valueOf().toUpperCase() ===
              correctChampion.valueOf().toString().toUpperCase()
            ) {
              setIsWrong(false);
              setIsRight(true);
            }
          })}
        >
          <input
            {...register("guess")}
            class="guess_input"
            placeholder="Enter Champion Name Here"
            type="text"
          />
          <input type="submit" />
          {isWrong && <Wrong text="Class" alt="wrong img" img={wrong} />}
          {isRight && <Wrong text="Class" alt="correct img" img={correct} />}
        </form>
      </main>

      <footer class="subImages">
        <a
          href="https://github.com/Tran-Steven"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src={require("./assets/github.png")}
            alt="Github Icon"
            width="18%"
            height="auto"
          />
        </a>
        <a
          href="https://www.linkedin.com/in/steven-tran-26735b206/"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src={require("./assets/linkedin.png")}
            alt="Linkedin Icon"
            width="18%"
            height="auto"
          />
        </a>
        <img
          src={require("./assets/mail.png")}
          alt="Mail Icon"
          width="18%"
          height="auto"
        />
        <img
          src={require("./assets/help.png")}
          alt="Help Icon"
          width="18%"
          height="auto"
          onClick={() => {
            setButtonPopup(true);
            setSent(false);
            setText("");
          }}
          id="help"
        />
        <img
          src={require("./assets/share.png")}
          alt="Share Icon"
          width="18%"
          height="auto"
        />
      </footer>
    </div>
  );
};

export default Home;
