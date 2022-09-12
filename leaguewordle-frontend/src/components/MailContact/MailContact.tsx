import React, { useState } from "react";
import axios from "axios";
import logo from "../../assets/images/svg/logo.svg";
import SlidingPanel from "react-sliding-side-panel";

import "react-sliding-side-panel/lib/index.css";
import "./MailContact.css";
import github from "../../assets/images/svg/github.svg";
import linkedin from "../../assets/images/svg/linkedin.svg";
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
      <SlidingPanel
        type={`top`}
        isOpen={props.trigger}
        size={100}
        className="panel"
      >
        <div className="panel-container">
          <div className="close-container">
            <button
              className="close-button"
              onClick={() => props.setTrigger(false)}
            >
              X
            </button>
          </div>
          <div className="contact-main">
            <h1>CONTACT</h1>
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
                    <div className="seperate1">
                      <h2>EMAIL</h2>
                      <input
                        type="email"
                        id="email"
                        placeholder="Email"
                        className="input-contact"
                        onChange={(t) => setEmail(t.target.value)}
                        value={email}
                      />
                    </div>
                    <div className="seperate2">
                      <h2>MESSAGE</h2>
                      <textarea
                        className="input-contact textarea"
                        autoComplete="off"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
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
          <div className="contact-footer">
            <div className="contact-footer-container-image">
              <a
                href="https://github.com/Tran-Steven/leaguewordle"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  className="contact_footer_container_image"
                  src={github}
                  alt="Github Icon"
                />
              </a>
              <a
                href="https://www.linkedin.com/in/steven-tran-26735b206/"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  className="container_footer_container_image"
                  src={linkedin}
                  alt="Linkedin Icon"
                />
              </a>
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
