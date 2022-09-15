import React, { useState } from "react";
import "./Footer.css";
import MailContact from "../MailContact/MailContact.tsx";
import github from "../../assets/images/svg/github.svg";
import linkedin from "../../assets/images/svg/linkedin.svg";
import mail from "../../assets/images/svg/mail.svg";

function Footer() {
  const [contact, setContact] = useState(false);
  return (
    <div className="bot__footer">
      <div id="mail-contact">
        <MailContact trigger={contact} setTrigger={setContact} />
      </div>
      <div className="bot__footer-container">
        <div className="bot__footer-container__image">
          <a
            href="https://github.com/Tran-Steven/leaguewordle"
            target="_blank"
            rel="noreferrer"
          >
            <img
              className="bot_footer_container_image"
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
              className="bot_footer_container_image"
              src={linkedin}
              alt="Linkedin Icon"
            />
          </a>
          <img
            className="bot_footer_container_image"
            src={mail}
            alt="Mail Icon"
            onClick={() => {
              setContact(true);
            }}
          />
        </div>
      </div>
    </div>
  );
}
export default Footer;
