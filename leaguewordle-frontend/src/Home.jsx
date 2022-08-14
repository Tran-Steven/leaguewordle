import React, { useState } from "react";
import { Card } from "antd";
import { useForm } from "react-hook-form";

//json file containing all league of legends champions
import champions from "./data/champions.json";

import "antd/lib/card/style/css";
import "./assets/css/test.css";
//components
import Header from "./components/Header/Header.jsx";
import Popup from "./components/Popup/Popup.jsx";
import PopupGameStatus from "./components/PopupGameStatus";
import { Wrong } from "./components/Wrong.js";

//imported images
import wrong from "./assets/images/wrong.png";
import down from "./assets/images/down.png";
import higher from "./assets/images/higher.png";
import correct from "./assets/images/checkmark.webp";
import logo from "./assets/images/league-of-wordle.png";
import logo2 from "./assets/images/image2vector.svg";
const Home = () => {
  //handles input submit
  const { register, handleSubmit } = useForm();

  //sets the user input with restrictions, must be a-z or A-Z or quotation mark or spaces or ampersand
  const [val, setVal] = useState("");

  //State the contact popup is at
  const [buttonPopup, setButtonPopup] = useState(true);

  //Class useStates for conditionals
  const [isRight, setIsRight] = useState(false);
  const [isWrong, setIsWrong] = useState(false);

  //Release Year useStates for conditionals
  const [isLower, setisLower] = useState(false);
  const [isHigher, setisHigher] = useState(false);
  const [isRYRight, setIsRYRight] = useState(false);
  const [isRYWrong, setIsRYWrong] = useState(false);

  //BE useStates for conditionals
  const [isBELower, setisBELower] = useState(false);
  const [isBEHigher, setisBEHigher] = useState(false);
  const [isBERight, setIsBERight] = useState(false);
  const [isBEWrong, setIsBEWrong] = useState(false);

  //RP useStates for conditionals
  const [isRPLower, setisRPLower] = useState(false);
  const [isRPHigher, setisRPHigher] = useState(false);
  const [isRPRight, setIsRPRight] = useState(false);
  const [isRPWrong, setIsRPWrong] = useState(false);

  // deals with the data from the form and sends an email
  const [sent, setSent] = useState(false);
  const [text, setText] = useState("");
  //Sets the amount of guesses
  const [counter, setCounter] = useState(5);
  //List of champions for auto complete
  const champions1 = champions;
  const [championMatch, setChampionMatch] = useState([]);
  const [correctChampion, setcorrectChampion] = useState();
  const [userGuess, setuserGuess] = useState("");
  // Disables the submit unless the user puts in a valid submit(must match a string within the champion list)
  const [isDisabled, setDisabled] = useState(true);
  const [isWon, setWon] = useState(false);
  const [isLost, setLost] = useState(false);
  //sets the index of the champions
  const [iIndex, setiIndex] = useState(0);
  const [jIndex, setjIndex] = useState(0);
  const [number, setNumber] = useState(0);

  const link = "https://leaguewordle.herokuapp.com/";

  const copy = function () {
    navigator.clipboard.writeText(link);
  };

  //when user sends a email, the textgets sent to the backend and sends it through a smtp server
  // const handleSend = async () => {
  //   setSent(true);
  //   try {
  //     await axios.post("https://leaguewordle.herokuapp.com/send_mail", {
  //       text,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     console.log("react error");
  //   }
  // };

  //goes through the champions json and takes the Champion Name and puts it in a string array
  let championList = [];
  for (let i = 0; i < champions.length; i++) {
    championList[i] = champions[i].Champion.toUpperCase().replace(/" "/g, "");
  }

  //only allows user input to be letters, spaces, or apostrophes or periods
  const isLetters = (str) => /^[A-Za-z'&." "]*$/.test(str);

  //checks if user input matches any champion within the arraylist
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

  //creates a random num, used to pick a random correctChampion
  const randNumGen = function (min = 0, max = 160) {
    let diff = max - min;
    let rand = Math.random();
    rand = Math.floor(rand * diff);
    rand = rand + min;
    return rand;
  };

  return (
    <div className="main">
      <Header />
      <Popup trigger={buttonPopup} setTrigger={setButtonPopup} />
      <main className="gameSection">
        {/* <PopupGameStatus trigger={isWon} setTrigger={setWon}>
          <img
            src={require("./assets/images/league-of-wordle.png")}
            alt="LoLxWordle Icon"
            width="50%"
          />
          <h1 className="how-to-h">GAME WON</h1>
          <p className="how-to2">
            Hey! Thanks for playing, this was made for fun over the summer to
            learn and pickup a new language. It was built using HTML,
            JavaScript, Reactjs, and Express!
          </p>
          <h2 className="how-to-h">PLAY AGAIN</h2>
          <p className="how-to2">
            If you want to start another game then just click out of this popup.
            The game picks a random champion everytime, no need to wait for
            tomorrow!
          </p>
        </PopupGameStatus>
        <PopupGameStatus trigger={isLost} setTrigger={setLost}>
          <img
            src={require("./assets/images/league-of-wordle.png")}
            alt="LoLxWordle Icon"
            width="50%"
          />
          <h1 className="how-to-h"> GAME LOST</h1>

          <p className="how-to2">
            If you want to start another game, just click out of this popup. The
            game picks a random champion everytime, no need to wait for
            tomorrow!
          </p>
          <h2 className="how-to-h">MORE INSTRUCTIONS</h2>
          <p className="how-to2">
            Click on the Github Icon below for more detailed instructions and
            explainations on to play the game and how it works.
          </p>
          <a
            href="https://github.com/Tran-Steven/leaguewordle"
            target="_blank"
            rel="noreferrer"
          >
            <img
              width="30%"
              height="auto"
              src={require("./assets/images/github.png")}
              alt="Github Icon"
            />
          </a>
        </PopupGameStatus> */}
        <h1 className="opener">Welcome to League of Wordle!</h1>
        <p className="counter">Tries Available: {counter}</p>
        <form
          onSubmit={handleSubmit(() => {
            let userInput = val;
            userInput = userInput.toUpperCase().replace(/" "/g, "");
            // console.log("User's input: " + userInput);
            // console.log("Correct champion: " + correctChampion);

            setuserGuess(userInput);
            let correctChampObj = champions[jIndex];
            let wrongChamp = champions[iIndex];

            //declaring variables to hold the champion objects
            let correctCC;
            let wrongCC;
            //declaring variables to hold ints
            let correctNum;
            let wrongNum;
            setNumber(number + 1);
            if (userInput === correctChampion) {
              setWon(true);
              setCounter(5);
              setcorrectChampion(
                champions[randNumGen()].Champion.valueOf()
                  .toString()
                  .toUpperCase()
                  .replace(/" "/g, "")
              );
              setIsWrong(false);
              setIsRight(true);
            } else {
              //initalizing variables to contain the Classes value
              wrongCC = wrongChamp.Classes.valueOf().toString();
              correctCC = correctChampObj.Classes.valueOf().toString();

              //checks if classes match
              if (counter === 1) {
                setLost(true);
                setCounter(5);
              } else {
                if (wrongCC === correctCC) {
                  setIsWrong(false);
                  setIsRight(true);
                  wrongCC = wrongChamp["Release Year"].valueOf().toString();
                  correctCC = correctChampObj["Release Year"]
                    .valueOf()
                    .toString();
                  wrongNum = parseInt(wrongCC);
                  correctNum = parseInt(correctCC);
                } else {
                  setIsWrong(true);
                  setIsRight(false);
                  wrongCC = wrongChamp["Release Year"].valueOf().toString();
                  correctCC = correctChampObj["Release Year"]
                    .valueOf()
                    .toString();
                  wrongNum = parseInt(wrongCC);
                  correctNum = parseInt(correctCC);
                }

                //checks if release year match
                if (wrongNum < correctNum) {
                  setisHigher(true);
                  setisLower(false);
                  wrongCC = wrongChamp["Blue Essence"].valueOf().toString();
                  correctCC = correctChampObj["Blue Essence"]
                    .valueOf()
                    .toString();
                  wrongNum = parseInt(wrongCC);
                  correctNum = parseInt(correctCC);
                } else if (wrongNum > correctNum) {
                  setisHigher(false);
                  setisLower(true);
                  wrongCC = wrongChamp["Blue Essence"].valueOf().toString();
                  correctCC = correctChampObj["Blue Essence"]
                    .valueOf()
                    .toString();
                  wrongNum = parseInt(wrongCC);
                  correctNum = parseInt(correctCC);
                } else {
                  setIsRYWrong(false);
                  setIsRYRight(true);
                  wrongCC = wrongChamp["Blue Essence"].valueOf().toString();
                  correctCC = correctChampObj["Blue Essence"]
                    .valueOf()
                    .toString();
                  wrongNum = parseInt(wrongCC);
                  correctNum = parseInt(correctCC);
                }

                //compare BE
                if (wrongNum < correctNum) {
                  setisBEHigher(true);
                  setisBELower(false);
                  setIsBEWrong(false);
                  setIsBERight(false);
                  wrongCC = wrongChamp.RP.valueOf().toString();
                  correctCC = correctChampObj.RP.valueOf().toString();
                  wrongNum = parseInt(wrongCC);
                  correctNum = parseInt(correctCC);
                } else if (wrongNum > correctNum) {
                  setisBEHigher(false);
                  setisBELower(true);
                  setIsBEWrong(false);
                  setIsBERight(false);
                  wrongCC = wrongChamp.RP.valueOf().toString();
                  correctCC = correctChampObj.RP.valueOf().toString();
                  wrongNum = parseInt(wrongCC);
                  correctNum = parseInt(correctCC);
                } else {
                  setIsBEWrong(false);
                  setIsBERight(true);
                  setisBEHigher(false);
                  setisBELower(false);
                  wrongCC = wrongChamp.RP.valueOf().toString();
                  correctCC = correctChampObj.RP.valueOf().toString();
                  wrongNum = parseInt(wrongCC);
                  correctNum = parseInt(correctCC);
                }

                if (wrongNum < correctNum) {
                  setisRPHigher(true);
                  setisRPLower(false);
                  setIsRPWrong(false);
                  setIsRPRight(false);
                } else if (wrongNum > correctNum) {
                  setisRPHigher(false);
                  setisRPLower(true);
                  setIsRPWrong(false);
                  setIsRPRight(false);
                } else {
                  setIsRPWrong(false);
                  setIsRPRight(true);
                  setisRPHigher(false);
                  setisRPLower(false);
                }
                setCounter(counter - 1);
              }
            }
            setVal("");
            searchChampions("Reset Search");
            setDisabled(true);
          })}
        >
          <input
            {...register("guess")}
            autoComplete="off"
            className="guess_input"
            placeholder="Enter Champion Name Here"
            type="text"
            value={val}
            onChange={(e) => {
              const { value } = e.target;
              if (isLetters(value)) {
                // finding the index of where correctChampion & userInput is in the champions array object
                const j = champions.findIndex(
                  (champion) =>
                    champion.Champion.toUpperCase().replace(/" "/g, "") ===
                    correctChampion
                );

                const i = champions.findIndex(
                  (champion) =>
                    champion.Champion.toUpperCase().replace(/" "/g, "") ===
                    value.valueOf().toUpperCase().replace(/" "/g, "")
                );
                setiIndex(i);
                setjIndex(j);
                setVal(value);
                searchChampions(value);
                if (
                  championList.some(
                    (x) => x === value.toUpperCase().replace(/" "/g, "")
                  ) === true
                ) {
                  setDisabled(false);
                } else {
                  setDisabled(true);
                }
              }
              if (!correctChampion) {
                setcorrectChampion(
                  champions[randNumGen()].Champion.valueOf()
                    .toString()
                    .toUpperCase()
                    .replace(/" "/g, "")
                );
              }
            }}
          />
          <input type="submit" disabled={isDisabled} />
          {championMatch &&
            championMatch.map((item, index) => (
              <div key={index} style={{ marginLeft: "35%", marginTop: "5px" }}>
                <Card style={{ width: "50%" }}>{item.Champion}</Card>
              </div>
            ))}
          <div className="comp">
            {isWrong && <Wrong text="Class" alt="wrong image" img={wrong} />}
            {isRight && (
              <Wrong text="Class" alt="correct image" img={correct} />
            )}

            {isRYWrong && (
              <Wrong text="Release Year" alt="wrong image" img={wrong} />
            )}
            {isRYRight && (
              <Wrong text="Release Year" alt="correct image" img={correct} />
            )}
            {isLower && (
              <Wrong text="Release Year" alt="Down Arrow image" img={down} />
            )}
            {isHigher && (
              <Wrong text="Release Year" alt="Up Arrow image" img={higher} />
            )}

            {isBEWrong && (
              <Wrong text="Blue Essence" alt="wrong img" img={wrong} />
            )}
            {isBERight && (
              <Wrong text="Blue Essence" alt="correct img" img={correct} />
            )}
            {isBELower && (
              <Wrong text="Blue Essence" alt="Down Arrow image" img={down} />
            )}
            {isBEHigher && (
              <Wrong text="Blue Essence" alt="Up Arrow image" img={higher} />
            )}

            {isRPWrong && (
              <Wrong text="Riot Points" alt="wrong img" img={wrong} />
            )}
            {isRPRight && (
              <Wrong text="Riot Points" alt="correct img" img={correct} />
            )}
            {isRPLower && (
              <Wrong text="Riot Points" alt="Down Arrow image" img={down} />
            )}
            {isRPHigher && (
              <Wrong text="Riot Points" alt="Up Arrow image" img={higher} />
            )}
          </div>
        </form>
      </main>
      <div className="bot__footer">
        <div className="bot__footer-container">
          <div className="bot__footer-container__image">
            <a
              href="https://github.com/Tran-Steven"
              target="_blank"
              rel="noreferrer"
            >
              <img
                className="bot_footer_container_image"
                src={require("./assets/images/github.png")}
                alt="Github Icon"
              />
            </a>
            <a
              href="https://www.linkedin.com/in/steven-tran-26735b206/"
              target="_blank"
              rel="noreferrer"
            >
              <img
                className="bot_footer_container_image"
                src={require("./assets/images/linkedin.png")}
                alt="Linkedin Icon"
              />
            </a>
            <img
              className="bot_footer_container_image"
              src={require("./assets/images/mail.png")}
              alt="Mail Icon"
            />
            <img
              className="bot_footer_container_image"
              src={require("./assets/images/help.png")}
              alt="Help Icon"
              onClick={() => {
                setButtonPopup(true);
                setSent(false);
                setText("");
              }}
              id="help"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
