import React, { useState } from "react";
import "./Popup/Popup.css";
import axios from "axios";
import logo from "../assets/images/image2vector.svg";
function MailContact(props) {
  const [sent, setSent] = useState(false);
  const [text, setText] = useState("");
  const [email, setEmail] = useState("");

  const handleSend = async () => {
    setSent(true);
    let textbody = "email: " + email + "body: " + text;
    try {
      await axios.post("https://leaguewordle.herokuapp.com/send_mail", {
        textbody,
      });
    } catch (error) {
      console.log(error);
      console.log("react error");
    }
  };

  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <button
          className="close-btn"
          onClick={() => {
            setSent(false);
            setText("");
            setEmail("");
            props.setTrigger(false);
          }}
        >
          x
        </button>
        <div className="container">
          <img className="lol-logo" src={logo} alt="LoLxWordle Icon" />
        </div>
        <h2 className="">EMAIL</h2>
        <p> You can contact either by sending me an email directly using:</p>
        <p>stevenntran@outlook.com</p>
        <p>
          Or you can fill out the form below and it'll send me an email as well.
        </p>
        <div className="form-container">
          {!sent ? (
            <form
              target="_top"
              method="post"
              encType="text/plain"
              onSubmit={handleSend}
            >
              <div className="contactInfo">
                <h2>CONTACT FORM</h2>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <textarea
                  autoComplete="off"
                  className="input100"
                  name="Bug/Issue"
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />

                <br />
                <div className="input-container">
                  <button className="contactbtn" type="submit" value="Send">
                    Send
                  </button>
                </div>
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
export default MailContact;
