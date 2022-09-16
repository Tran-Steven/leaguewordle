import React, { useState, forwardRef, useImperativeHandle } from "react";
import axios from "axios";
import SlidingPanel from "react-sliding-side-panel";
import "react-sliding-side-panel/lib/index.css";
import "./MailContact.css";

const MailContact = forwardRef(
  (props: useState<any>, ref: ForwardedRef<typeof useState>) => {
    const [sent, setSent] = useState(false);
    const [text, setText] = useState("");
    const [email, setEmail] = useState("");
    const [slide, setSlide] = useState(0);

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

    function turnOnAnimation() {
      return function () {
        setSlide(1);
      };
    }

    useImperativeHandle(ref, () => ({
      setState: () => turnOnAnimation()(),
    }));

    return props.trigger ? (
      <SlidingPanel
        type={`top`}
        isOpen={props.trigger}
        size={100}
        className="panel"
      >
        <div className="panel-container" data-slide={slide}>
          <div className="close-container">
            <button
              className="close-button"
              onClick={() => {
                setSlide(0);
                setTimeout(function () {
                  props.setTrigger(false);
                }, 0);
              }}
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
    ) : (
      ""
    );
  }
);
export default MailContact;
