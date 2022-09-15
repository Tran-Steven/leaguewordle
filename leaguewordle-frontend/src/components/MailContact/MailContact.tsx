import React, { useState, useRef } from "react";
import axios from "axios";
import SlidingPanel from "react-sliding-side-panel";
import "react-sliding-side-panel/lib/index.css";
import "./MailContact.css";
import "../../utils/slideIn/slideIn.css";
function MailContact(props) {
  const [sent, setSent] = useState(false);
  const [text, setText] = useState("");
  const [email, setEmail] = useState("");
  const [slide, setSlide] = useState(0);
  const ref = useRef();
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
      <SlidingPanel
        type={`top`}
        isOpen={props.trigger}
        size={100}
        className="panel"
      >
        <div
          className="panel-container"
          onAnimationEnd={() => setSlide(0)}
          slide={slide}
        >
          <div className="close-container">
            <button
              className="close-button"
              onClick={() => props.setTrigger(false)}
            >
              X
            </button>
          </div>
          <div className="contact-main">
            <h1 className="color-change-main">CONTACT</h1>
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
                    <div className="seperate">
                      <h2 className="color-change">EMAIL</h2>
                      <input
                        type="email"
                        id="email"
                        placeholder="Email"
                        className="input-contact"
                        autoComplete="off"
                        onChange={(t) => setEmail(t.target.value)}
                        value={email}
                      />
                    </div>
                    <div className="seperate" style={{ marginTop: `10%` }}>
                      <h2 className="color-change">MESSAGE</h2>
                      <textarea
                        className="input-contact textarea"
                        autoComplete="off"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        rows="5"
                      />
                      <div>
                        <button
                          className="send-button"
                          type="submit"
                          value="Send"
                        >
                          Send
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              ) : (
                <h2>Email Sent Successfully!</h2>
              )}
            </div>
          </div>
        </div>
      </SlidingPanel>
    </div>
  ) : (
    ""
  );
}
export default MailContact;
