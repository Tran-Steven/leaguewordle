import React, { useState } from "react";
import axios from "axios";
import { Card, Popconfirm } from "antd";
import { useForm } from "react-hook-form";
import champions from "./data/champions.json";
//css
import "./assets/css/Home.css";
import "antd/lib/card/style/css";

//imported components
import Popup from "./components/Popup";
import PopupWon from "./components/PopupWon";
import { Wrong } from "./components/Wrong.js";

//imported images
import wrong from "./assets/images/wrong.png";
import down from "./assets/images/down.png";
import higher from "./assets/images/higher.png";
import correct from "./assets/images/checkmark.webp";

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
  const handleSend = async () => {
    setSent(true);
    try {
      await axios.post("https://leaguewordle.herokuapp.com/send_mail", {
        text,
      });
    } catch (error) {
      console.log(error);
      console.log("react error");
    }
  };

  //goes through the champions json and takes the Champion Name and puts it in a string array
  let championList = [];
  for (let i = 0; i < champions.length; i++) {
    championList[i] = champions[i].Champion.toUpperCase().replaceAll(" ", "");
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
  const randNumGen = function () {
    var maxLimit = 161;
    let rand = Math.random() * maxLimit;
    rand = Math.floor(rand);
    return rand;
  };

  return (
    <div className="main">
      <header className="mainImage">
        <img
          src={require("./assets/images/league-of-wordle.png")}
          alt="LoLxWordle Icon"
          width="22%"
        />
        <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
          <img
            src={require("./assets/images/league-of-wordle.png")}
            alt="LoLxWordle Icon"
            width="50%"
          />
          <h2 className="how-to-h">HOW TO PLAY</h2>
          <p className="how-to">
            Guess the League of legends champion within 5 tries. For every
            unsuccessful try, a hint will be given showing if your BE Amount, RP
            Amount, Release Year, or Champion Class is correct.
            <br />
            <br />
            Each guess has to be a valid champion. Click the Submit button on
            the left or click enter to submit your guess.
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
        <PopupWon trigger={isWon} setTrigger={setWon}>
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
        </PopupWon>
        <PopupWon trigger={isLost} setTrigger={setLost}>
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
        </PopupWon>
        <h1 className="opener">Welcome to League of Wordle!</h1>
        <p className="counter">Tries Available: {counter}</p>
        <form
          onSubmit={handleSubmit(() => {
            let userInput = val;
            userInput = userInput.toUpperCase().replaceAll(" ", "");
            console.log("User's input: " + userInput);
            console.log("Correct champion: " + correctChampion);

            console.log("Test below: ");
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
                  .replaceAll(" ", "")
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
                  console.log("Classes match");
                } else {
                  setIsWrong(true);
                  setIsRight(false);
                  wrongCC = wrongChamp["Release Year"].valueOf().toString();
                  correctCC = correctChampObj["Release Year"]
                    .valueOf()
                    .toString();
                  wrongNum = parseInt(wrongCC);
                  correctNum = parseInt(correctCC);
                  console.log("Classes don't match");
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
                  console.log("Release year is less than");
                } else if (wrongNum > correctNum) {
                  setisHigher(false);
                  setisLower(true);
                  wrongCC = wrongChamp["Blue Essence"].valueOf().toString();
                  correctCC = correctChampObj["Blue Essence"]
                    .valueOf()
                    .toString();
                  wrongNum = parseInt(wrongCC);
                  correctNum = parseInt(correctCC);
                  console.log("Release year are greater");
                } else {
                  setIsRYWrong(false);
                  setIsRYRight(true);
                  wrongCC = wrongChamp["Blue Essence"].valueOf().toString();
                  correctCC = correctChampObj["Blue Essence"]
                    .valueOf()
                    .toString();
                  wrongNum = parseInt(wrongCC);
                  correctNum = parseInt(correctCC);
                  console.log("Release years are equal");
                }

                //compare BE
                if (wrongNum < correctNum) {
                  setisBEHigher(true);
                  setisBELower(false);
                  wrongCC = wrongChamp.RP.valueOf().toString();
                  correctCC = correctChampObj.RP.valueOf().toString();
                  wrongNum = parseInt(wrongCC);
                  correctNum = parseInt(correctCC);
                  console.log("You have to guess higher");
                } else if (wrongNum > correctNum) {
                  setisBEHigher(false);
                  setisBELower(true);
                  wrongCC = wrongChamp.RP.valueOf().toString();
                  correctCC = correctChampObj.RP.valueOf().toString();
                  wrongNum = parseInt(wrongCC);
                  correctNum = parseInt(correctCC);
                  console.log("You have to guess lower");
                } else {
                  setIsBEWrong(false);
                  setIsBERight(true);
                  wrongCC = wrongChamp.RP.valueOf().toString();
                  correctCC = correctChampObj.RP.valueOf().toString();
                  wrongNum = parseInt(wrongCC);
                  correctNum = parseInt(correctCC);
                  console.log("BE are equal");
                }

                if (wrongNum < correctNum) {
                  setisRPHigher(true);
                  setisRPLower(false);
                  console.log("RP is less than");
                } else if (wrongNum > correctNum) {
                  setisRPHigher(false);
                  setisRPLower(true);
                  console.log("RP are greater");
                } else {
                  setIsRPWrong(false);
                  setIsRPRight(true);
                  console.log("RP are equal");
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
                    champion.Champion.toUpperCase().replaceAll(" ", "") ===
                    correctChampion
                );

                const i = champions.findIndex(
                  (champion) =>
                    champion.Champion.toUpperCase().replaceAll(" ", "") ===
                    value.valueOf().toUpperCase().replaceAll(" ", "")
                );
                setiIndex(i);
                setjIndex(j);
                setVal(value);
                searchChampions(value);
                if (
                  championList.some(
                    (x) => x === value.toUpperCase().replaceAll(" ", "")
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
                    .replaceAll(" ", "")
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

      <footer className="subImages">
        <a
          href="https://github.com/Tran-Steven"
          target="_blank"
          rel="noreferrer"
        >
          <img
            className="footerImages"
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
            className="footerImages"
            src={require("./assets/images/linkedin.png")}
            alt="Linkedin Icon"
          />
        </a>
        <img
          className="footerImages"
          src={require("./assets/images/mail.png")}
          alt="Mail Icon"
        />
        <img
          className="footerImages"
          src={require("./assets/images/help.png")}
          alt="Help Icon"
          onClick={() => {
            setButtonPopup(true);
            setSent(false);
            setText("");
          }}
          id="help"
        />

        <img
          onClick={() => {
            copy();
          }}
          a
          href="#"
          className="footerImages"
          src={require("./assets/images/share.png")}
          alt="Share Icon"
        />
      </footer>
    </div>
  );
};

export default Home;
