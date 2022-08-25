import React, { useState } from "react";
import { Card } from "antd";
import { useForm } from "react-hook-form";
//json file containing all league of legends champions
import champions from "./data/champions.json";
import "antd/lib/card/style/css";
import "./assets/css/Home.css";
//components
import Header from "./components/Header/Header.tsx";
import Footer from "./components/Footer/Footer.tsx";
import { ChampionHint } from "./components/ChampionHint/ChampionHint.tsx";
import { ChampionPopup } from "./components/ChampionPopup/ChampionPopup.tsx";
import Random from "./utils/Random.tsx";
import isLetters from "./utils/isLetters.tsx";
//imported images
import wrong from "./assets/images/svg/wrong.svg";
import down from "./assets/images/svg/down.svg";
import higher from "./assets/images/svg/higher.svg";
import correct from "./assets/images/checkmark.svg";
import lollogo from "./assets/images/image2vector.svg";

const Home = () => {
  //handles input and submit from the wordle textbox
  const { register, handleSubmit } = useForm();
  //sets the user input with restrictions, must be a-z or A-Z or quotation mark or spaces or ampersand
  const [val, setVal] = useState("");
  const [loadChamp, setLoadChamp] = useState(false);
  const [iconName, setIconName] = useState("");
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

  //Sets the amount of guesses
  const [counter, setCounter] = useState(5);

  //List of champions for auto complete
  const champions1 = champions;
  const [championMatch, setChampionMatch] = useState<any[]>([]);
  const [correctChampion, setcorrectChampion] = useState("");
  const [prevcorrectChampion, setprevcorrectChampion] = useState("");

  // Disables the submit unless the user puts in a valid submit(must match a string within the champion list)
  const [isDisabled, setDisabled] = useState(true);

  //Hooks that state if user won or lost the game
  const [isWon, setWon] = useState(false);
  const [isLost, setLost] = useState(false);

  //sets the index of the correct champion and userinput and sets it to a num
  const [iIndex, setiIndex] = useState(0);
  const [jIndex, setjIndex] = useState(0);

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
    setCounter(5);
    setIsWrong(false);
    setIsRight(true);
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
    <div className="main">
      <header>
        <Header />
      </header>

      <main className="gameSection">
        <div className="lol__game">
          <div className="lol__game-container">
            {loadChamp && (
              <ChampionPopup
                text={iconName}
                alt="Wrong Champion img"
                img={iconName}
              />
            )}

            <p className="counter">Tries Available: {counter}</p>

            <div className="form-containerChampion">
              <div className="formcontentmove">
                <form
                  className="formparam"
                  onSubmit={handleSubmit(() => {
                    let userInput = val.toUpperCase().replace(/" "/g, "");
                    setIconName(userInput.replace(/[^A-Z]/g, ""));
                    let correctChampObj = champions[jIndex];
                    let wrongChamp = champions[iIndex];
                    //declaring variables to hold the champion objects
                    let correctCC;
                    let wrongCC;
                    //declaring variables to hold ints
                    let correctNum;
                    let wrongNum;
                    if (userInput === correctChampion) {
                      resetGame();
                      setWon(true);
                    } else {
                      //initalizing variables to contain the Classes value
                      wrongCC = wrongChamp.Classes.valueOf().toString();
                      correctCC = correctChampObj.Classes.valueOf().toString();
                      //checks if classes match
                      if (counter === 1) {
                        resetGame();
                        setLost(true);
                      } else {
                        setLoadChamp(true);
                        if (wrongCC === correctCC) {
                          setIsWrong(false);
                          setIsRight(true);
                          wrongCC = wrongChamp["Release Year"]
                            .valueOf()
                            .toString();
                          correctCC = correctChampObj["Release Year"]
                            .valueOf()
                            .toString();
                          wrongNum = parseInt(wrongCC);
                          correctNum = parseInt(correctCC);
                        } else {
                          setIsWrong(true);
                          setIsRight(false);
                          wrongCC = wrongChamp["Release Year"]
                            .valueOf()
                            .toString();
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
                          setIsRYWrong(false);
                          setIsRYRight(false);
                          wrongCC = wrongChamp["Blue Essence"]
                            .valueOf()
                            .toString();
                          correctCC = correctChampObj["Blue Essence"]
                            .valueOf()
                            .toString();
                          wrongNum = parseInt(wrongCC);
                          correctNum = parseInt(correctCC);
                        } else if (wrongNum > correctNum) {
                          setisHigher(false);
                          setisLower(true);
                          setIsRYWrong(false);
                          setIsRYRight(false);
                          wrongCC = wrongChamp["Blue Essence"]
                            .valueOf()
                            .toString();
                          correctCC = correctChampObj["Blue Essence"]
                            .valueOf()
                            .toString();
                          wrongNum = parseInt(wrongCC);
                          correctNum = parseInt(correctCC);
                        } else {
                          setIsRYWrong(false);
                          setIsRYRight(true);
                          setisHigher(false);
                          setisLower(false);
                          wrongCC = wrongChamp["Blue Essence"]
                            .valueOf()
                            .toString();
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
                  <div className="lol__game-container-div">
                    <div className="lol_game-container-div_inlinetogether">
                      <input
                        {...register("guess")}
                        autoComplete="off"
                        placeholder="Enter Champion"
                        type="text"
                        value={val}
                        onChange={({ target: { value: e } }) => {
                          if (isLetters(e)) {
                            checkValidInput(e);
                          }
                        }}
                      />
                      <input type="submit" disabled={isDisabled} />
                    </div>
                  </div>
                  <div className="game-target">
                    {championMatch &&
                      championMatch.map((item, index) => (
                        <div
                          className="no-overflow"
                          key={index}
                          style={{ marginTop: "5px" }}
                        >
                          <Card
                            hoverable
                            className="card1"
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
                  <div className="comp">
                    {isWrong && (
                      <ChampionHint
                        text="Class"
                        alt="wrong image"
                        img={wrong}
                      />
                    )}
                    {isRight && (
                      <ChampionHint
                        text="Class"
                        alt="correct image"
                        img={correct}
                      />
                    )}

                    {isRYWrong && (
                      <ChampionHint
                        text="Release Year"
                        alt="wrong image"
                        img={wrong}
                      />
                    )}
                    {isRYRight && (
                      <ChampionHint
                        text="Release Year"
                        alt="correct image"
                        img={correct}
                      />
                    )}
                    {isLower && (
                      <ChampionHint
                        text="Release Year"
                        alt="Down Arrow image"
                        img={down}
                      />
                    )}
                    {isHigher && (
                      <ChampionHint
                        text="Release Year"
                        alt="Up Arrow image"
                        img={higher}
                      />
                    )}

                    {isBEWrong && (
                      <ChampionHint text="BE" alt="wrong img" img={wrong} />
                    )}
                    {isBERight && (
                      <ChampionHint text="BE" alt="correct img" img={correct} />
                    )}
                    {isBELower && (
                      <ChampionHint
                        text="BE"
                        alt="Down Arrow image"
                        img={down}
                      />
                    )}
                    {isBEHigher && (
                      <ChampionHint
                        text="BE"
                        alt="Up Arrow image"
                        img={higher}
                      />
                    )}

                    {isRPWrong && (
                      <ChampionHint text="RP" alt="wrong img" img={wrong} />
                    )}
                    {isRPRight && (
                      <ChampionHint text="RP" alt="correct img" img={correct} />
                    )}
                    {isRPLower && (
                      <ChampionHint
                        text="RP"
                        alt="Down Arrow image"
                        img={down}
                      />
                    )}
                    {isRPHigher && (
                      <ChampionHint
                        text="RP"
                        alt="Up Arrow image"
                        img={higher}
                      />
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};
export default Home;
