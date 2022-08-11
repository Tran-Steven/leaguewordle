import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "antd";
import { useForm } from "react-hook-form";
import champions from "./data/champions.json";

//css
import "./assets/css/Home.css";
import "antd/lib/card/style/css";

//imported .js files
import { Wrong } from "./components/Wrong.js";

//imported components
import Popup from "./components/Popup";
import Random from "./utils/Random";

//imported images
import wrong from "./assets/images/wrong.png";
import down from "./assets/images/down.png";
import higher from "./assets/images/higher.png";
import correct from "./assets/images/checkmark.webp";

const Home = () => {
  // const initialState = {
  //   buttonPopup: true,
  //   isRight: true,
  //   isWrong: true,
  //   val: "",
  //   sent: false,
  //   text: "",
  //   counter: 5,
  //   champions1: champions,
  //   championMatch: [],
  // };
  // const [state, dispatch] = useReducer(reducer, initialState);

  //handles input submit
  const { register, handleSubmit } = useForm();

  const [buttonConPopup, setButtonConPopup] = useState(true);
  const [isToggled, setIsToggled] = useState(false);

  const [val, setVal] = useState("");
  //State the contact popup is at
  const [buttonPopup, setButtonPopup] = useState(true);

  //If user is correct or wrong on their guess
  const [isRight, setIsRight] = useState(false);
  const [isWrong, setIsWrong] = useState(false);

  // deals with the data from the form and sends an email
  const [sent, setSent] = useState(false);
  const [text, setText] = useState("");
  //Sets the amount of guesses
  const [counter, setCounter] = useState(5);

  //List of champions for auto complete
  const [champions1, setChampions1] = useState(champions);
  const [championMatch, setChampionMatch] = useState([]);
  const [correctChampion, setcorrectChampion] = useState();

  const [isDisabled, setDisabled] = useState(true);

  //when user sends a email, it takes the text, sends it to the backend and sends it through a smtp server
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

  //only allows user input to be letters, spaces, or apostrophes
  const isLetters = (str) => /^[A-Za-z'&" "]*$/.test(str);

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

  // not finished yet or not needed, will check later
  const isDisabled4 = () => {
    let num = 1;
    if (num === 0) {
      return true;
    } else if (num === 1) {
      return false;
    }
  };

  //creates a random num, used to pick a random correctChampion
  const randNumGen = function () {
    var maxLimit = 161;
    let rand = Math.random() * maxLimit;
    rand = Math.floor(rand);
    return rand;
  };

  /*
Picks a random object from the champions json and uses the randNumGen function to pick a random number.
Which is then used as the index of the array, then takes the Champion key and gets the value of it.
Takes the value and turns it into a string, then makes it all uppercase, and then gets rid of any spaces.
*/
  // const correctChampion = champions[randNumGen()].Champion.valueOf()
  //   .toString()
  //   .toUpperCase()
  //   .replaceAll(" ", "");
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
          onSubmit={handleSubmit(() => {
            let userInput = val;
            userInput = userInput.toUpperCase().replaceAll(" ", "");
            console.log("User's input: " + userInput);
            console.log("Correct champion: " + correctChampion);

            if (userInput === correctChampion) {
              setCounter(5);
              setcorrectChampion(
                champions[randNumGen()].Champion.valueOf()
                  .toString()
                  .toUpperCase()
                  .replaceAll(" ", "")
              );
              setIsWrong(false);
              setIsRight(true);
            } else if (userInput !== correctChampion) {
              if (counter === 0) {
                setCounter(5);
                console.log("Implement Lose");
              } else {
                setCounter(counter - 1);
              }
              setIsWrong(true);
              setIsRight(false);
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
            src={require("./assets/images/github.png")}
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
            src={require("./assets/images/linkedin.png")}
            alt="Linkedin Icon"
            width="18%"
            height="auto"
          />
        </a>
        <img
          src={require("./assets/images/mail.png")}
          alt="Mail Icon"
          width="18%"
          height="auto"
        />
        <img
          src={require("./assets/images/help.png")}
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
          src={require("./assets/images/share.png")}
          alt="Share Icon"
          width="18%"
          height="auto"
        />
      </footer>
    </div>
  );
};

export default Home;
