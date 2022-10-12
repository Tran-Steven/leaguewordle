import React, { useState } from "react";
import { Card } from "antd";
import { useForm } from "react-hook-form";

//json file containing all league of legends champions (the word bank)
import champions from "../../data/champions.json";

import "antd/lib/card/style/css";
import "../../Home.css";

//components
import { ChampionHint } from "../ChampionHint/ChampionHint.tsx";
import { ChampionPopup } from "../ChampionPopup/ChampionPopup.tsx";
import Random from "../../utils/Random/Random.tsx";
import isLetters from "../../utils/isLetters/isLetters.tsx";

//imported images
import wrong from "../../assets/images/svg/wrong.svg";
import down from "../../assets/images/svg/down.svg";
import higher from "../../assets/images/svg/higher.svg";
import correct from "../../assets/images/checkmark.svg";

const Game = () => {
  //handles input and submit from the wordle textbox
  const { register, handleSubmit } = useForm();
  //sets the user input with restrictions, must be a-z or A-Z or quotation mark or spaces or ampersand
  const [val, setVal] = useState("");
  const [loadChamp, setLoadChamp] = useState(false);
  const [iconName, setIconName] = useState("");

  //Counter for amount of user guesses available
  const [counter, setCounter] = useState(5);
  const [score, setScore] = useState(0);

  //List of champions for auto complete
  const champions1 = champions;
  const [championMatch, setChampionMatch] = useState<any[]>([]);
  const [correctChampion, setcorrectChampion] = useState("");
  const [correctChampionStatus, setcorrectChampionStatus] = useState("");
  const [prevcorrectChampion, setprevcorrectChampion] = useState("");

  // Disables the submit unless the user puts in a valid submit(must match a string within the champion list)
  const [isDisabled, setDisabled] = useState(true);

  //Hooks that state if user won or lost the game
  const [isWon, setWon] = useState(false);
  const [isLost, setLost] = useState(false);
  const [gameOnGoing, setGameOnGoing] = useState(false);
  //sets the index of the correct champion and userinput and sets it to a num
  const [iIndex, setiIndex] = useState(0);
  const [jIndex, setjIndex] = useState(0);
  const [list, setList] = useState<any[]>([]);

  //goes through the champions json and takes the Champion Name and puts it in a string array
  let championList: any[] = [];
  for (let i = 0; i < champions.length; i++) {
    championList[i] = champions[i].Champion.toUpperCase().replace(/" "/g, "");
  }

  const checkValidInput = (e) => {
    findIndex(e);
    setVal(e);
    searchChampions(e);
    checkMatch(e);
    noAnswerDupe();
  };

  // checks if the correct champion(answer) is defined or the same as the previous champion
  const noAnswerDupe = () => {
    if (prevcorrectChampion === correctChampion || !correctChampion) {
      setRandChamp();
    }
  };

  // checks if the userinput is a valid champion in the word bank
  const checkMatch = (e) => {
    if (
      championList.some((x) => x === e.toUpperCase().replace(/" "/g, "")) ===
      true
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

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

  // reset counter, and removes images to reset game
  const resetGame = () => {
    setprevcorrectChampion(correctChampion);
    setGameOnGoing(false);
    setCounter(5);
    setLoadChamp(false);
  };

  // find the index of the champion objects
  const findIndex = (e) => {
    setjIndex(
      champions.findIndex(
        (champion) =>
          champion.Champion.toUpperCase().replace(/" "/g, "") ===
          correctChampion
      )
    );
    setiIndex(
      champions.findIndex(
        (champion) =>
          champion.Champion.toUpperCase().replace(/" "/g, "") ===
          e.valueOf().toUpperCase().replace(/" "/g, "")
      )
    );
  };

  // sets a random champion in the word bank for the answer
  const setRandChamp = function () {
    setcorrectChampion(
      champions[Random()].Champion.valueOf()
        .toString()
        .toUpperCase()
        .replace(/" "/g, "")
    );
  };

  return (
    <div className="lol__game">
      <div className="lolgamecontainer">
        <div className="championIconContainer">
          {/* When user submit is wrong, display champion icon */}
          {loadChamp && (
            <div className="textChampion">
              <h2 className="propText">WRONG GUESS</h2>
              <ChampionPopup
                text={iconName}
                alt="Wrong Champion img"
                img={iconName}
              />
            </div>
          )}
        </div>
        <div>
          {isWon ? (
            <div>
              <h1 className="gameStatus">GAME WON</h1>
              <h1 className="propText">CORRECT CHAMPION</h1>
              <ChampionPopup
                text={correctChampionStatus}
                alt="Wrong Champion img"
                img={correctChampionStatus}
              />
            </div>
          ) : isLost ? (
            <div>
              <h1 className="gameStatus">GAME LOST </h1>
              <div className="gameStatusBorder">
                <h1 className="propText">CORRECT CHAMPION</h1>
                <ChampionPopup
                  text={correctChampionStatus}
                  alt="Wrong Champion img"
                  img={correctChampionStatus}
                />
              </div>
            </div>
          ) : (
            <p></p>
          )}
          {/* Counter for how many attempts/guesses user has */}
          <p className="counter">Tries Available: {counter}</p>
          <p className="scoreCounter">Score: {score}</p>
        </div>

        <form
          className="formContainer"
          onSubmit={handleSubmit(() => {
            setWon(false);
            setLost(false);
            let userInput = val.toUpperCase().replace(/" "/g, "");
            let correctChamp = champions[jIndex];
            let wrongChamp = champions[iIndex];
            if (userInput === correctChampion) {
              setWon(true);
              setLost(false);
              setScore(score + 1);
              setcorrectChampionStatus(correctChampion.replace(/[^A-Z]/g, ""));
              resetGame();
            } else {
              if (counter === 1) {
                setWon(false);
                setLost(true);
                setScore(score - 1);
                setcorrectChampionStatus(
                  correctChampion.replace(/[^A-Z]/g, "")
                );
                resetGame();
              } else {
                setIconName(userInput.replace(/[^A-Z]/g, ""));
                setLoadChamp(true);
                let isSameClass =
                  wrongChamp["Classes"] === correctChamp["Classes"];
                let wrongChampNum = Number(wrongChamp["Release year"]);
                let correctChampNum = Number(correctChamp["Release Year"]);

                const newList = [...list];

                newList[0] = isSameClass ? correct : wrong;

                newList[1] =
                  wrongChampNum === correctChampNum
                    ? correct
                    : wrongChampNum < correctChampNum
                    ? higher
                    : down;

                newList[2] =
                  wrongChamp["Blue Essence"] === correctChamp["Blue Essence"]
                    ? correct
                    : wrongChamp["Blue Essence"] ===
                      correctChamp["Blue Essence"]
                    ? higher
                    : down;

                newList[3] =
                  wrongChamp["RP"] === correctChamp["RP"]
                    ? correct
                    : wrongChamp["RP"] < correctChamp["RP"]
                    ? higher
                    : down;

                setList(newList);
                setGameOnGoing(true);
                setCounter(counter - 1);
              }
            }
            setVal("");
            searchChampions("Reset Search");
            setDisabled(true);
          })}
        >
          <div className="inputContainer">
            <input
              {...register("guess")}
              autoComplete="off"
              placeholder="Enter Champion"
              type="text"
              value={val}
              // if the button is disabled, then make input area have a red border, if
              // the button is enabled, have a regular black border
              className={`${
                isDisabled ? `disabledBorder` : `unDisabledBorder`
              }`}
              onChange={({ target: { value: e } }) => {
                if (isLetters(e)) {
                  checkValidInput(e);
                }
              }}
            />
            <input type="submit" disabled={isDisabled} value="Submit" />
          </div>
          <div className="cardContainer">
            {/* Compares the user input to the list of champions to make a dropdown card autocomplete */}
            {championMatch &&
              championMatch.map((item, index) => (
                <div className="cards" key={index} style={{ marginTop: "5px" }}>
                  <Card
                    hoverable
                    style={{ width: "50%" }}
                    onClick={() => {
                      checkValidInput(item.Champion);
                    }}
                  >
                    {item.Champion}
                  </Card>
                </div>
              ))}
          </div>
          {/* The hints that show after a wrong submit */}
          {gameOnGoing && (
            <div className="comp">
              <ChampionHint text="Class" alt="Class Hint" img={list[0]} />
              <ChampionHint text="Year" alt="Year Hint" img={list[1]} />
              <ChampionHint text="BE" alt="BE Hint" img={list[2]} />
              <ChampionHint text="RP" alt="RP Hint" img={list[3]} />
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
export default Game;
