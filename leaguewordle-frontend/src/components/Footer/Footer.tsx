import React from "react";
import "./Footer.css";
import github from "../../assets/images/svg/github.svg";
import linkedin from "../../assets/images/svg/linkedin.svg";
function Footer() {
  return (
    <div className="bot__footer">
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
        </div>
      </div>
    </div>
  );
}
export default Footer;
