import React, { useState } from "react";
import "../assets/css/Popup.css";
import axios from "axios";

function Popup(props) {
  const [sent, setSent] = useState(false);
  const [text, setText] = useState("");

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

  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-btn" onClick={() => props.setTrigger(false)}>
          x
        </button>
        <img
          src={require("./assets/images/league-of-wordle.png")}
          alt="LoLxWordle Icon"
        />
        <h2 className="how-to-h">HOW TO PLAY</h2>
        <p className="how-to">
          Guess the League of legends champion within 5 tries. For every
          unsuccessful try, a hint will be given showing if your BE Amount, RP
          Amount, Release Year, or Champion Class is correct.
          <br />
          <br />
          Each guess has to be a valid champion. Click the Submit button on the
          right or click enter to submit your guess.
        </p>
        <h2 className="found-bug">FOUND A BUG OR HAVE AN ISSUE?</h2>
        <div className="formHolder">
          {!sent ? (
            <form
              target="_top"
              method="post"
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
      </div>
    </div>
  ) : (
    ""
  );
}
