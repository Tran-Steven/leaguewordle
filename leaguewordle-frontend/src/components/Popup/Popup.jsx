// import React, { useState } from "react";
// import "./Popup.css";
// import axios from "axios";

// function Popup(props) {
//   const [sent, setSent] = useState(false);
//   const [text, setText] = useState("");

//   const handleSend = async () => {
//     setSent(true);
//     try {
//       await axios.post("https://leaguewordle.herokuapp.com/send_mail", {
//         text,
//       });
//     } catch (error) {
//       console.log(error);
//       console.log("react error");
//     }
//   };

//   return props.trigger ? (
//     <div className="popup">
//       <div className="popup-inner">
//         <button className="close-btn" onClick={() => props.setTrigger(false)}>
//           x
//         </button>
//         <img
//           src={require("../../assets/images/league-of-wordle.png")}
//           alt="LoLxWordle Icon"
//         />
//         <h2 className="">HOW TO PLAY</h2>
//         <p className="">
//           Guess the League of legends champion within 5 tries. For every
//           unsuccessful try, a hint will be given showing if your BE Amount, RP
//           Amount, Release Year, or Champion Class is correct.
//           <br />
//           <br />
//           Each guess has to be a valid champion. Click the Submit button on the
//           right or click enter to submit your guess.
//         </p>
//         <h2 className="">FOUND A BUG OR HAVE AN ISSUE?</h2>
//         <div className="">
//           {!sent ? (
//             <form
//               target="_top"
//               method="post"
//               encType="text/plain"
//               onSubmit={handleSend}
//             >
//               <div className="contactInfo">
//                 <input
//                   autoComplete="off"
//                   className="input100"
//                   name="Bug/Issue"
//                   type="text"
//                   value={text}
//                   onChange={(e) => setText(e.target.value)}
//                 />

//                 <br />
//                 <input type="submit" value="Send" />
//               </div>
//             </form>
//           ) : (
//             <h2 className="confirm">Email Sent Successfully!</h2>
//           )}
//         </div>
//       </div>
//     </div>
//   ) : (
//     ""
//   );
// }
// export default Popup;

import React, { useState } from "react";
import "./Popup.css";
import axios from "axios";
import logo from "../../assets/images/image2vector.svg";
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
        <img src={logo} alt="LoLxWordle Icon" />
        <h2 className="">HOW TO PLAY</h2>
        <p className="">
          Guess the League of legends champion within 5 tries. For every
          unsuccessful try, a hint will be given showing if your BE Amount, RP
          Amount, Release Year, or Champion Class is correct.
          <br />
          <br />
          Each guess has to be a valid champion. Click the Submit button on the
          right or click enter to submit your guess.
        </p>
        <h2 className="">FOUND A BUG OR HAVE AN ISSUE?</h2>
        <div className="">
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
  ) : props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-btn" onClick={() => props.setTrigger(false)}>
          x
        </button>
        <img src={logo} alt="LoLxWordle Icon" />
        <h1 className="how-to-h">GAME WON</h1>
        <p className="how-to2">
          Hey! Thanks for playing, this was made for fun over the summer to
          learn and pickup a new language. It was built using HTML, JavaScript,
          Reactjs, and Express!
        </p>
        <h2 className="how-to-h">PLAY AGAIN</h2>
        <p className="how-to2">
          If you want to start another game then just click out of this popup.
          The game picks a random champion everytime, no need to wait for
          tomorrow!
        </p>
      </div>
    </div>
  ) : props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-btn" onClick={() => props.setTrigger(false)}>
          x
        </button>
        <img src={logo} alt="LoLxWordle Icon" />
        <h1 className="how-to-h"> GAME LOST</h1>

        <p className="how-to2">
          If you want to start another game, just click out of this popup. The
          game picks a random champion everytime, no need to wait for tomorrow!
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
            src={require("../../assets/images/github.png")}
            alt="Github Icon"
          />
        </a>
      </div>
    </div>
  ) : (
    ""
  );
}
export default Popup;
