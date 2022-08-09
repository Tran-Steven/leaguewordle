import axios from "axios";
import "./Home.css";
import React, { Component, useState } from "react";
import "antd/lib/card/style/css";
import { Card } from "antd";

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
  let championList = [];
  for (let i = 0; i < champions.length; i++) {
    championList[i] = champions[i].Champion;
  }

  const [counter, setCounter] = useState(5);
  const [champions1, setChampions1] = useState(champions);
  const [championMatch, setChampionMatch] = useState([]);

  const searchChampions = (text) => {
    if (!text) {
      setChampionMatch([]);
    } else {
      let matches = champions1.filter((champion2) => {
        const regex = new RegExp(`${text}`, "gi");
        return champion2.Champion.match(regex);
      });
      setChampionMatch(matches);
    }
  };

  const isDisabled = () => {
    let num = 1;
    if (num == 0) {
      return true;
    } else if (num == 1) {
      return false;
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
    <div className="main">
      <header className="mainImage">
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
                encType="text/plain"
                onSubmit={handleSend}
              >
                <div className="contactInfo">
                  <input
                    autoComplete="off"
                    className="input100"
                    name="Bug/Issue"
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />

                  <br />
                  <input type="submit" value="Send" />
                </div>
              </form>
            ) : (
              <h2 className="confirm">Email Sent Successfully!</h2>
            )}
          </div>
        </Popup>
      </header>

      <main className="gameSection">
        <h1 className="opener">Welcome to League of Wordle!</h1>
        <p>Tries Available: {counter}</p>
        <form
          onSubmit={handleSubmit((data) => {
            let userInput = data.guess.valueOf().toUpperCase();
            correctChampion = correctChampion
              .valueOf()
              .toString()
              .toUpperCase();

            console.log("User's input: " + userInput);
            console.log("Correct champion: " + correctChampion);

            //   let matches = champions1.filter((champion2) => {
            //     const regex = new RegExp(`${text}`, "gi");
            //     return champion2.Champion.match(regex);
            //   });
            //   setChampionMatch(matches);
            // }
            let champ3 = "";
            let temp = champions1.filter((item) => {
              const regex2 = new RegExp(`${userInput}`, "gi");
              champ3 = item.Champion.match(regex2);
            });
            console.log(champ3);
            if (userInput !== correctChampion) {
              // if(userInput.valueOf().toUpperCase())
              // setIsWrong(true);
              // setIsRight(false);
              // if (counter == 0) {
              //   num = 0;
              // } else {
              // setCounter(counter - 1);
              // }
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
            autoComplete="off"
            className="guess_input"
            placeholder="Enter Champion Name Here"
            type="text"
            onChange={(e) => {
              searchChampions(e.target.value);
              // isDisabled(e.target.value);
              // console.log(isDisabled());
            }}
          />
          <input type="submit" isDisabled={isDisabled()} />
          {championMatch &&
            championMatch.map((item, index) => (
              <div key={index} style={{ marginLeft: "35%", marginTop: "5px" }}>
                <Card style={{ width: "50%" }}>{item.Champion}</Card>
              </div>
            ))}
          {isWrong && <Wrong text="Class" alt="wrong img" img={wrong} />}
          {isRight && <Wrong text="Class" alt="correct img" img={correct} />}
        </form>
      </main>

      <footer className="subImages">
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
