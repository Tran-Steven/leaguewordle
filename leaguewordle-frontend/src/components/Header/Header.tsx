import React from "react";
import "./header.css";
import logo2 from "../../assets/images/image2vector.svg";
const Header = () => {
  return (
    <div className="top__header">
      <div className="top__header-container">
        <div className="top__header-container__image">
          <img src={logo2} alt="logo img" />
        </div>
      </div>
    </div>
  );
};
export default Header;
