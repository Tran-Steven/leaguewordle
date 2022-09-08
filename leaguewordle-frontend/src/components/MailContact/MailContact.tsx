import React, { useState } from "react";
import axios from "axios";
import logo from "../../assets/images/svg/logo.svg";
function MailContact(props) {
  const [sent, setSent] = useState(false);
  const [text, setText] = useState("");
  const [email, setEmail] = useState("");

  const handleSend = async () => {
    setSent(true);
    try {
      await axios.post("https://leaguewordle.herokuapp.com/send_mail", {
        text,
        email,
      });
    } catch (error) {
      console.log(error);
      console.log("react error");
    }
  };

  return props.trigger ? (
    <div>
      <button
        onClick={() => {
          setSent(false);
          setText("");
          props.setTrigger(false);
        }}
      >
        x
      </button>
      <div>
        <img src={logo} alt="LoLxWordle Icon" />
      </div>
      <h2>CONTACT</h2>
      <div>
        {!sent ? (
          <form
            target="_top"
            method="post"
            encType="text/plain"
            onSubmit={() => {
              handleSend();
            }}
          >
            <div>
              <h2>EMAIL</h2>
              <input
                type="email"
                id="email"
                placeholder="Email"
                onChange={(t) => setEmail(t.target.value)}
              />
              <h2>MESSAGE</h2>
              <textarea
                autoComplete="off"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />

              <br />
              <div>
                <button type="submit" value="Send">
                  Send
                </button>
              </div>
            </div>
          </form>
        ) : (
          <h2>Email Sent Successfully!</h2>
        )}
      </div>
    </div>
  ) : (
    ""
  );
}
export default MailContact;
